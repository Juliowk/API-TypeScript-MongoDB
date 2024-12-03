import { HttpResponse, HttpStatusCode } from "./protocols.js";

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const okRequest = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.OK,
    body: body,
  };
};

export const createdRequest = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body: body,
  };
};

export const serverErro = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong",
  };
};