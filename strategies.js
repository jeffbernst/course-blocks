const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { JWT_SECRET } = require('./config')

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

module.exports = { jwtStrategy }
