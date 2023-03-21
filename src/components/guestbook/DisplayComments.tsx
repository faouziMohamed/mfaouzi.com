import { ButtonUnstyled } from '@mui/base';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { CgBorderStyleDotted } from 'react-icons/cg';
import { RxDotsVertical } from 'react-icons/rx';
import useSWR from 'swr';

import { getGuestbookThreadPage } from '@/lib/client-route.contant';
import { getSingleCommentRoute } from '@/lib/serverless-route.constant';

import HangOnSpinner from '@/components/Spinners/HangOnSpinner';

import { useCommentReplies } from '@/services/client/guestbook/guestbook.service';

import CommentComponent from './comment/CommentComponent';
import HorizontalLine from './GuestBookPage';

import { GuestbookComment } from '@/types/guestbook/guestbook.types';

export const COMMENT_INITIAL_DEPTH = 1;

export type DisplayCommentsProps = {
  comments: GuestbookComment[];
  depth: number;
  isThread?: boolean;
};

export default function DisplayComments(props: DisplayCommentsProps) {
  const { comments = [], isThread = false } = props;
  const { depth = COMMENT_INITIAL_DEPTH } = props;
  return (
    <>
      {comments.map((comment, index) => (
        <Fragment key={comment.commentId}>
          <ShowCommentAndItReplies
            isThread={isThread}
            comment={comment}
            depth={depth}
          />
          {index < comments.length - 1 && <HorizontalLine className='mx-8' />}
        </Fragment>
      ))}
    </>
  );
}

type ShowCommentAndItRepliesProps = {
  comment: GuestbookComment;
  depth: number;
  isThread?: boolean;
};

export function ShowCommentAndItReplies(props: ShowCommentAndItRepliesProps) {
  const { comment, depth, isThread = false } = props;

  // When depth is greater than the initial depth, it means that's a reply
  // We should tell swr to handle changes on the reply. This way we ensure
  // that the reply will be updated when a new reply is added to it (optimistic update)
  const isReply = depth > COMMENT_INITIAL_DEPTH;

  // Tell swr to handle changes on the reply
  const { data: trackedComment, isLoading } = useSWR<GuestbookComment>(
    getSingleCommentRoute(comment?.commentId),
    () => comment,
  );

  if (isLoading && isReply) return <HangOnSpinner text='' />;

  // decide which comment to use (the fetched one or the one passed as props)
  const usedComment = isReply ? trackedComment! : comment;

  return (
    <div className='flex flex-col gap-1 pt-4 pb-0.5 pl-1'>
      <CommentComponent comment={usedComment} />
      {!!usedComment?.repliesCount && (
        <CommentReplies
          commentId={usedComment?.commentId}
          depth={depth}
          length={usedComment?.repliesCount}
          isThread={isThread}
        />
      )}
    </div>
  );
}

export function CommentReplies(props: {
  commentId: string;
  length: number;
  depth: number;
  isThread?: boolean;
}) {
  const { commentId, length, depth, isThread = false } = props;
  const [showReplies, setShowReplies] = useState(isThread);
  const toggleShowReplies = () => setShowReplies((r) => !r);
  const swrRes = useCommentReplies(showReplies ? commentId : null);
  const { data: replies = [], isLoading } = swrRes;
  return (
    <section id={`comment-reply-${commentId}`}>
      <div className='flex w-full items-center gap-2'>
        <div className='relative flex w-[3.5rem] items-center justify-center'>
          {showReplies ? (
            <RxDotsVertical className='relative -left-1 text-[#616869] dark:text-[#b5cdd1]' />
          ) : (
            <CgBorderStyleDotted className='relative left-3 text-3xl text-[#616869] dark:text-[#b5cdd1]' />
          )}
        </div>
        {depth > 1 ? (
          <Link
            href={getGuestbookThreadPage(commentId)}
            aria-label={`Link to the thread #${commentId}`}
            title={`Link to the thread #${commentId}`}
            className='text-[0.8rem]
        text-[#616869] dark:text-[#b5cdd1]'
          >
            Continue on this thread...
          </Link>
        ) : (
          <ButtonUnstyled
            className='text-[0.8rem]
        text-[#616869] dark:text-[#b5cdd1]'
            onClick={toggleShowReplies}
          >
            {showReplies ? 'Show less' : `Show ${length} replies`}
          </ButtonUnstyled>
        )}
        {showReplies ? <HorizontalLine /> : null}
      </div>
      {isLoading && (
        <div className='flex justify-center py-8'>
          <HangOnSpinner text='Loading Comments...' size='sm' />
        </div>
      )}
      {!isLoading && replies.length > 0 && (
        <DisplayReplies
          showReplies={showReplies}
          commentReplies={replies}
          depth={depth}
        />
      )}
    </section>
  );
}

function DisplayReplies(props: {
  showReplies: boolean;
  commentReplies: GuestbookComment[];
  depth: number;
}) {
  const { showReplies, commentReplies = [] } = props;
  const { depth = COMMENT_INITIAL_DEPTH - 1 } = props;
  // listen changes on every shown reply
  if (!showReplies) return null;
  return (
    <div className='flex gap-3'>
      <div className='relative flex w-[3.4975rem] items-stretch justify-center pr-12 xsm:w-[3.2rem]'>
        {/* create a vertical line centered  */}
        <div className='absolute top-0 bottom-0 left-1/2 w-[0.07rem] bg-[#dfdfdfec] dark:bg-[#4c5455]' />
      </div>
      <div className='grow'>
        <DisplayComments comments={commentReplies} depth={depth + 1} />
      </div>
    </div>
  );
}
