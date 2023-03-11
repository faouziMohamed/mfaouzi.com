import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { TbEdit } from 'react-icons/tb';

import AlertDialog from '@/components/Dialogs/AlertDialog';
import { CommentButton } from '@/components/guestbook/comment/CommentButton';
import HangOnSpinner from '@/components/Spinners/HangOnSpinner';

import {
  deleteComment,
  toggleCommentLike,
} from '@/services/client/guestbook/guestbook.service';

import { AppUser, GuestbookComment } from '@/types/guestbook/guestbook.types';

function DeleteButton({ comment }: { comment: GuestbookComment }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const onAccept = useCallback(() => {
    void deleteComment(comment.commentId);
    setOpen(false);
    setIsDeleting(true);
  }, [comment.commentId]);
  const onCancel = useCallback(() => {
    setOpen(false);
    setIsDeleting(false);
  }, []);
  return (
    <>
      {isDeleting ? (
        <HangOnSpinner text='' size='sm' />
      ) : (
        <CommentButton
          Icon={BsTrashFill}
          title='Delete'
          onClick={() => {
            setOpen(true);
            setIsDeleting(true);
          }}
          className='w-5'
        />
      )}
      {open && (
        <AlertDialog
          open={open}
          onAccept={onAccept}
          onCancel={onCancel}
          title='Are you sure you want to delete your comment?'
          description='This action cannot be undone and your comment will be permanently deleted.'
        />
      )}
    </>
  );
}

export default function CommentActionButtons({
  comment,
}: {
  comment: GuestbookComment;
}) {
  return (
    <div className='relative -left-2 flex w-full justify-between'>
      <div className='flex text-[#cecbcb] dark:text-[#979797]'>
        <LikeButton comment={comment} />
        <CommentButton
          Icon={FaRegComment}
          title='Reply'
          onClick={() => {}}
          className='w-5'
          count={comment.repliesCount}
        />
        <CommentButton Icon={TbEdit} title='Edit' onClick={() => {}} />
      </div>

      <DeleteButton comment={comment} />
    </div>
  );
}

function LikeButton({ comment }: { comment: GuestbookComment }) {
  const { status, data } = useSession();
  const [isLikedByMe, setIsLikedByMe] = useState(comment.isLikedByMe);
  const user = data?.user as unknown as AppUser;
  return (
    <CommentButton
      Icon={user && isLikedByMe ? FcLike : AiOutlineHeart}
      title='Like'
      onClick={() => {
        if (status !== 'authenticated') return;
        void toggleCommentLike(comment, user.providerId);
        const newLikeCount = isLikedByMe
          ? comment.likeCount - 1
          : comment.likeCount + 1;
        comment.likeCount = newLikeCount < 0 ? 0 : newLikeCount;
        setIsLikedByMe(!isLikedByMe);
      }}
      count={comment.likeCount}
    />
  );
}
