/* eslint-disable @typescript-eslint/naming-convention */
import prisma, { DbComment } from '@/Repository/setup/prisma';

import {
  AppUserWithEmail,
  CommentLikes,
  GuestbookComment,
  GuestbookLike,
  NewPostedComment,
  SelectCommentQueryResult,
} from '@/types/guestbook/guestbook.types';

export const SELECT_COMMENT_FILTER_QUERY = {
  commentId: true,
  content: true,
  parentId: true,
  createdAt: true,
  updatedAt: true,
  replies: true,
  author: {
    select: {
      providerId: true,
      name: true,
      avatar: true,
    },
  },
  _count: { select: { likes: true, replies: true } },
};

export async function getAllComments(
  providerId?: string,
  parentId: string | null = null,
) {
  const comments = await prisma.gComment.findMany({
    where: { parentId },
    orderBy: { createdAt: parentId ? 'asc' : 'desc' },
    select: SELECT_COMMENT_FILTER_QUERY,
  });
  if (comments.length === 0) return [];

  let likedByMe: GuestbookLike[] = [];
  if (providerId) {
    likedByMe = await extractLikedCommentByUser(comments, providerId);
  }
  return comments.map((c) => aggregateComment(c, likedByMe));
}

export async function findCommentById(commentId: string, providerId?: string) {
  const comment = await prisma.gComment.findUnique({
    where: { commentId },
    select: SELECT_COMMENT_FILTER_QUERY,
  });

  if (!comment) return null;
  const likedComment: GuestbookLike[] = [];
  if (providerId && (await isCommentLikedByUser(commentId, providerId))) {
    likedComment.push({ commentId, providerId });
  }
  return aggregateComment(comment, likedComment);
}

type updatedLikes = { comment: { _count: { likes: number } } };

export async function toggleLikeComment(commentId: string, providerId: string) {
  const isLiked = await isCommentLikedByUser(commentId, providerId);
  const commentLikes: CommentLikes = {
    likeCount: 0,
    commentId,
    userId: null,
  };
  const LIKE_COMMENT_SELECT_QUERY = {
    comment: { select: { _count: { select: { likes: true } } } },
  };
  if (isLiked) {
    const res: updatedLikes | null = await prisma.gLike.delete({
      where: { providerId_commentId: { commentId, providerId } },
      select: LIKE_COMMENT_SELECT_QUERY,
    });
    commentLikes.likeCount = res?.comment._count.likes || 0;
  } else {
    const res: updatedLikes | null = await prisma.gLike.create({
      data: { commentId, providerId },
      select: LIKE_COMMENT_SELECT_QUERY,
    });
    commentLikes.likeCount = res?.comment._count.likes || 0;
    commentLikes.userId = providerId;
  }
  return commentLikes;
}

export async function deleteCommentWithItResources(rootCommentId: string) {
  const map = new Map<string, boolean>();
  await deleteComment(rootCommentId, map);

  // Batch delete remaining comments
  if (map.size > 0) {
    const commentIdsToDelete = [...map.keys()];
    await prisma.gComment.deleteMany({
      where: { commentId: { in: commentIdsToDelete } },
    });
  }
}

export async function updateCommentContent(commentId: string, content: string) {
  return prisma.gComment.update({
    where: { commentId },
    data: { content },
    select: { updatedAt: true },
  });
}

async function deleteComment(commentId: string, map: Map<string, boolean>) {
  // Check if the comment has already been deleted
  if (map.has(commentId)) {
    return;
  }

  // Mark the comment as deleted
  map.set(commentId, true);

  // Delete related comments recursively
  const comment = await prisma.gComment.findUnique({
    where: { commentId },
    select: { replies: { select: { commentId: true } } },
  });

  if (!comment) {
    return;
  }

  const replies = comment.replies || [];

  // Delete related likes
  await prisma.gLike.deleteMany({ where: { commentId } });

  // Delete the comment itself

  // Recursively delete replies in batches of 10
  const BATCH_SIZE = 10;
  const batchedReplies = [];
  for (let i = 0; i < replies.length; i += BATCH_SIZE) {
    const batch = replies.slice(i, i + BATCH_SIZE);
    batchedReplies.push(
      Promise.all(
        batch.map(async (reply) => deleteComment(reply.commentId, map)),
      ),
    );
  }
  await Promise.all(batchedReplies);
  await prisma.gComment.delete({ where: { commentId } });
}

export async function saveCommentToDb(
  parentId: string | null,
  comment: string,
  authorId: string,
) {
  return prisma.gComment.create({
    data: {
      parentId,
      content: comment,
      authorId,
      createdAt: new Date(Date.now()),
    },
    include: { author: true, replies: true },
  });
}

export function mapCommentToNewPostedComment(newComment: DbComment) {
  const commentToReturn: NewPostedComment = {
    commentId: newComment.commentId,
    authorId: newComment.authorId.toString(),
    createdAt: newComment.createdAt,
    parentId: newComment.parentId?.toString(),
  };
  return commentToReturn;
}

export async function getUserByProviderId(providerId: string) {
  const user = await prisma.gUser.findUnique({
    where: { providerId },
    select: {
      providerId: true,
      email: true,
      avatar: true,
      providerName: true,
      name: true,
    },
  });
  return user as AppUserWithEmail | null;
}

export async function updateUser(
  providerId: string,
  updatedFields: Partial<AppUserWithEmail>,
) {
  await prisma.gUser.update({
    where: { providerId },
    data: updatedFields,
  });
}

export async function addNewUser(user: AppUserWithEmail) {
  await prisma.gUser.create({
    data: {
      email: user.email,
      providerName: user.providerName,
      providerId: user.providerId,
      name: user.name,
      avatar: user.avatar,
    },
  });
}

async function extractLikedCommentByUser(
  comments: SelectCommentQueryResult[],
  providerId: string,
) {
  return prisma.gLike.findMany({
    where: {
      providerId,
      commentId: { in: comments.map((c) => c.commentId) },
    },
  });
}

export async function isCommentExist(commentId: string) {
  const comment = await prisma.gComment.findUnique({
    where: { commentId },
    select: { commentId: true },
  });
  return !!comment;
}

async function isCommentLikedByUser(commentId: string, providerId: string) {
  const like = await prisma.gLike.findUnique({
    where: { providerId_commentId: { commentId, providerId } },
  });
  return !!like;
}

function aggregateComment(
  theComment: SelectCommentQueryResult,
  commentILike: GuestbookLike[],
): GuestbookComment {
  const { _count, replies: allReplies, ...comment } = theComment;
  const likedByMe = !!commentILike.find(
    (l) => l.commentId === theComment.commentId,
  );
  const replies = (allReplies as unknown as GuestbookComment[]) || [];
  return {
    ...comment,
    isLikedByMe: likedByMe,
    likeCount: _count.likes,
    repliesCount: _count.replies,
    replies,
  };
}
