// controller

import { User } from "../../models/user.js";
import { badRequest, okRequest, serverErro } from "../helpers.js";
import { HttpRequest, HttpResponse, IController } from "../protocols.js";
import { IDeleteUserRepository } from "./protocol.js";

export class DeleteUserController implements IController {
  constructor(private readonly repository: IDeleteUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Id not informed");
      }

      const user = await this.repository.deleteUser(id);

      return okRequest<User>(user);
      
    } catch (error) {
      return serverErro();
    }
  }
}
