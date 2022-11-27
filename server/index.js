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
    if (err || result.affectedRows === 0 || result == null || result.insertId == null) {
      console.log(err);
      res.send(err);
    }else{
      res.send({ result, auth: true, id: result.insertId });
    }
  });
});


function likeText(text) {
  if (text != null) {
    return '%' + text + '%';
  }
  return '%%';
}


app.patch("/search", (req, res) => {
  const { id } = req.body;
  let { name } = req.body;
  let { tamanho } = req.body;
  let { cor } = req.body;
  let { preco } = req.body;

  if (name == '')
    name = null;
  if (tamanho == '')
    tamanho = null;
  if (cor == '')
    cor = null;
  if (preco == '')
    preco = null;

  //Não tava filtrando direito, então chamei o copilot
  let mysql;
  if (name == null && tamanho == null && cor == null && preco == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (name like ? OR price = ? OR color like ? OR size = ?)";
    db.query(mysql, [id, likeText(name), preco, likeText(cor), tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (name == null && tamanho == null && cor == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND price <= ?";
    db.query(mysql, [id, preco], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (name == null && tamanho == null && preco == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND color like ?";
    db.query(mysql, [id, likeText(cor)], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (name == null && cor == null && preco == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND size = ?";
    db.query(mysql, [id, tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (tamanho == null && cor == null && preco == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND name like ?";
    db.query(mysql, [id, likeText(name)], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });

  }else if (name == null && tamanho == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (color like ? OR price <= ?)";
    db.query(mysql, [id, likeText(cor), preco], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (name == null && cor == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (price <= ? OR size = ?)";
    db.query(mysql, [id, preco, tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (name == null && preco == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (color like ? OR size = ?)";
    db.query(mysql, [id, likeText(cor), tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (tamanho == null && cor == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (name like ? OR price <= ?)";
    db.query(mysql, [id, likeText(name), preco], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (tamanho == null && preco == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (name like ? OR color like ?)";
    db.query(mysql, [id, likeText(name), likeText(cor)], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (cor == null && preco == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (name like ? OR size = ?)";
    db.query(mysql, [id, likeText(name), tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (name == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (color like ? OR price <= ? OR size = ?)";
    db.query(mysql, [id, likeText(cor), preco, tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (tamanho == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (name like ? OR color like ? OR price <= ?)";
    db.query(mysql, [id, likeText(name), likeText(cor), preco], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (cor == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (name like ? OR price <= ? OR size = ?)";
    db.query(mysql, [id, likeText(name), preco, tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else if (preco == null) {
    mysql = "SELECT * from tenis WHERE user_id = ? AND (name like ? OR color like ? OR size = ?)";
    db.query(mysql, [id, likeText(name), likeText(cor), tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }else{
    mysql = "SELECT * from tenis WHERE user_id = ? AND (name like ? OR color like ? OR price <= ? OR size = ?)";
    db.query(mysql, [id, likeText(name), likeText(cor), preco, tamanho], (err, result) => {
      if (err){
        console.log(err);
        res.send(err);
      }
      else{
        res.send({ result, auth: true });
      }
    });
  }
});

app.put("/updateTenis", (req, res) => {
  const { id } = req.body;
  const { user_id } = req.body;
  const { name } = req.body;
  const { tamanho } = req.body;
  const { cor } = req.body;
  const { preco } = req.body;


  let mysql = "UPDATE tenis SET name = ?, size = ?, color = ?, price = ? WHERE tenis_id = ? AND user_id = ?";
  db.query(mysql, [name, tamanho, cor, preco, id, user_id], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({ result, auth: true });
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
    if (err) {
      console.log(err);
    } else {
      res.send({result, auth: true});
    }
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
      res.send({result, auth: true});
    }
  });
});


app.patch("/login", (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  let mysql = "SELECT * from user WHERE email = ? AND password = ?";
  db.query(mysql, [email, password], (err, result) => {
    if (err || result.length === 0) {
      console.log(err);
      res.send(err);
    }else{
      res.send({ result, auth: true, id: result[0].user_id });
    } 
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});