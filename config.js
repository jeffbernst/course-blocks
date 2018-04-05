exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/test'
exports.PORT = process.env.PORT || 8080
exports.JWT_SECRET = process.env.JWT_SECRET
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'mongodb://localhost/test'
