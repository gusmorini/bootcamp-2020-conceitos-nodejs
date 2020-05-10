const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

/**
 * lista os repositórios
 */
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

/**
 * cria um repositório
 */
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  response.json(repository);
});

/**
 * atualiza um repositorio
 */
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "repository not found" });
  }

  const { title, url, techs } = request.body;

  const repository = repositories[index];

  /** atualizando apenas os campos informados */
  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  repositories[index] = repository;

  response.json(repository);
});

/**
 * apaga um repositório
 */
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "repository not found" });
  }

  repositories.splice(index, 1);

  return response.status(204).send();
});

/**
 * da like em um repositório
 */
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "repository not found" });
  }

  const repository = repositories[index];

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
