import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse } from "../protocols.js";

export interface IUpdateUsersParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUsersParams): Promise<User>;
}

export interface IUpdateUserController {
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}