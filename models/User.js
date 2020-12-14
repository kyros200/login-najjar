const { Model } = require('objection');
const knex = require('../database/KnexConnection');

class User extends Model {
  static get tableName() {
    return 'login';
  }
  static get idColumn() {
    return 'id_user';
  }
}
User.knex(knex);

module.exports = User;
