import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';

import clsxm from '@/lib/utils';

import Button from '@/components/buttons/Button';
import HangOnSpinner from '@/components/Spinners/HangOnSpinner';

import { AppUser } from '@/types/guestbook/guestbook.types';

type EditCommentTextFieldDialogProps = {
  content: string;
  authorId: string;
  isOpen?: boolean;
  onSave: (updatedContent: string) => void | Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
};

type UpdateCommentPromptProps = {
  user: AppUser;
  value: string;
  setValue: (value: string) => void;
  isSaving?: boolean;
};

export default function EditCommentTextFieldDialog(
  props: EditCommentTextFieldDialogProps,
) {
  const { authorId, content, isSaving = false } = props;
  const { isOpen = false, onSave = () => {}, onCancel = () => {} } = props;

  const { status, data } = useSession();
  const [value, setValue] = useState(content || '');

  if (!isOpen || status !== 'authenticated') return null;
  const user = data?.user as unknown as AppUser;
  if (user.id !== authorId) return null;
  const handleClose = () => onCancel();
  return (
    <Dialog
      open={isOpen}
      PaperComponent={PaperComponent}
      disableEscapeKeyDown={value.trim() !== ''}
      onClose={(event, reason) => reason !== 'backdropClick' && handleClose()}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        Update Comment
      </DialogTitle>
      <DialogContent className='flex flex-col gap-6 '>
        <div className='flex flex-col gap-1'>
          <Typography className='text-sm text-gray-500'>
            Current comment:
          </Typography>
          <Typography variant='body1' className='pl-4 text-sm text-gray-500'>
            {content}{' '}
          </Typography>
        </div>
        <UpdateCommentPrompt
          isSaving={isSaving}
          user={user}
          value={value}
          setValue={setValue}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={isSaving}
          variant='ghost'
          className='text-indigo-700 dark:text-slate-300 dark:hover:bg-dark-r-400'
        >
          Cancel
        </Button>
        <Button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            const newContent = value.trim();
            setValue('');
            await onSave(newContent);
          }}
          disabled={!value || value.trim() === content || isSaving}
          className='py-1.5 disabled:cursor-not-allowed  disabled:opacity-50'
        >
          {isSaving ? <HangOnSpinner text='Saving...' /> : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function UpdateCommentPrompt(props: UpdateCommentPromptProps) {
  const { user, value, setValue, isSaving } = props;
  return (
    <div className='flex w-full  flex-col items-center gap-3 sm:flex-row'>
      <div className='relative'>
        <Image
          src={user.avatar}
          width={69}
          height={69}
          className='rounded-full'
          alt={`${user.name}'s avatar`}
        />
      </div>
      <TextField
        id='comment-text-field'
        disabled={isSaving}
        label='Update your comment'
        placeholder='Update your comment'
        multiline
        variant='outlined'
        className='comment-text-field w-full'
        size='medium'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function PaperComponent(paperProps: PaperProps) {
  const { className, ...others } = paperProps;
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper
        ref={nodeRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...others}
        className={clsxm(
          className,
          'bg-gray-200 dark:bg-dark-300 dark:text-white',
        )}
      />
    </Draggable>
  );
}
