import express, { application } from "express";

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    response.status(200).send('Hello World!');
});

app.listen(3333, () => console.log(`Rodando na porta 3333`));
