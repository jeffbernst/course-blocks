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
    const newCourse = await publishCourse(req.body)
    res.send(newCourse)
  } catch (err) {
    console.error(err)
  }
})

module.exports = {
  router,
  publishCourse
}
