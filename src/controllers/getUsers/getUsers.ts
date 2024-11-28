import { IgetUserRepository, IgetUsersController } from "./protocols.js";

export class getUsersController implements IgetUsersController {
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
