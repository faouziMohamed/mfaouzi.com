import { SITE_URL } from '@/lib/client-route.contant';
import { getOgImage } from '@/lib/utils';

import devData from '@/Repository/data/dev-data';
import { SeoTemplate, seoTemplate } from '@/Repository/data/seo/seoTemplate';

function getWebSiteDefinition() {
  const { socials } = devData;
  const socialUrls = Object.values(socials).map((social) => social.url);
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: devData.fullName,
    inLanguage: 'en-US',
    description: seoTemplate.description,
    publisher: {
      '@id': `${SITE_URL}/#about`,
    },
    sameAs: socialUrls,
  };
}

function getPrimaryImageObject() {
  const img = seoTemplate.logoUrl;
  return {
    '@type': 'ImageObject',
    contentUrl: img,
    '@id': img,
    url: img,
    caption: `${devData.fullName} - ${devData.skills.join(' | ')}`,
    Creator: { '@type': 'Person', name: devData.fullName },
    width: 460,
    height: 460,
    copyrightNotice: `© ${new Date().getFullYear()} ${devData.fullName}`,
  };
}

type TLdJsonData = {
  dateModified: string;
  seo: SeoTemplate;
};

function getWebPageDefinition(props: TLdJsonData) {
  const { dateModified, seo } = props;
  const { logoUrl, description, templateTitle } = seo;
  const ogImage = getOgImage(seo);
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: templateTitle,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#about` },
    primaryImageOfPage: { '@id': logoUrl },
    image: { '@id': logoUrl },
    thumbnailUrl: ogImage,
    inLanguage: 'en-US',
    datePublished: '2022-08-02T12:48:14',
    dateModified,
    description,
    potentialAction: [{ '@type': 'ReadAction', target: [SITE_URL] }],
  };
}

function getLdJsonData({ dateModified, seo }: TLdJsonData) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getWebSiteDefinition(),
      getPrimaryImageObject(),
      getWebPageDefinition({ dateModified, seo }),
    ],
  };
}

export default function getLdJsonStringified(props: TLdJsonData) {
  return JSON.stringify(getLdJsonData(props));
}
