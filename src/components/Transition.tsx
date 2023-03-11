import { Slide, SlideProps } from '@mui/material';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props: SlideProps, ref) {
  const { children, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Slide direction='up' ref={ref} {...other}>
      {children}
    </Slide>
  );
});

export default Transition;
