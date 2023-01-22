const seoDefault = {
  title: 'Faouzi Mohamed',
  siteName: "Faouzi Mohamed's Portfolio",
  description:
    'My personal Portfolio where I present myself, my skills, some projects etc. ',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  pathname: '/',
  type: 'website',
  robots: 'follow, index',
  locale: 'en_US',
  imageWidth: '1200',
  imageHeight: '630',
  ogId: process.env.NEXT_PUBLIC_FB_APP_ID,
  keywords:
    'faouzi, mohamed,Faouzi Mohamed, Portfolio, developer, web developer, full-stack developer, backend developer, resume',
};

export default seoDefault;
