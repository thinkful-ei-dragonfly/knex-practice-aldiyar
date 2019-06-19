const ShoppingService = require('../src/shopping-list-service')
const knex = require('knex')

console.log(process.env.TEST_DB_URL)

describe(`Shopping service object`, function () {
  let db;
  let testItems = [
    {
      id: 1,
      checked: false,
      name: 'test obj 1',
      price: '12.22',
      category: 'Main',
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      checked: false,
      name: 'test obj 2',
      price: '11.11',
      category: 'Snack',
      date_added: new Date('2100-05-22T16:28:32.615Z')
    },
    {
      id: 3,
      checked: false,
      name: 'test obj 3',
      price: '10.99',
      category: 'Lunch',
      date_added: new Date('1919-12-22T16:28:32.615Z')
    },
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db ('shopping_list').truncate())
  
  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .insert(testItems)
        .into('shopping_list')
    })

    it(`getAllItems() resolves all items from  'shopping_list' table`, () => {
      return ShoppingService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems.map(item => ({
            ...item,
            checked: false,
        })))
      })
    })
    it(`getById() resolves an item by id from 'shopping_list' table`, () => {
      const itemId = 1
      const expectedItem = testItems[itemId-1]
      return ShoppingService.getById(db, itemId)
        .then(actual => {
          expect(actual).to.eql({
            id: itemId,
            checked: false,
            name: expectedItem.name,
            price: expectedItem.price,
            category: expectedItem.category,
            date_added: expectedItem.date_added
        })
      })
    })
    it(`deleteItem() deletes an item from 'shopping_list' using id`, () => {
      const itemId = 2
      const expected = testItems.filter(item => item.id !== itemId)
      return ShoppingService.deleteItem(db, itemId)
        .then(() => ShoppingService.getAllItems(db))
        .then(allItems => {
        expect(allItems).to.eql(expected)
      })
    })
    it(`updateItem() updates an items with given params and targets by id`, () => {
      const itemId = 3
      const newFields = {
        name: 'Updated name',
        checked: true,
      }
      const updatedItem = {
        id: 3,
        price: '10.99',
        category: 'Lunch',
        date_added: new Date('1919-12-22T16:28:32.615Z'),
        ...newFields,
      }
      return ShoppingService.updateItem(db, itemId, newFields)
        .then(() => ShoppingService.getById(db, itemId))
        .then(item => {
        expect(item).to.eql(updatedItem)
      })
    })

  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllArticles() resolves an empty array`, () => {
      return ShoppingService.getAllItems(db)
        .then(actual => {
        expect(actual).to.eql([])
      })
    })
    it(`insertItem() adds new item to the 'shopping_list'`, () => {
      const item = {
        checked: false,
        name: 'Added item',
        price: '15.55',
        category: 'Main',
        date_added: new Date('1919-12-22T16:28:32.615Z')
      }
      return ShoppingService.insertItem(db, item)
        .then(actual => {
          console.log(actual)
          expect(actual).to.eql({
            id: 1,
            checked: item.checked,
            name: item.name,
            price: item.price,
            category: item.category,
            date_added: item.date_added,
        })
      })
    })
  })
})