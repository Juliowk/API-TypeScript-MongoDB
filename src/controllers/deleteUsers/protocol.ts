// controller protocol

import { User } from "../../models/user.js";

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
