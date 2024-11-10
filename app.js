const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "12345",
  database: "items",
});

client
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database", err.stack));

app.get("/items", (req, res) => {
  client
    .query("SELECT * FROM items")
    .then((result) => {
      res.json(result.rows);
      console.log(result.rows);
    })
    .catch((err) => {
      console.error("Error executing query", err.stack);
      res.status(500).send("Error fetching data");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
