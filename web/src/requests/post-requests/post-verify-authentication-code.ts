import { basePostRequest } from '../base-requests';

export const postVerifyCode = (
  email_address: string,
  auth_code: string,
  data: any,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/email/verify_authentication_code/" + email_address + "/" + auth_code,
    data,
    responseHandler,
    errorHandler
  );
};