import express from "express";
import dotenv from "dotenv";

import { MongoClient } from "./database/mongo.js";
import routeUsers from "./routes/usersRoutes.js";

const main = async () => {
  dotenv.config();

  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || "3333";

  await MongoClient.connect();

  app.get("/", (request, response) => {
    response.status(200).send("Hello World!");
  });

  app.use(routeUsers);

  app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
};

main();
