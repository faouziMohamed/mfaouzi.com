import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import nc from 'next-connect';

import { getAllComments } from '@/Repository/guestbook.queries';

import {
  AppUser,
  ErrorMessage,
  GuestbookComment,
} from '@/types/guestbook/guestbook.types';

const handler = nc();
interface RequestWithQuery extends NextApiRequest {
  query: {
    parentId?: string;
  };
}
handler.get(
  async (
    req: RequestWithQuery,
    res: NextApiResponse<GuestbookComment[] | ErrorMessage>,
  ) => {
    try {
      const { parentId = null } = req.query;
      const token = await getToken({ req });
      const user = token?.user as AppUser;
      const providerId: string | undefined = user?.providerId;
      const comments = await getAllComments(providerId, parentId);
      res.status(200).json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Cannot get comments due to a server error' });
    }
  },
);

export default handler;
