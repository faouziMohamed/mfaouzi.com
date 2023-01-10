/* eslint-disable no-console */
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Mailjet from 'node-Mailjet';

export type ContactMeRequestBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

function createMailMessage({
  name,
  email,
  subject,
  message,
}: ContactMeRequestBody) {
  return {
    to: 'romonc2001@gmail.com',
    from: 'reach-me@mfaouzi.com',
    subject,
    text:
      `Message sent from the portfolio by <${email}>\n\n` +
      `Name: ${name}\n` +
      `Message: ${message}`,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
}

export type NextApiRequestWithBody = NextApiRequest & {
  body: ContactMeRequestBody;
};

const handler = nc();
handler.post(async (req: NextApiRequestWithBody, res: NextApiResponse) => {
  const {
    name,
    email,
    subject = '<empty subject>',
    message,
  } = req.body as ContactMeRequestBody;
  console.log({ Mailjet });
  const msg = createMailMessage({ name, subject, email, message });
  try {
    const mailAck = await sgMail.send(msg);
    if (mailAck[0].statusCode === 202) {
      await sendWithMailJet();
      res.status(200).json({ message: 'success! mail sent' });
    } else {
      const errorMsg = `Error sending email: ${mailAck[0].statusCode}`;
      res.status(500).json({ message: errorMsg });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Enable to send the mail cause of an unknown error' });
  }
});

async function sendWithMailJet() {
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC!,
    process.env.MJ_APIKEY_PRIVATE!,
  );

  console.log({ mailjet });
  try {
    await mailjet.post('send', { version: 'v3.1' }).request(generateMessage());
  } catch (error) {
    console.log(error);
  }
}

export default handler;

function generateMessage() {
  return {
    Messages: [
      {
        From: {
          Email: 'reach-me@mfaouzi.com',
          Name: 'Faouzi Mohamed',
        },
        To: [
          {
            Email: 'romonc2001@gmail.com',
            Name: 'You',
          },
        ],
        Subject: 'Your email flight plan!',
        TextPart:
          'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.Mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  };
}
