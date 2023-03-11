import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { authMiddleware } from '@/lib/middleware';

import {
  mapCommentToNewPostedComment,
  saveCommentToDb,
} from '@/Repository/guestbook.queries';

import {
  ErrorMessage,
  NewPostedComment,
  PostComment,
} from '@/types/guestbook/guestbook.types';

const handler = nc().use(authMiddleware);
interface NextApiRequestWithBody extends NextApiRequest {
  body: PostComment;
}

handler.post(
  async (
    req: NextApiRequestWithBody,
    res: NextApiResponse<NewPostedComment | ErrorMessage>,
  ) => {
    const { comment, authorId, parentId } = req.body;

    if (!comment) {
      res.status(400).json({ message: 'Cannot post empty comment' });
      return;
    }
    try {
      const newComment = await saveCommentToDb(parentId, comment, authorId);
      const commentToReturn = mapCommentToNewPostedComment(newComment);
      res.status(201).json(commentToReturn);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ message: error.message });
    }
  },
);

export default handler;
