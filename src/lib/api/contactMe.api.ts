import nodemailer from 'nodemailer';

export type ContactMeRequestBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function checkIfRequestIsValid(props: ContactMeRequestBody) {
  const { name, email, message, subject } = props;
  const errorsMessages = [];
  // make sure The name, email, and the message are not empty
  if (!name) {
    errorsMessages.push('A contact Name is required!');
  }

  if (!email) {
    errorsMessages.push('An Email is required to contact you back if needed.');
  }

  if (!message) {
    errorsMessages.push(
      'A message is required, a blank message is not allowed!',
    );
  }

  if (!subject) {
    errorsMessages.push(
      'Adding a subject will help me understand your message, please add one!',
    );
  }
  return errorsMessages;
}

export function createSMTPTransport() {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT!);
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASSWORD!;

  return nodemailer.createTransport({
    port,
    host,
    secure: true,
    auth: { user, pass },
  });
}

export function createMailMessage({
  name,
  email,
  subject,
  message,
}: ContactMeRequestBody) {
  const senderName = process.env.SENDER_NAME!;
  const senderEmail = process.env.SENDER_EMAIL!;
  const from = `${senderName} <${senderEmail}>`;
  const to = `${name} <portfolio@mfaouzi.com>`;
  return {
    from,
    to,
    subject: subject || `Message from ${name} via portfolio`,
    text:
      `Message sent from the portfolio by <${email}>\n\n` +
      `Message:\n\n${message}\n`,
  };
}
