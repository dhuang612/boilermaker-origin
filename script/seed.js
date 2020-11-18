'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Shoutout} = require('../server/db/models')
const {Emails} = require('../server/db/models')

const models = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    Shoutout.create({
      name: 'Bob',
      email: 'Bob@email.com',
      message: 'test msg',
      from: 'fake@fakeemail.com'
    })
  ])
  const userOne = users[0]
  const userTwo = users[1]
  const userThree = users[2]

  // console.log(userOne)
  // console.log(users[0].email)
  if (users) {
    const addEmail = await userOne.createEmail({
      firstName: 'Bob',
      email: 'bob@email.com'
    })
    // const shoutouts = await userOne.getShoutouts()
    if (addEmail) {
      //console.log('this is what addEmail contains', addEmail.dataValues)
      // const firstShoutout = await userOne.createShoutout({
      //   name: addEmail.firstName,
      //   email: addEmail.email,
      //   message: 'another shoutout!',
      //   from: ''
      // })

      console.log(`seeded ${users.length} users`)

      console.log(`seeded successfully`)
    }
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
