import express, { request } from "express";
import dotenv from "dotenv";

import { GetUsersController } from "./controllers/getUsers/getUsers.js";
import { MongoGetUsersRepository } from "./repositories/getUsers/mongoGetUsers.js";
import { MongoClient } from "./database/mongo.js";
import { MongoCreateUser } from "./repositories/createUsers/mongoCreateusers.js";
import { CreateUserController } from "./controllers/createUsers/createUsers.js";

const main = async () => {
  dotenv.config();

  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || "3333";

  await MongoClient.connect();

  app.get("/", (request, response) => {
    response.status(200).send("Hello World!");
  });

  app.get("/users", async (request, response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersControllerObj = new GetUsersController(
      mongoGetUsersRepository
    );

    const { body, statusCode } = await getUsersControllerObj.handle();

    response.send(body).status(statusCode);
  });

  app.post("/user", async (request, response) => {
    const repository = new MongoCreateUser();
    const controller = new CreateUserController(repository);
    const { statusCode, body } = await controller.handle(request);

    response.status(statusCode).send(body);
  });

  app.listen(PORT, () => console.log(`Rodando na porta 3333`));
};

main();
