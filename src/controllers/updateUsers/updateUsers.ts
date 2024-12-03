import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse, IController } from "../protocols.js";
import { IUpdateUserRepository, IUpdateUsersParams } from "./protocols.js";

export class UpdateUserController implements IController {
  constructor(private readonly repository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<IUpdateUsersParams>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields",
        };
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
        return {
          statusCode: 400,
          body: "Some received fiels is not allowed",
        };
      }

      const user = await this.repository.updateUser(id, body);

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
