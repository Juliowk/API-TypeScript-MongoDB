import {
  ICreateUserParams,
  ICreateUserRepository,
} from "../../controllers/createUsers/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import { User } from "../../models/user.js";

export class MongoCreateUser implements ICreateUserRepository {
  async createUser(params: ICreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User nor created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
