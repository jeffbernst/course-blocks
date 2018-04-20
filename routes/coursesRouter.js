if (require.main === module) {
  require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { Course } = require('../models/course')
const { jwtStrategy } = require('../strategies')

mongoose.Promise = global.Promise

passport.use(jwtStrategy)

const jwtAuth = passport.authenticate('jwt', { session: false })

// get request for all courses for index

// get request for specific course

async function publishCourse(course) {
  await Course.findOne({ courseId: course.courseId }).remove()
  return await Course.create(course)
}

router.post('/', jwtAuth, async (req, res) => {
  try {
    const courseToPublish = {...req.body, courseAuthor: req.user.userName}
    const newCourse = await publishCourse(courseToPublish)
    res.send(newCourse)
  } catch (err) {
    console.error(err)
  }
})

router.get('/', async (req, res) => {
  const courses = await Course.find().limit(12)

  res.send(courses)
})

router.get('/:courseId', async (req, res) => {
  const course = await Course.findOne({courseId: req.params.courseId})

  res.send(course)
})

// enroll in course
router.post('/:courseId')

module.exports = {
  router,
  publishCourse
}
