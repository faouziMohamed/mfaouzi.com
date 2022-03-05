import SpaceManSVG from '~/icons/space-man.svg';

export default function SpaceMan() {
  return (
    <div className='relative flex w-full flex-col items-center justify-center pt-14'>
      <div className='relative flex h-60 w-60 items-center justify-center'>
        <SpaceManSVG
          className='h-full w-full object-contain'
          alt='Space man illustration'
          title='Space man in space'
        />
      </div>
    </div>
  );
}
