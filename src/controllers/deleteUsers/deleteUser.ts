// controller

import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse, IController } from "../protocols.js";
import { IDeleteUserRepository } from "./protocol.js";

export class DeleteUserController implements IController {
  constructor(private readonly repository: IDeleteUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id not informed",
        };
      }

      const user = await this.repository.deleteUser(id);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
