import axios, { AxiosError } from 'axios';

import { CONTACT_ME_ROUTE } from '@/lib/serverless-route.constant';

import {
  ContactFormFields,
  ContactMeRequestBody,
} from '@/types/portfolio/portfolio.types';

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

export type TOkResponse = { message: string };
export type TErrorResponse = { errors: string[] };

export async function sendEmail(data: ContactFormFields) {
  try {
    const result = await axios.post<TOkResponse>(CONTACT_ME_ROUTE, data);
    return result.data.message;
  } catch (error) {
    const errorMsg = (<AxiosError<TErrorResponse>>error).response?.data;
    return errorMsg?.errors;
  }
}
