import { ObjectId } from "mongodb";

import {
  IUpdateUserRepository,
  IUpdateUsersParams,
} from "../../controllers/updateUsers/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import { User } from "../../models/user.js";
import { MongoUser } from "../mongoProtocols.js";

export class MongoUpdateUsers implements IUpdateUserRepository {
  async updateUser(id: string, params: IUpdateUsersParams): Promise<User> {
    await MongoClient.db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not updated");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
