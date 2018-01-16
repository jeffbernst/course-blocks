'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

const TEST_DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/test';

chai.should();

chai.use(chaiHttp);

describe('index page', function () {

	before(function () {
		return runServer(TEST_DATABASE_URL);
	});

	after(function () {
		return closeServer();
	});

	it('should exist', function () {
		return chai.request(app)
			.get('/')
			.then(function (res) {
				res.should.have.status(200);
			});
	});
});
