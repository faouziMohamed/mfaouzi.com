const API_BASE = '/api/v1' as const;
export const GET_COMMENTS_ROUTE = `${API_BASE}/guestbook/comments`;
export const ADD_NEW_COMMENT_ROUTE = `${API_BASE}/guestbook/comments/new`;
export const getSingleCommentRoute = (commentId: string) =>
  `${API_BASE}/guestbook/comments/${commentId}`;
export const getCommentRepliesRoute = (commentId: string) => {
  const query = new URLSearchParams({ parentId: commentId });
  return `${GET_COMMENTS_ROUTE}?${query.toString()}`;
};
export const CONTACT_ME_ROUTE = `${API_BASE}/contact-me`;

export const getCommentByIdRoute = (commentId: string) =>
  `${API_BASE}/guestbook/comments/${commentId}`;

export const getCommentLikeToggleRoute = (commentId: string) =>
  `${getCommentByIdRoute(commentId)}/like`;
