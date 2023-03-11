import clsxm from '@/lib/utils';

export default function HorizontalLine({
  className = '',
}: {
  className?: string;
}) {
  const cls = clsxm('block pt-[0.07rem] flex-1 dark:bg-[#4f5e5e69]', className);
  return <span className={`${cls} bg-[#eeeeee] opacity-80 `} />;
}
