import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse } from "../protocols.js";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  IUpdateUsersParams,
} from "./protocols.js";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly repository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
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
