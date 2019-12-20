const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const connectSessionKnex = require('connect-session-knex')

const db = require('../data/db-config.js')

const KnexSessionStore = connectSessionKnex(session)

const sessionConfig = {
  name: "this project is fun",
  secret: "random random random",
  cookie: {
    maxAge: 1000 * 60 * 60, //in milliseconds
    secure: false,
    httpOnly: true //cant access cookie via js
  },
  resave: false, //cant resave an expired session
  saveUnitialized: false, //has to be false via laws
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}


module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig))
};
