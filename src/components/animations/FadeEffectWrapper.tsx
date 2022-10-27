import { Box, BoxProps, Stack, StackProps } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface IFadeEffect {
  children: ReactNode;
  gutterTop?: BoxProps['pt'];
  gutterBottom?: BoxProps['pb'];
  centerContent?: boolean;
}

export const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 0,
    transition: {
      type: 'keyframes',
      ease: 'easeIn',
      duration: 1,
    },
  },
  onscreen: {
    y: -40,
    opacity: 1,
    transition: {
      default: { ease: 'linear' },
      duration: 0.5,
    },
  },
};

export default function FadeEffectWrapper(props: IFadeEffect & StackProps) {
  const {
    children,
    gutterTop = 0,
    gutterBottom = 0,
    className = '',
    centerContent = true,
    ...rest
  } = props;
  const flexClasses = centerContent
    ? ' flex flex-col items-center'
    : String(centerContent);
  return (
    <Stack
      direction='column'
      pt='4rem'
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={className}
    >
      {/* eslint-disable-next-line eqeqeq */}
      {gutterTop != 0 && <Box py={gutterTop} />}
      <motion.div
        initial='offscreen'
        whileInView='onscreen'
        viewport={{ once: true, amount: 0.2 }}
        className='w-full'
      >
        <motion.div className={`w-full ${flexClasses}`} variants={cardVariants}>
          {children}
        </motion.div>
      </motion.div>
      {/* eslint-disable-next-line eqeqeq */}
      {gutterBottom != 0 && <Box py={gutterBottom} />}
    </Stack>
  );
}
