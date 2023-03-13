import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import nc from 'next-connect';

import { authMiddleware } from '@/lib/middleware';

import {
  deleteCommentWithItResources,
  findCommentById,
  isCommentExist,
  updateCommentContent,
} from '@/Repository/guestbook.queries';

import {
  AppUser,
  CommentLikes,
  CommentUpdateResult,
  ErrorMessage,
  GuestbookComment,
} from '@/types/guestbook/guestbook.types';

const handler = nc();

interface NextApiReqWithQuery extends NextApiRequest {
  query: { commentId: string };
}
interface NextApiReqWithQueryAndBody extends NextApiReqWithQuery {
  body: { content: string };
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

handler
  .use(authMiddleware)
  .use(authMiddleware)
  .put(
    async (
      req: NextApiReqWithQueryAndBody,
      res: NextApiResponse<CommentUpdateResult | ErrorMessage>,
    ) => {
      const { commentId } = req.query;
      const { content } = req.body;
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

        const { updatedAt } = await updateCommentContent(commentId, content);
        const updateResult: CommentUpdateResult = { updatedAt, commentId };

        res.status(200).json(updateResult);
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Cannot Update the comment due to a server error' });
      }
    },
  );

interface NextApiReqWithQuery extends NextApiRequest {
  query: { commentId: string };
}
handler
  .use(authMiddleware)
  .delete(
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

        await deleteCommentWithItResources(commentId);
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
