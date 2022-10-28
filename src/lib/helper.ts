type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
  theme?: string;
};

export function openGraph(props: OpenGraphType): string {
  const { siteName, templateTitle, description, theme = 'light' } = props;
  const {
    logo = 'https://avatars.githubusercontent.com/u/57812398?s=800&v=4',
  } = props;
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  // return `https://og.mfaouzi.live/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
  //   ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''}&theme=${theme}`;
  const ogDesc = encodeURIComponent(description.trim());
  const query = new URLSearchParams({
    siteName: ogSiteName,
    description: ogDesc,
    logo: ogLogo,
    theme,
  });

  if (ogTemplateTitle) {
    query.append('templateTitle', ogTemplateTitle);
  }

  return `https://og.mfaouzi.live/api/general?${query.toString()}`;
}
