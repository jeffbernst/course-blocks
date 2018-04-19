if (require.main === module) {
  require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const {User} = require('../models/user')
const {Course} = require('../models/course')
const {jwtStrategy} = require('../strategies')
// const app = express()

mongoose.Promise = global.Promise

passport.use(jwtStrategy)

const jwtAuth = passport.authenticate('jwt', {session: false})

async function createNewDraftAndUpdateUser (draft, userId) {
  const newDraft = {...draft, courseId: uuidv4()}

  const user = await User.findByIdAndUpdate(
    userId,
    {$push: {drafts: newDraft}},
    {new: true}
  )

  return {
    user,
    newDraft
  }
}

router.post('/', jwtAuth, async (req, res) => {
  try {
    // don't have userId in URL, get it from JWT

    // need to send userId with update
    // make sure user has access to do this
    // req.user should have jwt info
    const newDraft = await createNewDraftAndUpdateUser(req.body, req.user.id)
    res.send(newDraft)
  } catch (err) {
    console.error(err)
  }
})

async function updateDraftInUserObject (updatedDraft, userId) {
  const userToUpdate = await User.findOne({userId: userId})

  const draftToUpdate = userToUpdate.drafts.find(
    draft => draft.courseId === updatedDraft.courseId
  )

  if (draftToUpdate) {
    draftToUpdate.remove()
    userToUpdate.drafts.push(updatedDraft)
  }

  await userToUpdate.save()

  return updatedDraft
}

router.put('/', jwtAuth, async (req, res) => {
  try {
    await updateDraftInUserObject(req.body, req.user.id)
    res.send(req.body)
  } catch (err) {
    console.error(err)
  }
})


router.get('/:courseId', jwtAuth, async (req, res) => {
  const user = User.findById(req.user.id)
  console.log('user:', user)

  const draft = user.drafts.find(draft => {
    return draft.courseId === req.params.courseId
  })

  res.send(draft)
})

module.exports = {
  router,
  createNewDraftAndUpdateUser,
  updateDraftInUserObject
}
