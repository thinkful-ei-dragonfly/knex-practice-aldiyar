require('dotenv').config()
const knex = require('knex')
const ShoppingServices = require('./shopping-list-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

console.log(ShoppingServices.getAllItems())