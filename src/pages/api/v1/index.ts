/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions */
// get last updated from git commit
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

// get the api version from package.json
import packageJson from '../../../../package.json';

const apiVersion = packageJson.version;

//  get the last build date from next.config.js
const { publicRuntimeConfig } = getConfig();
const { lastBuild } = publicRuntimeConfig;

// eslint-disable-next-line no-console
console.log(`Version: ${apiVersion},  Last Build: ${lastBuild}`);

const apiInfo = { version: apiVersion, lastBuild };
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-control', 's-maxage=6000, stale-while-revalidate=30');
  res.status(200).json({ apiInfo });
};

export default handler;
