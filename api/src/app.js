const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.js');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use('/', routes);

// endware que catchea errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;