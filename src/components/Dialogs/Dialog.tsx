import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { FC, ReactNode, useEffect, useRef } from 'react';

import Transition from '@/components/Transition';

interface IDialogProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children: ReactNode;
  Name?: string;
  sx?: SxProps<Theme>;
  closeBtnText?: string;
  CloseButtonComponent?: typeof Button;
  closeOnlyOnBtnClick?: boolean;
}

const FZDialog: FC<IDialogProps> = (props) => {
  const {
    closeBtnText = 'Close',
    CloseButtonComponent = Button,
    closeOnlyOnBtnClick = false,
  } = props;
  const { sx, open = false, setOpen = () => {}, children, Name = '' } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={!closeOnlyOnBtnClick ? handleClose : () => {}}
      aria-labelledby='scroll-dialog-Name'
      aria-describedby='scroll-dialog-description'
      TransitionComponent={Transition}
      className='bg-black bg-opacity-20'
      sx={sx}
    >
      {Name && (
        <DialogTitle>
          <Typography variant='h6'>{Name}</Typography>
        </DialogTitle>
      )}
      <DialogContent className='p-0'>{children}</DialogContent>
      <DialogActions className='p-1 dark:bg-dark-primary'>
        <CloseButtonComponent onClick={handleClose} className='font-bold'>
          {closeBtnText}
        </CloseButtonComponent>
      </DialogActions>
    </Dialog>
  );
};

export default FZDialog;
