const express = require('express');

// const ProjectRouter = require('./projects/project-router.js');

const server = express();

server.get('/', (req, res) => {
    res.send(`<h2>Auth 1</h2>`);
  });


server.use(express.json());
// server.use('/api/projects', ProjectRouter);

module.exports = server;