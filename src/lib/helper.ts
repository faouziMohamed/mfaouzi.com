type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
  theme?: string;
};

export function openGraphImage(props: OpenGraphType): string {
  const { siteName, templateTitle, description, theme = 'light' } = props;
  const {
    logo = 'https://avatars.githubusercontent.com/u/57812398?s=800&v=4',
  } = props;
  const ogLogo = logo;
  const ogSiteName = siteName.trim();
  const ogTemplateTitle = templateTitle ? templateTitle.trim() : undefined;
  const ogDesc = description.trim();
  const query = new URLSearchParams({
    siteName: ogSiteName,
    description: ogDesc,
    logo: ogLogo,
    theme,
  });

  if (ogTemplateTitle) {
    query.append('templateTitle', ogTemplateTitle);
  }
  return `https://og.mfaouzi.com/api/general?${query.toString()}`;
}

export function promisify<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
