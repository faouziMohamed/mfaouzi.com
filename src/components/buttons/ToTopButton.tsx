import { Button } from '@mui/material';

export default function ToTopButton() {
  // TODO: make the button draggable
  const handleClick = () => {
    const toTop = document.getElementById('to-top');
    if (toTop) {
      toTop.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      onClick={handleClick}
      id='to-top-button'
      className='group fixed right-2 bottom-4 z-20 rounded-full
      bg-primary-700 p-2 text-white shadow-lg hover:bg-primary-600
      dark:bg-dark-300 dark:hover:bg-dark-400'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className=' h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          // chevron to top
          d='M5 15l7-7 7 7 0l7'
          className='group-hover:hidden'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          // Arrow to top
          d='M5 10l7-7m0 0l7 7m-7-7v18'
          // when the path is visible it will be animated
          className='hidden animate-bounce-to-top text-opacity-0 transition-opacity group-hover:block group-hover:text-opacity-100'
        />
      </svg>
    </Button>
  );
}
