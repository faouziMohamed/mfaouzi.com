import clsxm from '@/lib/utils';

import HeaderLineBlob from '~/icons/header-line-blob.svg';

export default function SiteLogo() {
  return (
    <div className={clsxm('relative flex w-fit flex-col')}>
      <h1 className='font-primary text-[1.17rem] font-bold'>Faouzi Mohamed</h1>
      <div className='absolute inset-0 top-[1.8rem] z-10 h-fit'>
        <HeaderLineBlob className='w-full' />
      </div>
    </div>
  );
}
