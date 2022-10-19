const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(express.static(__dirname + "/static"));

app.get('/feed', async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: { },
  });
  res.json(todos);
});

app.get('/search', async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      body: {
        search: req.query.q,
      },
    },
  });
  res.json(todos);
});

app.listen(3000, () => console.log("Server started"));