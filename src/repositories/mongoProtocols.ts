import { User } from "../models/user.js";

export type MongoUser = Omit<User, "id">