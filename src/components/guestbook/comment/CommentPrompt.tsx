import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '@/components/buttons/Button';

import { addNewComment } from '@/services/client/guestbook/guestbook.service';

import { AppUser, GuestbookComment } from '@/types/guestbook/guestbook.types';

type CommentPromptProps = {
  // user: AppUser;
  parentId?: string | null;
  isReply?: boolean;
};

export default function CommentPrompt({
  parentId,
  isReply = false,
}: CommentPromptProps) {
  const { status, data } = useSession();
  if (status !== 'authenticated') return null;
  const user = data?.user as unknown as AppUser;
  const useFlexCol = isReply ? '' : 'flex-col';
  return (
    <div
      className={`${useFlexCol} flex w-full max-w-[43.4rem] items-center gap-3 md:flex-row`}
    >
      <div className='relative'>
        <Image
          src={user.avatar}
          width={isReply ? 45 : 69}
          height={isReply ? 45 : 69}
          className='rounded-full'
          alt={`${user.name}'s avatar`}
        />
      </div>
      <AddNewCommentTextField
        user={user}
        parentId={parentId}
        isReply={isReply}
      />
    </div>
  );
}

function AddNewCommentTextField({
  user,
  parentId,
  isReply = false,
}: CommentPromptProps & { user: AppUser; isReply: boolean }) {
  const [value, setValue] = useState('');

  const fieldClassName = isReply ? 'reply-text-field' : '';
  return (
    <TextField
      id='comment-text-field'
      label='Add a comment'
      placeholder='Hey there, I just wanted to say...'
      multiline
      variant='outlined'
      className={`comment-text-field w-full ${fieldClassName}`}
      size={isReply ? 'small' : 'medium'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <Button
              onClick={() => {
                const content = value.trim();
                setValue('');
                void saveComment(user, content, parentId);
              }}
              disabled={!value}
              className='py-1.5 disabled:cursor-not-allowed  disabled:opacity-50'
            >
              {isReply ? 'Reply' : 'Sign'}
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
}

async function saveComment(
  user: AppUser,
  text: string,
  parentId?: string | null,
) {
  if (!text) return null;
  const comment = createCommentPayload(user, text, parentId);
  return addNewComment(comment, user);
}

function createCommentPayload(
  user: AppUser,
  content: string,
  parentId?: string | null,
) {
  const comment: GuestbookComment = {
    commentId: uuidv4(), // generate a temporary id for the comment just for the UI
    content,
    parentId: parentId || null,
    createdAt: new Date(), // A date time for the first render of the comment in the client a new date will be generated on the server
    updatedAt: new Date(),
    likeCount: 0,
    isLikedByMe: false,
    repliesCount: 0,
    replies: [],
    author: {
      providerId: user.id,
      name: user.name,
      avatar: user.avatar,
    },
  };
  return comment;
}
