import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

import { CommentButton } from '@/components/guestbook/comment/CommentButton';
import DeleteCommentButton from '@/components/guestbook/comment/DeleteCommentButton';
import EditButton from '@/components/guestbook/comment/EditButton';

import { toggleCommentLike } from '@/services/client/guestbook/guestbook.service';

import { AppUser, GuestbookComment } from '@/types/guestbook/guestbook.types';

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
        <EditButton comment={comment} />
      </div>

      <DeleteCommentButton comment={comment} />
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
        void toggleCommentLike(comment, user.id);
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
