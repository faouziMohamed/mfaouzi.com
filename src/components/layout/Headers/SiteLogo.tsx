import HeaderLineBlob from '~/icons/header-line-blob.svg';

export default function SiteLogo() {
  return (
    <div className='relative flex w-fit grow flex-col gap-1 pl-2'>
      <h1 className='font-primary text-[1.17rem] font-bold'>Faouzi Mohamed</h1>
      <div className='absolute inset-0 top-[90%] z-10 pl-2'>
        <HeaderLineBlob className='absolute h-4 w-full object-cover' />
      </div>
    </div>
  );
}
