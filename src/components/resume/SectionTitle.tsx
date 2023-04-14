import { IconType } from 'react-icons';

interface ISectionTitle {
  title: string;
  Icon: IconType;
  className?: string;
}

export default function SectionTitle(props: ISectionTitle) {
  const { title, Icon, className = '' } = props;
  return (
    <header
      className={`flex items-center gap-2 border-b border-b-[3px] text-xl ${className}`}
    >
      <Icon />
      <h3
        aria-label={`${title}'s heading`}
        className='font-[Roboto] text-2xl font-bold'
      >
        {title}
      </h3>
    </header>
  );
}
