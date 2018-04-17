const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Strategy: LocalStrategy } = require('passport-local')
const { JWT_SECRET } = require('./config')
const { User } = require('./models/user')

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user)
  }
)

const localStrategy = new LocalStrategy(
  { usernameField: 'userEmail', passwordField: 'password' },
  (userEmail, password, callback) => {
    let user

    User.findOne({ userEmail })
      .then(_user => {
        user = _user
        if (!user)
          return Promise.reject({
            reason: 'Login error.',
            message: 'User email incorrect.'
          })
        return user.validatePassword(password)
      })
      .then(isValid => {
        if (!isValid)
          return Promise.reject({
            reason: 'Login error.',
            message: 'Incorrect password.'
          })
        return callback(null, user)
      })
      .catch(error => {
        if (error.reason === 'Login error.') {
          return callback(null, false, { message: error.message })
        } else {
          return callback(error, false)
        }
      })
  }
)

module.exports = { jwtStrategy, localStrategy }
