import { Router } from "express";

import { MongoGetUsersRepository } from "../repositories/getUsers/mongoGetUsers.js";
import { GetUsersController } from "../controllers/getUsers/getUsers.js";
import { MongoCreateUser } from "../repositories/createUsers/mongoCreateusers.js";
import { CreateUserController } from "../controllers/createUsers/createUsers.js";
import { MongoUpdateUsers } from "../repositories/updateUsers/mongoUpdateUsers.js";
import { UpdateUserController } from "../controllers/updateUsers/updateUsers.js";

const route = Router();

route.get("/users", async (request, response) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersControllerObj = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersControllerObj.handle();

  response.send(body).status(statusCode);
});

route.post("/user", async (request, response) => {
  const repository = new MongoCreateUser();
  const controller = new CreateUserController(repository);
  const { statusCode, body } = await controller.handle(request);

  response.status(statusCode).send(body);
});

route.patch("/user/:id", async (request, response) => {
  const repository = new MongoUpdateUsers();
  const controller = new UpdateUserController(repository);
  const { statusCode, body } = await controller.handle(request);
  response.status(statusCode).send(body);
});

export default route;
