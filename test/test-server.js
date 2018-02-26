const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const {Course} = require('../models');

require('dotenv').config({path: '.env.test'});

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test';

chai.should();

chai.use(chaiHttp);

// MOCK DATA

const mockCourseData = {
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
};

const mockUserData = {
	userName: 'Jeff',
	gravatarHash: '75ad827dc5ac6baa1df806dfe15b394e',
	enrolledIn: [
		{
			currentLesson: 5,
			currentPart: 3,
			completed: [[1,2]],
			// should courseData be linked from courses database?
			courseData: {
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
		}
	],
	drafts: [
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
	]
};

// TEST INITIAL BUILD

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

// TEST API ENDPOINTS

describe('api endpoints', function () {
	before(function () {
		return runServer(TEST_DATABASE_URL, 63000);
	});

	after(function () {
		return closeServer();
	});

	it('should post new draft to database', async function () {
		const res = await chai.request(app)
			.post('/api/drafts')
			.send(mockCourseData);

		res.should.have.status(200);
		res.should.deep.equal(mockCourseData);

		const courseInDb = await Course.findOne({courseId: res.courseId});
		courseInDb.should.deep.equal(mockCourseData);
	});

	it('should create new user', async function () {
		const res = await chai.request(app)
			.post('/api/drafts')
			.send(mockUserData);

		res.should.have.status(200);
		res.should.deep.equal(mockUserData);
	});
});
