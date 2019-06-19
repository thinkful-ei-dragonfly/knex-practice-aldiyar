const knex = require('knex')
require('dotenv').config()

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})


const searchTerm = 'fish'

knexInstance
  .select('*')
  .from('shopping_list')
  .where('name', 'ILIKE', `%${searchTerm}%`)
  .then(res => {
  console.log(res)
})

function paginateItems(pageNumber) {
  const productsPerPage = 6
  const offset = productsPerPage * (pageNumber - 1)
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(res => {
    console.log(res)
  })
}

paginateItems(1)

function getItemsAddedAfter(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added', '>',
      knexInstance.raw(`now()-'?? day'::INTERVAL`, daysAgo))
    .then(res => {
      console.log(res)
    })
}

getItemsAddedAfter(3)

function getTotalForEachCategory() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .sum('price as total')
    .groupBy('category')
    .orderBy('category', 'ASC')
    .then(res => {
    console.log(res)
  })
}

getTotalForEachCategory()