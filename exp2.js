
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const secret = 'abc';

app.post('/login', (req, res) => {
  const token = jwt.sign({ user: 'admin' }, secret);
  res.json({ token });
});

function auth(req, res, next) {
  try {
    jwt.verify(req.headers.token, secret);
    next();
  } catch {
    res.send('Invalid token');
  }
}

app.get('/blog/:id', auth, (req, res) => {
  res.send('Blog ID: ' + req.params.id);
});

app.post('/blog', auth, (req, res) => {
  res.send('Blog created: ' + req.body.title);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
