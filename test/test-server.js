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

// require('dotenv').config()

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

  let token
  let testUser

  beforeEach(async () => {
    tearDownDb()
  })

  it('should sign up a user', () => {
    return chai.request(app)
      .post('/api/users/')
      .send(mockSignupData)
      .then(response => {
        response.should.have.status(201)
        response.body.should.have.property('authToken')
      })
  })

  it('should login and return a token', async () => {
    const hashedPassword = await User.hashPassword(mockSignupData.password)
    return User.create({
      userName: mockSignupData.name,
      userEmail: mockSignupData.email,
      password: hashedPassword
      })
      .then(user => {
        chai.request(app)
          .post('/api/users/login')
          .send({
            userEmail: mockSignupData.email,
            password: mockSignupData.password
          })
          .then(response => {
            console.log('checking')
            response.should.have.status(200)
            response.body.should.have.property('authToken')
            // token = response.body.authToken
          })
      })
  })

  // it('should access a protected end point', () => {
  //   chai.request(`http://localhost:${PORT}`)
  //     .get('/api/users/')
  //     .set('authorization', `Bearer ${token.authToken}`)
  //     .then(response => {
  //       response.should.have.status(200)
  //     })
  // })
})