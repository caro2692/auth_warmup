const knex = require('./knex');

module.exports = {
  findUserByEmail: function(email){
    return knex('person').where('email', email).first();
  },
  createUser: function(user) {
    return knex('person').insert(user, '*').then(users => {
      return users[0];
    });
  }
};
