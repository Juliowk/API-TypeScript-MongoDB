// repository

import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../controllers/deleteUsers/protocol.js";
import { MongoClient } from "../../database/mongo.js";
import { User } from "../../models/user.js";

export class MongoDeleteUser implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not find");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }
    
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
