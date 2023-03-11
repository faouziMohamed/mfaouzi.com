import { DbComment } from '@/Repository/setup/prisma';

type GuestBookCommentBase = {
  commentId: string;
  content: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: { avatar: string; fullName: string; providerId: string };
};
export type SelectCommentQueryResult = GuestBookCommentBase & {
  replies: DbComment[];
  _count: {
    likes: number;
    replies: number;
  };
};

export type GuestbookComment = GuestBookCommentBase & {
  likeCount: number;
  repliesCount: number;
  isLikedByMe: boolean;
  replies: GuestbookComment[];
};

export type GuestbookLike = {
  providerId: string;
  commentId: string;
};

export type PostComment = {
  parentId: string | null;
  comment: string;
  authorId: string;
};

export type NewPostedComment = {
  commentId: string;
  authorId: string;
  parentId: string | undefined;
  createdAt: Date;
};

export type ErrorMessage = {
  message: string;
  cause?: string;
};
export type AppUserWithEmail = {
  providerId: string;
  email: string;
  avatar: string;
  providerName: string;
  fullName: string;
};
export type AppUser = Omit<
  AppUserWithEmail,
  'email' | 'providerName' | 'providerId'
> & { id: string };

export type CommentLikes = {
  commentId: string;
  likeCount: number;
  userId: string | null;
};
