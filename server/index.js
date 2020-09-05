const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create todo

app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);

    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get todo

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * from todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "update todo set description = $1 where todo_id = $2",
      [description, id]
    );
    res.json("Todo updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query("delete from todo where todo_id = $1", [
      id,
    ]);
    res.json("todo deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("SERVER RUNNING ON 5000");
});
