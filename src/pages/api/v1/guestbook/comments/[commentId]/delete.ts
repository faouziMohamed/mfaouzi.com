import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { authMiddleware } from '@/lib/middleware';

import { deleteComments, isCommentExist } from '@/Repository/guestbook.queries';

import { CommentLikes, ErrorMessage } from '@/types/guestbook/guestbook.types';

const handler = nc().use(authMiddleware);
interface NextApiReqWithQuery extends NextApiRequest {
  query: { commentId: string };
}
handler.delete(
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
      const commentExists = await isCommentExist(commentId);
      if (!commentExists) {
        res.status(404).json({ message: 'Comment with given id not found' });
        return;
      }

      await deleteComments(commentId);
      res
        .status(200)
        .json({ message: 'Comment, related replies and likes deleted' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Cannot get comment due to a server error' });
    }
  },
);

export default handler;
