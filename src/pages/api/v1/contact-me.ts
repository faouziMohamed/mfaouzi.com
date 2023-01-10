import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import {
  checkIfRequestIsValid,
  ContactMeRequestBody,
  createMailMessage,
  createSMTPTransport,
} from '@/lib/api/contactMe.api';

export type NextApiRequestWithBody = NextApiRequest & {
  body: ContactMeRequestBody;
};

// create reusable transporter object using the default SMTP transport
const transporter = createSMTPTransport();

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
  }

  const mailMessage = createMailMessage({ name, email, subject, message });

  try {
    const info = await transporter.sendMail(mailMessage);
    if (info.accepted.length > 0) {
      res.status(200).json({ message: 'success! mail sent' });
    } else {
      const errorMsg = `Error sending email`;
      res.status(500).json({ message: errorMsg });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to send email, please try again later' });
  }
});

export default handler;
