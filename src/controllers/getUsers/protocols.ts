import { User } from "../../models/user.js";

export interface IgetUserRepository {
  getUsers(): Promise<User[]>;
}
