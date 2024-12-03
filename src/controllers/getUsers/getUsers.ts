import { IController } from "../protocols.js";
import { IgetUserRepository } from "./protocols.js";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IgetUserRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
