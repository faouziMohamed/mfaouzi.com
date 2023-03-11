import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import nc from 'next-connect';

import { findCommentById } from '@/Repository/guestbook.queries';

import {
  AppUser,
  ErrorMessage,
  GuestbookComment,
} from '@/types/guestbook/guestbook.types';

const handler = nc();

interface NextApiReqWithQuery extends NextApiRequest {
  query: { commentId: string };
}

handler.get(
  async (
    req: NextApiReqWithQuery,
    res: NextApiResponse<GuestbookComment | ErrorMessage>,
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
      const user = token?.user as AppUser;
      const userId: string | undefined = user?.id;
      const comment = await findCommentById(commentId, userId);
      if (!comment) {
        res.status(404).json({ message: 'Comment with given id not found' });
        return;
      }
      res.status(200).json(comment);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Cannot get comment due to a server error' });
    }
  },
);

export default handler;
