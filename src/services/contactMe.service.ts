import axios, { AxiosError } from 'axios';

import { FormValues } from '@/components/home/FormTextField';

export type TOkResponse = { message: string };
export type TErrorResponse = { errors: string[] };

export async function sendEmail(data: FormValues) {
  try {
    const result = await axios.post<TOkResponse>('/api/v1/contact-me', data);
    return result.data;
  } catch (error) {
    const errorMsg = (<AxiosError<TErrorResponse>>error).response?.data;
    return errorMsg?.errors;
  }
}
