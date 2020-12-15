const express = require('express');
const auth = require('../services/authenticator');
const { asyncHandler } = require('../helpers/webHelper');

let route = express.Router();

route.post('/login', async (req, res) => {
  if (!req.body.login) return res.sendStatus(401);
  if (!req.body.password) return res.sendStatus(401);

  try {
    let token = await auth.loginAttempt({ login, password } = req.body);
    res.send(token);
  } catch (err) {
    res.sendStatus(err);
  }
});

route.post('/changePass', async (req, res) => {
  if (!req.body.stream) return res.sendStatus(401);
  if (!req.body.password) return res.sendStatus(401);

  let attemptee = { stream: req.body.stream, password: req.body.password };

  try {
    let token = await auth.setPassword(attemptee);
    res.send(token);
  } catch (err) {
    console.log(err)
    res.sendStatus(err);
  }
});

route.get('/checkToken', auth.checkToken, auth.validateToken, (req, res) => {
    res.json('Token OK');
  }
);

route.post('/freeToken', asyncHandler(async (req, res) => {
    res.send(await auth.generateToken({ id: 0, login: 'su' }));
  })
);

module.exports = route;
