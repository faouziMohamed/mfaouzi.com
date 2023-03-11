import Alert, { AlertColor } from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@/components/buttons/Button';

export default function AlertDialog({
  onAccept = () => {},
  onCancel = () => {},
  acceptText = 'Accept',
  cancelText = 'Cancel',
  open = false,
  title = 'Are you sure?',
  description,
  type = 'error',
}: {
  open: boolean;
  onAccept: () => void;
  onCancel: () => void;
  acceptText?: string;
  cancelText?: string;
  title: string;
  description: string;
  type?: AlertColor;
}) {
  const handleClose = () => {
    onCancel();
  };

  const handleAccept = () => {
    onAccept();
  };

  if (!open) return null;
  const errorBtnStyle =
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 border-red-500';
  const cancelBtnStyle =
    'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400 border-gray-200 active:border-gray-500 active:text-gray-800';
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Alert severity={type}>
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='ghost'
            onClick={handleClose}
            className={cancelBtnStyle}
          >
            {cancelText}
          </Button>
          <Button
            className={type === 'error' ? errorBtnStyle : ''}
            variant='outline'
            onClick={handleAccept}
            autoFocus
          >
            {acceptText}
          </Button>
        </DialogActions>
      </Alert>
    </Dialog>
  );
}
