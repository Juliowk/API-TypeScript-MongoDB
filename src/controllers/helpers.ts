import { HttpResponse } from "./protocols.js";

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const okRequest = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: body,
  };
};

export const createdRequest = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: body,
  };
};

export const serverErro = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: "Something went wrong",
  };
};