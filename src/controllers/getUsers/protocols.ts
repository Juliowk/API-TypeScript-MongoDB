import { User } from "../../models/user.js";
import { HttpResponse } from "../protocols.js";

export interface IgetUsersController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface IgetUserRepository {
  getUsers(): Promise<User[]>;
}
