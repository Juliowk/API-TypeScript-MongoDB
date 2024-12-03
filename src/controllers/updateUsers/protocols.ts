import { User } from "../../models/user.js";

export interface IUpdateUsersParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUsersParams): Promise<User>;
}