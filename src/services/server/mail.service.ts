import nodemailer from 'nodemailer';

import { ContactMeRequestBody } from '@/types/portfolio/portfolio.types';

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

export async function sendMessage(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  const transporter = createSMTPTransport();

  const mailMessage = createMailMessage({ name, email, subject, message });
  return transporter.sendMail(mailMessage);
}
