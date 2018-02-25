const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const {Course} = require('../models');

require('dotenv').config({path: '.env.test'});

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test';

chai.should();

chai.use(chaiHttp);

describe('initial build', function () {

	before(function () {
		return runServer(TEST_DATABASE_URL, 63000);
	});

	after(function () {
		return closeServer();
	});

	describe('index page', function () {
		it('should exist', function () {
			return chai.request(app)
				.get('/')
				.then(function (res) {
					res.should.have.status(200);
				});
		});
	});

	describe('create page', function () {
		it('should exist', function () {
			return chai.request(app)
				.get('/create')
				.then(function (res) {
					res.should.have.status(200);
				});
		});
	});

});

describe('api endpoints', function () {
	before(function () {
		return runServer(TEST_DATABASE_URL, 63000);
	});

	after(function () {
		return closeServer();
	});

	it('should post to database', async function () {
		const res = await chai.request(app)
			.post('/api/drafts')
			.send(
				{
					courseTitle: "My Great Course",
					themeColor: 'purple',
					tags: [],
					courseSummary: 'My great summary.',
					lessons: [
						{
							lessonTitle: 'My Great Lesson',
							parts: [
								{
									partTitle: 'My Great Part',
									partContent: 'Text goes here.'
								}
							]
						}
					]
				}
			);

		res.should.have.status(200);
		res.should.deep.equal(
			{
				courseTitle: "My Great Course",
				themeColor: 'purple',
				tags: [],
				courseSummary: 'My great summary.',
				lessons: [
					{
						lessonTitle: 'My Great Lesson',
						parts: [
							{
								partTitle: 'My Great Part',
								partContent: 'Text goes here.'
							}
						]
					}
				]
			}
		);

		const courseInDb = await Course.findOne({courseId: res.courseId});
		courseInDb.should.deep.equal(
			{
				courseTitle: "My Great Course",
				themeColor: 'purple',
				tags: [],
				courseSummary: 'My great summary.',
				lessons: [
					{
						lessonTitle: 'My Great Lesson',
						parts: [
							{
								partTitle: 'My Great Part',
								partContent: 'Text goes here.'
							}
						]
					}
				]
			}
		);
	});
});
