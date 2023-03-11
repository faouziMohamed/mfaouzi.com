import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { formatDate } from '@/lib/utils';

import CommentActionButtons from '@/components/guestbook/comment/CommentActionButtons';
import HangOnSpinner from '@/components/Spinners/HangOnSpinner';

import { useSingleComment } from '@/services/client/guestbook/guestbook.service';

import CommentPrompt from './CommentPrompt';

import type { GuestbookComment } from '@/types/guestbook/guestbook.types';

type CommentComponentProps = {
  comment: GuestbookComment;
};
export default function CommentComponent(props: CommentComponentProps) {
  const { comment: c } = props;
  const { data: comment, isLoading, error } = useSingleComment(c.commentId);
  if (isLoading) return <HangOnSpinner text='' />;
  if (error) return null;
  return (
    <div className='flex flex-col gap-1 '>
      <CommentHeader comment={comment} />
      <CommentBody comment={comment} />
      <div className='flex gap-1'>
        <div className='relative flex w-[3.125rem] items-stretch justify-center pr-10'>
          {/* create a vertical line centered  */}
          <div
            className={`absolute top-0 bottom-0 left-1/2 w-[0.07rem] bg-transparent `}
          />
        </div>
        <CommentPrompt parentId={comment.commentId} isReply />
      </div>
    </div>
  );
}

function CommentHeader({ comment }: { comment: GuestbookComment }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='relative'>
        <Image
          src={comment.author.avatar}
          width={45}
          height={45}
          className='rounded-full'
          alt={`${comment.author.name}'s avatar`}
        />
      </div>
      <div className='flex flex-col gap-0'>
        <Typography
          component='h3'
          className='m-0 font-secondary text-[0.85rem] font-[700] text-[#495F70] dark:text-[#9bd3dd]'
        >
          {comment.author.name}
        </Typography>
        <Typography className='m-0 font-secondary text-[0.68rem] text-[#607274] dark:text-[#b5cdd1]'>
          {formatDate(new Date(comment.updatedAt))}
        </Typography>
      </div>
    </div>
  );
}

function CommentBody({ comment }: { comment: GuestbookComment }) {
  const { repliesCount = [] } = comment;
  const hasReplies = repliesCount > 0;
  const vLineVisible = hasReplies
    ? ' bg-[#dfdfdfec] dark:bg-[#4c5455]'
    : ' bg-transparent';
  return (
    <div className='flex gap-2 '>
      <div className='relative flex w-[3.125rem] items-stretch justify-center pr-10'>
        {/* create a vertical line centered  */}
        <div
          className={`absolute top-0 bottom-0 left-1/2 w-[0.07rem] ${vLineVisible} `}
        />
      </div>
      <div className='flex w-full flex-col gap-1'>
        <Typography className='whitespace-pre-wrap font-secondary text-[0.95rem] text-[#151718] dark:text-[#b5cdd1]'>
          {comment.content}
        </Typography>
        {/* Add icons */}
        <CommentActionButtons comment={comment} />
      </div>
    </div>
  );
}
