const express = require('express');
const router = express.Router();
const queries = require('../db/queries.js');
const bcrypt = require('bcrypt');

function validUser(user){
  console.log(user);
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && user.password.trim() != '';
  return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
console.log(req.body);
  if(validUser(req.body)){
    //check to see if email is unique
    queries
      .findUserByEmail(req.body.email)
      .then(user => {
        if(user) {
          //they were foudn and this email is not unique
          next(new Error('Email in use'));
        } else {
          //not found and should insert
          const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
          };

          bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            user.password = hash;
            queries
              .createUser(req.body)
              .then(user => {
                res.json(user);
              });
          });

        }
      });
  } else {
    next(new Error('Invalid User'));
  }
});

module.exports = router;
