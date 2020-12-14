const jwt = require('jsonwebtoken');
const pwd = require('./password');
const User = require('../models/User');

const generateToken = async (claim) => {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      claim,
      'privatekey',
      { expiresIn: '16h', algorithm: 'HS512' },
      (err, token) => {
        if (err) reject({ e: err, m: "Can't sign" });
        resolve(token);
      }
    );
  });
};

const loginAttempt = async (attemptee) => {
  const { stream, password} = attemptee;

  const usr = await User.query()
    .where('login', stream)
    .first();

  if (!usr) throw 401;

  if (pwd.protect(password, usr.salt).compare(usr.password)) {
    throw 403;
  }

  return await generateToken({
    stream: stream,
    id_stream: usr.id_stream,
    segredo: 'secret',
  });
};

const setPassword = async (attemptee) => {
  const stream = attemptee.stream;
  const password = attemptee.password;
  const salt = pwd.saltShaker();

  const usr = await User.query()
    .update({ password: pwd.protect(password, salt), salt: salt })
    .where({ login: stream });

  return 'Td certo';
};

const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    res.sendStatus(401);
  }
};

const validateToken = (req, res, next) => {
  jwt.verify(
    req.token,
    'privatekey',
    { algorithm: 'HS512' },
    (err, authorizedData) => {
      if (err) {
        console.log('ERROR: Invalid Token');
        res.sendStatus(403);
      } else {
        req.user = authorizedData;
        next();
      }
    }
  );
};

module.exports = {
  validateToken,
  checkToken,
  loginAttempt,
  setPassword,
};
