const chai = require('chai')
const chaiHttp = require('chai-http')
const {app, runServer, closeServer} = require('../server')
const {Course} = require('../models/course')
const {User} = require('../models/user')
const {TEST_DATABASE_URL} = require('../config')
const {mockSignupData, mockCourseData, mockCourseDataUpdated, mockUserData} = require('./mock-data')

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

  after(async () => {
    await tearDownDb()
    return closeServer()
  })

  // ~~~~~~ USER TESTS ~~~~~~

  let token

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

  it('should get existing user', async () => {
    return chai.request(app)
      .get('/api/users/')
      .set('authorization', `Bearer ${token}`)
      .then(response => {
        response.should.have.status(200)
      })
  })

  it('should create new draft', async () => {
    return chai.request(app)
      .post('/api/drafts/')
      .set('authorization', `Bearer ${token}`)
      .send(mockCourseData)
      .then(response => {
        response.should.have.status(200)
        // response.body.should.have.property('authToken')
      })
  })

  // ~~~~~~ DRAFT TESTS ~~~~~~

  let draftId

  it('should create new draft', () => {
    return chai.request(app)
      .post('/api/drafts/')
      .set('authorization', `Bearer ${token}`)
      .send(mockCourseData)
      .then(response => {
        response.should.have.status(200)
        response.body.courseTitle.should.equal(mockCourseData.courseTitle)
        response.body.themeColor.should.equal(mockCourseData.themeColor)
        response.body.should.have.property('courseId')

        draftId = response.body.courseId
      })
  })

  it('should update an existing draft', () => {
    return chai.request(app)
      .put('/api/drafts')
      .set('authorization', `Bearer ${token}`)
      .send({...mockCourseDataUpdated, courseId: draftId})
      .then(response => {
        response.should.have.status(200)
        response.body.courseTitle.should.equal(mockCourseDataUpdated.courseTitle)
      })
  })

  // ~~~~~~ COURSE TESTS ~~~~~~

  it('should publish a course', () => {
    return chai.request(app)
      .post('/api/courses')
      .set('authorization', `Bearer ${token}`)
      .send({...mockCourseDataUpdated, courseId: draftId})
      .then(response => {
        response.should.have.status(200)
        response.body.courseId.should.equal(draftId)
        response.body.courseTitle.should.equal(mockCourseDataUpdated.courseTitle)
      })
  })

  it('should get 12 courses for index page', () => {
    return chai.request(app)
      .get('/api/courses')
      .then(response => {
        response.should.have.status(200)
      })
  })

  it('should get course from courseId', () => {
    return chai.request(app)
      .get(`/api/courses/${draftId}`)
      .then(response => {
        response.should.have.status(200)
        response.body.courseId.should.equal(draftId)
        response.body.courseTitle.should.equal(mockCourseDataUpdated.courseTitle)
      })
  })

  it('should search for courses', () => {
    return chai.request(app)
      .get('/api/courses/search/course')
      .then(response => {
        response.should.have.status(200)
        response.body[0].courseTitle.should.equal(mockCourseDataUpdated.courseTitle)
      })
  })

  it('should enroll in a course', () => {
    return chai.request(app)
      .post(`/api/courses/${draftId}`)
      .set('authorization', `Bearer ${token}`)
      .then(response => {
        response.should.have.status(200)
        response.body.enrolledIn[0].courseId.should.equal(draftId)
      })
  })

  it('should mark part of course complete', () => {
    return chai.request(app)
      .put(`/api/courses/${draftId}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        ...mockUserData,
        enrolledIn: {
          courseId: draftId,
          completed: [[0]]
        }
      })
      .then(response => {
        response.should.have.status(200)
        // completed parts are tracked in multidimensional arrays
        // so completing part one of lessone results in completed being [[0]]
        response.body.enrolledIn[0].completed[0][0].should.equal(0)
      })
  })
})