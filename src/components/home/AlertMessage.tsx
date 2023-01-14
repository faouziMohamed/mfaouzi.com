import { Alert, Box, List, Snackbar, Stack } from '@mui/material';
import Grow from '@mui/material/Grow';
import Slide, { SlideProps } from '@mui/material/Slide';
import { SyntheticEvent, useState } from 'react';

type TransitionProps = Omit<SlideProps, 'direction'>;
type AlerteMessageProps = {
  open: boolean;
  message: string | string[];
  type?: 'success' | 'error';
  onClose: () => void;
};

export default function AlertMessage(props: AlerteMessageProps) {
  const { open: openSnack, message } = props;
  const { type = 'success', onClose = () => {} } = props;
  const [open, setOpen] = useState(openSnack);
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
      TransitionComponent={TransitionUp}
    >
      {Array.isArray(message) ? (
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          <Stack direction='column' component='ul' className='m-0 gap-1 p-0'>
            {message.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </Stack>
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
}

function TransitionUp(props: TransitionProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction='up' />;
}
