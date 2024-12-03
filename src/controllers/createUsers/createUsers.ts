import validator from "validator";

import { User } from "../../models/user.js";
import { HttpRequest, HttpResponse, IController } from "../protocols.js";
import { ICreateUserParams, ICreateUserRepository } from "./protocols.js";
import { badRequest, createdRequest, serverErro } from "../helpers.js";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof ICreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }
      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return badRequest("Email is invalid");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return createdRequest<User>(user);
    } catch (error) {
      return serverErro();
    }
  }
}
