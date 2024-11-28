import { IgetUserRepository } from "../../controllers/getUsers/protocols.js";
import { User } from "../../models/user.js";

export class MongoGetUsersRepository implements IgetUserRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Júlio",
        lastName: "Elias",
        email: "julio@gmail.com",
        password: "1234",
      },
    ];
  }
}
