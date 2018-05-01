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
const {mockSignupData, mockCourseData, mockCourseDataUpdated} = require('./mock-data')

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

  let token

  // these two tests just used to set up user and authentication

  it('should sign up a user for drafts', () => {
    return chai.request(app)
      .post('/api/users/')
      .send(mockSignupData)
      .then(response => {
        response.should.have.status(201)
        response.body.should.have.property('authToken')
      })
  })

  it('should login and return a token for drafts', async () => {
    const hashedPassword = await User.hashPassword(mockSignupData.password)
    await User.create({
      userName: mockSignupData.name,
      userEmail: mockSignupData.email,
      password: hashedPassword
    })

    return chai.request(app)
      .post('/api/users/login')
      .send({
        userEmail: mockSignupData.email,
        password: mockSignupData.password
      })
      .then(response => {
        response.should.have.status(200)
        response.body.should.have.property('authToken')

        token = response.body.authToken
      })
  })

  // draft tests below here

  it('should create new draft', () => {
    return chai.request(app)
      .post('/api/drafts/')
      .set('authorization', `Bearer ${token}`)
      .send(mockCourseData)
      .then(response => {
        response.should.have.status(200)
      })
  })

  it('should update an existing draft', () => {
    return chai.request(app)
      .put('/api/drafts')
      .set('authorization', `Bearer ${token}`)
      .send(mockCourseDataUpdated)
      .then(response => {
        response.should.have.status(200)
      })
  })
})
