/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//set EJS as view engine
app.set("view engine", "ejs");

// eslint-disable-next-line no-undef
app.use(express.static(path.join(`${__dirname}/public/`)));

const { Todo } = require("./models");

app.get("/", async (request, response) => {
  const overdue = await Todo.overdue();
  const dueToday = await Todo.dueToday();
  const dueLater = await Todo.dueLater();
  response.render("index", {
    title: "Todo application",
    overdue,
    dueToday,
    dueLater,
  })
})

app.get("/todos", (request, response) => {
  console.log("Tod list");
});

app.get("/todos", async (_request, response) => {
  console.log("creating a todo", request.body);
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
  } catch(error) {
    console.log(error);
    return response.status(422).json(error);
  }
});


app.put("/todos/:id/markAsCompleted", async function (request, response) {
  console.log("We have to delete a todo with ID: ", request.params.id);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// app.delete("/todos/:id", async function (request, response) {
//   console.log("We have to delete a Todo with ID: ", request.params.id);
//   // FILL IN YOUR CODE HERE
//   const deleteTodo = await Todo.destroy({
//     where: {
//       id: request.params.id,
//     },
//   });
//   response.send(deleteTodo ? true : false);
//   // First, we have to query our database to delete a Todo by ID.
//   // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
//   // response.send(true)
// });

module.exports = app;
