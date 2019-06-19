require('dotenv').config()
const knex = require('knex')
const ArticlesServices = require('./articles-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})


ArticlesServices.getAllArticles(knexInstance)
  .then(articles => console.log(articles))
  .then(() => 
    ArticlesServices.insertArticle(knexInstance, {
      title: 'New title',
      content: 'New content',
      date_published: new Date(),
    })
)
  .then(newArticle => {
    console.log(newArticle)
    return ArticlesServices.updateArticle(
      knexInstance,
      newArticle.id,
      { title: 'Updated title' }
    ) .then(() => ArticlesServices.getById(knexInstance, newArticle.id))
  })
  .then(article => {
    console.log(article)
    return ArticlesServices.deleteArticle(knexInstance, article.id)
  })
