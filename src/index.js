var express = require('express');
var mysql = require('mysql2');
var config = require('dotenv');

var app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_DOCKER_PORT,
});

pool.on("connection", () => console.log("DB Connected!"));

app.get('/ping', function (req, res) {
  const result = pool.query("SELECT NOW()");
  res.json(result[0]);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
  res.send([
	{ id:1, name:'John' }, 
	{ id:2, name:'Jane' },
  ]);
});

app.get('/users/:id', function (req, res) {
  const id = req.params.id; 
  res.send({ id, name:'John'});
});

app.listen(process.env.NODE_DOCKER_PORT || 3000);
console.log("Server on port", process.env.NODE_DOCKER_PORT || 3000);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong' });
});
