import { Box as Section } from '@mui/material';

import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';

import ContactBlob from '~/icons/contact-blob.svg';

import ContactForm from './ContactForm';

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection(props: ContactSectionProps) {
  const { className = '' } = props;
  return (
    <Section
      id='contacts'
      className={`relative flex w-full  flex-col items-center gap-4 ${className}`}
    >
      <SectionTitleWithBlob
        title='Contact'
        BlobComponent={() => (
          <SVGBlob
            Blob={ContactBlob}
            twHeight='h-[1.07rem]'
            twBottom='-bottom-[.61rem]'
            twLeft='left-[.24rem]'
          />
        )}
      />
      <ContactForm />
    </Section>
  );
}
