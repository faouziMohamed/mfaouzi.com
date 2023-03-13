import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { TbEdit } from 'react-icons/tb';

import { CommentButton } from '@/components/guestbook/comment/CommentButton';
import EditCommentTextFieldDialog from '@/components/guestbook/comment/EditCommentTextFieldDialog';

import { updateComment } from '@/services/client/guestbook/guestbook.service';

import { AppUser, GuestbookComment } from '@/types/guestbook/guestbook.types';

export default function EditButton(props: { comment: GuestbookComment }) {
  const { comment } = props;
  const { status, data } = useSession();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  if (status !== 'authenticated') return null;
  const user = data?.user as unknown as AppUser;
  if (user.id !== comment.author?.providerId) return null;
  return (
    <>
      <CommentButton
        Icon={TbEdit}
        title='Edit'
        disabled={isEditOpen}
        onClick={() => {
          setIsEditOpen(true);
        }}
      />

      {isEditOpen && (
        <EditCommentTextFieldDialog
          isOpen={isEditOpen}
          authorId={comment.author?.providerId}
          content={comment.content}
          onSave={async (updatedContent: string) => {
            setUpdating(true);
            await updateComment(comment, updatedContent);
            setUpdating(false);
            setIsEditOpen(false);
          }}
          isSaving={updating}
          onCancel={() => {
            setIsEditOpen(false);
          }}
        />
      )}
    </>
  );
}
