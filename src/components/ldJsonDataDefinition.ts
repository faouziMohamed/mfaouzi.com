import devData from '@/services/data/dev-data';

function getWebSiteDefinition(siteUrl: string) {
  const { socials } = devData;

  // get urls from socials
  const socialUrls = Object.values(socials).map((social) => social.url);

  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Faouzi Mohamed',
    inLanguage: 'en-US',
    description:
      'My personal Portfolio where I present myself, my skills, some projects etc.',
    publisher: {
      '@id': `${siteUrl}/#about`,
    },
    sameAs: socialUrls,
  };
}

function getPrimaryImageObject(siteUrl: string) {
  const img = `${siteUrl}/images/faouzi-mhd.jpeg`;
  return {
    '@type': 'ImageObject',
    contentUrl: img,
    '@id': img,
    url: img,
    caption: 'Faouzi Mohamed - Full Stack Developer',
    Creator: { '@type': 'Person', name: 'Faouzi Mohamed' },
    width: 460,
    height: 460,
    copyrightNotice: '© 2018 Faouzi Mohamed',
  };
}

type TLdJsonData = {
  siteUrl: string;
  ogImage: string;
  dateModified: string;
};

function getWebPageDefinition({ siteUrl, ogImage, dateModified }: TLdJsonData) {
  return {
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    url: siteUrl,
    name: 'Faouzi Mohamed - Personal website',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#about` },
    primaryImageOfPage: { '@id': `${siteUrl}/images/faouzi-mhd.jpeg` },
    image: { '@id': `${siteUrl}/images/faouzi-mhd.jpeg` },
    thumbnailUrl: ogImage,
    inLanguage: 'en-US',
    datePublished: '2022-08-02T12:48:14',
    dateModified,
    description: 'Developer Portfolio of Faouzi Mohamed',
    potentialAction: [{ '@type': 'ReadAction', target: [siteUrl] }],
  };
}

function getLdJsonData({ siteUrl, ogImage, dateModified }: TLdJsonData) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getWebSiteDefinition(siteUrl),
      getPrimaryImageObject(siteUrl),
      getWebPageDefinition({ siteUrl, ogImage, dateModified }),
    ],
  };
}

export default function getLdJsonStringified({
  siteUrl,
  ogImage,
  dateModified,
}: TLdJsonData) {
  const objData = getLdJsonData({
    siteUrl,
    ogImage,
    dateModified,
  });
  return JSON.stringify(objData);
}
