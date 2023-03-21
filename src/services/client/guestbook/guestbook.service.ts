import useSWR, { mutate } from 'swr';

import {
  ADD_NEW_COMMENT_ROUTE,
  GET_COMMENTS_ROUTE,
  getCommentLikeToggleRoute,
  getCommentRepliesRoute,
  getSingleCommentRoute,
} from '@/lib/serverless-route.constant';

import {
  allCommentsFetcher,
  commentFetcher,
  commentRepliesFetcher,
} from './helper';

import {
  AppUser,
  CommentLikes,
  ErrorMessage,
  GuestbookComment,
  NewPostedComment,
  PostComment,
} from '@/types/guestbook/guestbook.types';

const getCommentsKey = GET_COMMENTS_ROUTE;

export function useComments() {
  return useSWR<GuestbookComment[], Error>(getCommentsKey, allCommentsFetcher, {
    refreshWhenOffline: false,
    revalidateOnMount: true,
  });
}

async function addNewReplyToTheCache(comment: GuestbookComment) {
  if (!comment.parentId) return;
  await mutate<GuestbookComment[]>(
    getCommentRepliesRoute(comment.parentId),
    (comments = []) => {
      comments.push(comment);
      return comments;
    },
    {
      revalidate: true,
      rollbackOnError: true,
      populateCache: true,
    },
  );

  await mutate<GuestbookComment>(
    getSingleCommentRoute(comment.parentId),
    (parentComment) => {
      if (!parentComment) return parentComment;
      parentComment.repliesCount += 1;
      parentComment.replies.push(comment);
      return { ...parentComment };
    },
    {
      revalidate: true,
      rollbackOnError: true,
      populateCache: true,
    },
  );
}

export async function addNewComment(comment: GuestbookComment, user: AppUser) {
  const postComment: PostComment = {
    parentId: comment.parentId,
    comment: comment.content,
    authorId: user.id,
  };
  const res = await fetch(ADD_NEW_COMMENT_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postComment),
  });
  const newComment = (await res.json()) as NewPostedComment;
  comment.commentId = newComment.commentId;
  comment.createdAt = newComment.createdAt;
  if (!comment.parentId) {
    await addNewCommentToTheCache(comment);
    return comment;
  }
  await addNewReplyToTheCache(comment);
  await refreshCommentsCache();
  return comment;
}

export function useSingleComment(commentId: string | null | undefined) {
  return useSWR<GuestbookComment, Error>(
    commentId ? getSingleCommentRoute(commentId) : null,
    () => commentFetcher(commentId!),
    {
      refreshWhenOffline: false,
    },
  );
}

export function useCommentReplies(commentId: string | null) {
  return useSWR<GuestbookComment[], Error>(
    commentId ? getCommentRepliesRoute(commentId) : null,
    () => commentRepliesFetcher(commentId),
  );
}

export async function toggleCommentLike(
  comment: GuestbookComment,
  providerId: string,
) {
  const { commentId } = comment;
  const res = await fetch(getCommentLikeToggleRoute(commentId), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ commentId }),
  });

  if (!res.ok) {
    const errorMessage = (await res.json()) as ErrorMessage;
    throw new Error(errorMessage.message);
  }

  const commentLikes = (await res.json()) as CommentLikes;
  comment.likeCount = commentLikes.likeCount;
  comment.isLikedByMe = commentLikes.userId === providerId;
  cacheOneCommentMutation(comment);
  return comment;
}

export async function deleteComment(commentId: string) {
  const res = await fetch(getSingleCommentRoute(commentId), {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorMessage = (await res.json()) as ErrorMessage;
    throw new Error(errorMessage.message);
  }
  await removeCommentFromCache(commentId);
  await refreshCommentsCache();
  return commentId;
}
export async function updateComment(
  comment: GuestbookComment,
  content: string,
) {
  comment.content = content;
  cacheOneCommentMutation(comment);
  const res = await fetch(getSingleCommentRoute(comment.commentId), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const errorMessage = (await res.json()) as ErrorMessage;
    throw new Error(errorMessage.message);
  }
  await res.json();
  comment.content = content;
  cacheOneCommentMutation(comment);
  return comment;
}

function cacheOneCommentMutation(comment: GuestbookComment) {
  void mutate(getSingleCommentRoute(comment.commentId), comment, {
    optimisticData: comment,
    revalidate: false,
  });
}

function removeCommentFromCache(commentId: string) {
  return mutate<GuestbookComment>(getSingleCommentRoute(commentId), undefined, {
    optimisticData: () => false,
    revalidate: false,
  });
}

export function addNewCommentToTheCache(comment: GuestbookComment) {
  return mutate<GuestbookComment[]>(
    getCommentsKey,
    (comments = []) => [comment, ...comments],
    {
      revalidate: false,
      rollbackOnError: true,
      populateCache: true,
    },
  );
}

export async function refreshCommentsCache() {
  await mutate<GuestbookComment[]>(getCommentsKey);
}
