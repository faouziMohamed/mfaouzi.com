import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import nc from 'next-connect';

import { authMiddleware } from '@/lib/middleware';

import {
  isCommentExist,
  toggleLikeComment,
} from '@/Repository/guestbook.queries';

import {
  AppUser,
  CommentLikes,
  ErrorMessage,
} from '@/types/guestbook/guestbook.types';

const handler = nc().use(authMiddleware);
interface NextApiReqWithQuery extends NextApiRequest {
  query: { commentId: string };
}
handler.put(
  async (
    req: NextApiReqWithQuery,
    res: NextApiResponse<CommentLikes | ErrorMessage>,
  ) => {
    const { commentId } = req.query;
    if (!commentId) {
      res
        .status(400)
        .json({ message: 'Cannot get a specific comment without it id' });
      return;
    }

    try {
      const token = await getToken({ req });
      const user = token!.user as AppUser;
      const userId = user.providerId; // the authMiddleware middleware ensures that the user is logged in

      const commentExists = await isCommentExist(commentId);
      if (!commentExists) {
        res.status(404).json({ message: 'Comment with given id not found' });
        return;
      }

      const comment = await toggleLikeComment(commentId, userId);

      res.status(200).json(comment);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Cannot get comment due to a server error' });
    }
  },
);

export default handler;
