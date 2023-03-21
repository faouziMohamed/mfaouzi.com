import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';

import AlertDialog from '@/components/Dialogs/AlertDialog';
import { CommentButton } from '@/components/guestbook/comment/CommentButton';
import HangOnSpinner from '@/components/Spinners/HangOnSpinner';

import { deleteComment } from '@/services/client/guestbook/guestbook.service';

import { AppUser, GuestbookComment } from '@/types/guestbook/guestbook.types';

export default function DeleteCommentButton({
  comment,
}: {
  comment: GuestbookComment;
}) {
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
  const { status, data } = useSession();
  if (status !== 'authenticated') return null;
  const user = data?.user as unknown as AppUser;
  if (user.id !== comment.author?.providerId) return null;
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
