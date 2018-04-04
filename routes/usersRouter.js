if (require.main === module) {
  require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user')
const { jwtStrategy } = require('../strategies')
const app = express()

mongoose.Promise = global.Promise

passport.use(jwtStrategy)

const jwtAuth = passport.authenticate('jwt', { session: false })

async function createNewUser(userData) {
  const newUser = await User.create(userData)

  const token = jwt.sign({ user: { _id: newUser._id } }, process.env.JWT_SECRET)
  const user = {
    jwt: token,
    userData: newUser
  }

  return user
}

router.post('/', jwtAuth, async (req, res) => {
  try {
    const newUser = await createNewUser(req.body)
    res.send(newUser)
  } catch (err) {
    console.error(err)
  }
})

async function getUser(userId) {
  return await User.findOne({ userId: userId })
}

router.get('/:userId', async (req, res) => {
  // can i just use mongo id instead of creating one with uuid?
  try {
    const user = await getUser(req.params.userId)
    res.send(user)
  } catch (err) {
    console.error(err)
  }
})

module.exports = {
  router
}
