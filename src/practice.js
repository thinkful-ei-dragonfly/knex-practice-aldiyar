const knex = require('knex')
require('dotenv').config()

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})



const qry = knexInstance
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .where({ name: 'Point of view gun' })
  .first()
  .toQuery()

  console.log(qry)

const searchTerm = 'holo'
  
knexInstance
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .where('name', 'ILIKE', `%${searchTerm}%`)
  .then(result => {
  console.log(result)
  })

function paginateProducts(page) {
  const productsPerPage = 10
  const offset = productsPerPage * (page - 1)
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then(res => {
    console.log(res)
  })
}

paginateProducts(2)

function getProductsWtihImages() {
  knexInstance
    .select('product_id', 'name', 'price', 'category', 'image')
    .from('amazong_products')
    .whereNotNull('image')
    .then(res => {
      console.log(res)
    })
}

getProductsWtihImages()


function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed', '>',
      knexInstance.raw(`now()-'?? days'::INTERVAL`, days)
  )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' },
    ])
    .then(res => {
    console.log(res)
  })
}

mostPopularVideosForDays(30)