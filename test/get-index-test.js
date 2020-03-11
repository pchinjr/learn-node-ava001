let sandbox = require('@architect/sandbox')
let data = require('@begin/data')
let tiny = require('tiny-json-http')
let test = require('ava')

// start and end sandbox to execute tests
test.before(async () => {
  await sandbox.start({ quiet: true, })
})

test.after(async () => {
  await sandbox.end()
})

// check for a response.body for home page. 
test('get /', async t => {
	t.plan(1)
  let url = 'http://localhost:3333'
  let result = await tiny.get({url})
  t.true(!!result.body)
})

test('@begin/data', async t => {
  t.plan(2)
  // tests that @begin/data can write data
  let tmp = await data.set({table: 'tmp'})
  t.is(tmp.table, 'tmp')

  // tests that @begin/data can read data
  let result = await data.get({table: 'tmp'})
  t.is(result.length, 1)
  console.log(result)
})
