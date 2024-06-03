const express = require('express');
const mysql = require('mysql2/promise');
const config = require('dotenv').config()


const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_DOCKER_PORT,
  database: process.env.MYSQL_DATABASE,
});

pool.on("connection", () => console.log("DB Connected!"));

app.get('/ping', async function (req, res) {
  const result = await pool.query("SELECT NOW()");
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

const port = process.env.NODE_DOCKER_PORT || 3000;
app.listen(port, () => { 
  console.log("Server on port", port);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong' });
});
