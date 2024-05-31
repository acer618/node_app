var express = require('express');
var app = express();


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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong' });
});
