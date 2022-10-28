import SpMan from './space-man';

// eslint-disable-next-line prettier/prettier,@typescript-eslint/no-unused-expressions
('use client');
export default function SpaceMan() {
  return (
    <div className='relative flex w-full flex-col items-center justify-center pt-14'>
      <div className='relative flex h-60 w-60 items-center justify-center'>
        <SpMan />
      </div>
    </div>
  );
}
