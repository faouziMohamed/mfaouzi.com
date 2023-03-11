import {
  GET_COMMENTS_ROUTE,
  getCommentByIdRoute,
  getCommentRepliesRoute,
} from '@/lib/serverless-route.constant';

import { GuestbookComment } from '@/types/guestbook/guestbook.types';

export async function commentFetcher(commentId: string) {
  const res = await fetch(getCommentByIdRoute(commentId));
  return (await res.json()) as GuestbookComment;
}

export async function allCommentsFetcher() {
  const res = await fetch(GET_COMMENTS_ROUTE);
  return res.json();
}
export async function commentRepliesFetcher(commentId?: string | null) {
  if (!commentId) return Promise.resolve([]);
  const res = await fetch(getCommentRepliesRoute(commentId));
  return (await res.json()) as GuestbookComment[];
}
