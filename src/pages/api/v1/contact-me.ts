import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { checkIfRequestIsValid } from '@/services/client/mail.service';
import { sendMessage } from '@/services/server/mail.service';

import { ContactMeRequestBody } from '@/types/portfolio/portfolio.types';

export type NextApiRequestWithBody = NextApiRequest & {
  body: ContactMeRequestBody;
};

const handler = nextConnect();

handler.post(async (req: NextApiRequestWithBody, res: NextApiResponse) => {
  const { name, email, subject, message } = req.body as ContactMeRequestBody;
  const errorsMessages = checkIfRequestIsValid({
    name,
    email,
    message,
    subject,
  });

  if (errorsMessages.length > 0) {
    res.status(400).json({ errors: errorsMessages });
    return;
  }

  try {
    const info = await sendMessage(name, email, subject, message);
    if (info.accepted.length > 0) {
      res.status(200).json({ message: 'success! mail sent' });
    } else {
      res.status(500).json({ message: ['Error sending the mail'] });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: ['Unable to send email, please try again later'] });
  }
});

export default handler;
