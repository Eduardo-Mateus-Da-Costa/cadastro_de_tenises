const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tenises",
});

app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  let mysql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
  db.query(mysql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.send({ result, auth: true, id: result.insertId });
  });
});

app.patch("/search", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { tamanho } = req.body;
  const { cor } = req.body;
  const { preco } = req.body;
  
  let mysql =
    "SELECT * from tenis WHERE user_id = ? AND (name = ? OR price = ? OR color = ? OR size = ?)";
  db.query(mysql, [id, name, preco, cor, tamanho], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.put("/updateTenis", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { tamanho } = req.body;
  const { cor } = req.body;
  const { preco } = req.body;


  let mysql = "UPDATE tenis SET name = ?, size = ?, color = ?, price = ? WHERE id = ?";
  db.query(mysql, [name, tamanho, cor, preco, id], (err, result) => {
    if (err) {
      //console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createTenis", (req, res) => {
  const { name } = req.body;
  const { tamanho } = req.body;
  const { preco } = req.body;
  const { cor } = req.body;
  const { user_id } = req.body;

  let mysql = "INSERT INTO tenis (name, size, color, price, user_id) VALUES (?, ?, ?, ?, ?)";
  db.query(mysql, [name, tamanho, cor, preco, user_id], (err, result) => {
    res.send(result);
  });
});

app.delete("/deleteTenis/:id/:user_id", (req, res) => {
  const { id } = req.params;
  const { user_id } = req.params;
  let mysql = "DELETE FROM tenis WHERE tenis_id = ? AND user_id = ?";
  db.query(mysql, [id, user_id], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


app.patch("/login", (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  let mysql = "SELECT * from user WHERE email = ? AND password = ?";
  db.query(mysql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.send({ result, auth: true, id: result[0].user_id });
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});