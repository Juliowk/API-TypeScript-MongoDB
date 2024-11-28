import express, { application } from "express";
import { getUsersController } from "./controllers/getUsers/getUsers.js";
import { MongoGetUsersRepository } from "./repositories/getUsers/mongoGetUsers.js";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Hello World!");
});

app.get("/users", async (request, response) => {
  const mongoGetUsersRepositoryObj = new MongoGetUsersRepository();
  const getUsersControllerObj = new getUsersController(
    mongoGetUsersRepositoryObj
  );

  const { body, statusCode } = await getUsersControllerObj.handle();

  response.send(body).status(statusCode);
});

app.listen(3333, () => console.log(`Rodando na porta 3333`));
