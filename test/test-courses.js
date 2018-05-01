const chai = require('chai')
const chaiHttp = require('chai-http')
const {app, runServer, closeServer} = require('../server')
const {publishCourse} = require('../routes/coursesRouter')
const {
  createNewDraftAndUpdateUser,
  updateDraftInUserObject
} = require('../routes/draftsRouter')
const {createNewUser, getUser} = require('../routes/usersRouter')
const {Course} = require('../models/course')
const {User} = require('../models/user')
const chaiSubset = require('chai-subset')
const {TEST_DATABASE_URL, PORT} = require('../config')
const {mockSignupData} = require('./mock-data')

chai.use(chaiSubset)
chai.use(require('chai-things'))

chai.should()

chai.use(chaiHttp)

async function tearDownDb () {
  console.warn('Deleting database')
  await User.remove({})
  await Course.remove({})
}

describe('login, signup, and check authentication', () => {
  before(() => {
    return runServer(TEST_DATABASE_URL)
  })

  after(() => {
    tearDownDb()
    return closeServer()
  })

  // - publish course
  // - get 12 courses for index page
  // - get specified course
  // - search courses
  // - enroll in course
  // - mark part of course complete

  let token

  it('should publish course', () => {

  })
})
