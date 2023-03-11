import { Box, Button, CircularProgress } from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiSendPlaneFill } from 'react-icons/ri';

import { emailRegex } from '@/lib/utils';

import FormTextField from '@/components/home/FormTextField';

import { sendEmail } from '@/services/client/mail.service';

import AlertMessage from './AlertMessage';

import { ContactFormFields } from '@/types/portfolio/portfolio.types';

interface InputFieldProps {
  className?: string;
}

export default function ContactForm(props: InputFieldProps) {
  const { className = '' } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormFields>();
  type TAlertMsg = { msg: string | string[]; type: 'success' | 'error' };

  const [message, setMessage] = useState<TAlertMsg>({
    msg: '',
    type: 'success',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const onSubmit = async (data: ContactFormFields) => {
    setIsSending(true);
    const response = await sendEmail(data);
    setIsSending(false);

    if (typeof response === 'string') {
      // empty the form
      formRef.current?.reset();
      setMessage({ msg: 'Message sent successfully', type: 'success' });
    } else if (response) {
      setMessage({ msg: response, type: 'error' });
    } else {
      setMessage({ msg: 'Something went wrong', type: 'error' });
    }
    setOpenSnack(true);
  };

  return (
    <Box
      component='form'
      ref={formRef}
      className={`relative flex w-full max-w-[50rem] flex-col gap-4 rounded-xl 
       bg-form-gradient p-4 ${className}`} // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      {openSnack ? (
        <AlertMessage
          open
          message={message.msg}
          type={message.type}
          onClose={() => {
            setOpenSnack(false);
          }}
        />
      ) : null}

      <FormTextField
        register={register('email', { required: true, pattern: emailRegex })}
        type='email'
        name='email'
        label='Email'
        placeholder='example@xyz.com'
        error={errors.email}
      />
      <FormTextField
        register={register('name', { required: true })}
        type='text'
        name='name'
        label='Name'
        placeholder='Your name'
        error={errors.name}
      />
      <FormTextField
        register={register('subject', { required: true })}
        type='text'
        name='subject'
        label='Subject'
        placeholder='Your name'
        error={errors.subject}
      />
      <FormTextField
        register={register('message', { required: false })}
        type='textarea'
        name='message'
        label='Message'
        placeholder='Your message here'
        error={errors.message}
      />
      <Box className='flex w-full justify-start'>
        <Button
          disabled={isSending}
          type='submit'
          variant='contained'
          className='flex w-full items-center justify-center gap-1 bg-primary-500'
        >
          <span className='flex items-center gap-0.5'>
            {isSending ? 'Sending' : 'Send'}
          </span>
          {isSending ? (
            <CircularProgress size={30} className='text-[#f0f5ff]' />
          ) : (
            <RiSendPlaneFill fontSize='1.4rem' />
          )}
        </Button>
      </Box>
    </Box>
  );
}
