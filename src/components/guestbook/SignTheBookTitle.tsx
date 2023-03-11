import Typography from '@mui/material/Typography';

export default function SignTheBookTitle() {
  return (
    <section className='flex flex-col gap-0  text-center'>
      <Typography
        component='h3'
        className='text-6 m-0 font-primary font-[700] text-[#0B4B56] dark:text-[#00caee]'
      >
        Sign the Guestbook 📝
      </Typography>
      <Typography className='m-0 text-[0.8rem] text-[#616869] dark:text-[#b5cdd1]'>
        Share a message for a future visitor of my site.
      </Typography>
    </section>
  );
}
