import { User } from "../../models/user.js";
import { badRequest, okRequest, serverErro } from "../helpers.js";
import { HttpRequest, HttpResponse, IController } from "../protocols.js";
import { IUpdateUserRepository, IUpdateUsersParams } from "./protocols.js";

export class UpdateUserController implements IController {
  constructor(private readonly repository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<IUpdateUsersParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest("Missing user id");
      }

      if (!body) {
        return badRequest("Missing fields");
      }

      const allowedFieldsToUpdate: (keyof IUpdateUsersParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) =>
          !allowedFieldsToUpdate.includes(key as keyof IUpdateUsersParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received fiels is not allowed");
      }

      const user = await this.repository.updateUser(id, body);

      return okRequest<User>(user);
    } catch (error) {
      return serverErro();
    }
  }
}
