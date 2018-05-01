module.exports = function(wallaby) {
  return {
    files: [
      'server.js',
      'models.js',
      'strategies.js',
      '.env.test',
      '.env',
      'config.js',
      'public/**/*',
      'routes/**/*',
      'models/**/*',
      'test/mock-data.js'
    ],

    tests: ['test/test-*.js'],

    testFramework: 'mocha',

    env: {
      type: 'node',
      runner: 'node'
    },

    workers: {
      initial: 1,
      regular: 1,
      restart: true
    },

    debug: true
  }
}
