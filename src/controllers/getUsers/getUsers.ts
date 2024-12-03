import { User } from "../../models/user.js";
import { okRequest, serverErro } from "../helpers.js";
import { HttpResponse, IController } from "../protocols.js";
import { IgetUserRepository } from "./protocols.js";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IgetUserRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();
      return okRequest<User[]>(users);
    } catch (error) {
      return serverErro();
    }
  }
}
