const knex = require('./knex');

module.exports = {
  findUserByEmail: function(email){
    return knex('person').where('email', email).first();
  },
  createUser: function(user) {
    return knex('person').insert(user, '*').then(users => {
      return users[0];
    });
  },
  getAllWines: function() {
    return knex('wine');
  },
  createWine: function(wine){
    return knex('wine').insert(wine).returning('*');
  },
  getOneWine: function(id) {
    return knex('wine').where('id', id).first();
  },
  deleteOneWine: function(id) {
    return knex('wine').where('id', id).del();
  },
  updateWine: function(id,wine){
    return knex('wine').where('id', id).update(wine).first().returning('*');
  },
  getOneUser: function(id){
    return knex('person').where('id',id).first();
  }
};
