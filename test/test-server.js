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
const {TEST_DATABASE_URL} = require('../config')
const {mockSignupData} = require('./mock-data')

chai.use(chaiSubset)
chai.use(require('chai-things'))

require('dotenv').config({path: '.env.test'})

chai.should()

chai.use(chaiHttp)

async function tearDownDb () {
  console.warn('Deleting database')
  await User.remove({})
  await Course.remove({})
}

describe('login, signup, and check authentication', () => {
  before(() => {
    return runServer(TEST_DATABASE_URL, 63000)
  })

  after(() => {
    tearDownDb()
    return closeServer()
  })

  // beforeEach(() => {
  //   return tearDownDb()
  // })
  let token

  it('should sign up a user', () => {
    chai.request(TEST_DATABASE_URL)
      .post('/api/users/')
      .send(mockSignupData)
      .end((error, response) => {
        response.should.have.status(201)
      })
  })

  it('should login and return a token', () => {
    chai.request(TEST_DATABASE_URL)
      .post('/api/users/login')
      .send({
        email: mockSignupData.email,
        password: mockSignupData.password
      })
      .end((error, response) => {
        response.should.have.status(200)
        response.body.should.have.property('authToken')
        token = response.body.authToken
      })
  })

  it('should access a protected end point', () => {
    chai.request(TEST_DATABASE_URL)
      .get('/api/users/')
      .set('authorization', `Bearer ${token.authToken}`)
      .end((error, response) => {
        response.should.have.status(200)
      })
  })
})