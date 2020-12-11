const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repositorie = {id: uuid() , title, url, techs, likes: 0};

  repositories.push(repositorie);

  response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const index = repositories.findIndex(repositorie => repositorie.id === id);

  if (index < 0) {
    return response.sendStatus(400);
  } 

  repositories[index] = { ...repositories[index], url, title, techs};

  response.json(repositories[index]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repositorie => repositorie.id === id);

  if (index < 0) {
    return response.sendStatus(400);
  } 

  repositories.splice(index,1);

  response.sendStatus(204);

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorie = repositories.find(repositorie => repositorie.id === id);

  if (!repositorie) {
    return response.sendStatus(400);
  } 
  
  repositorie.likes++;
  response.json(repositorie);
});

module.exports = app;
