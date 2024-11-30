import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse } from "../protocols.js";

export interface ICreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<User>;
}

export interface ICreateUserController {
  handle(httpRequest: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User>>;
}
