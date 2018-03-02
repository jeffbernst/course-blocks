const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const {Course, User} = require('../models');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);

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
			completed: [[1, 2]],
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

const mockUserDataUpdated = {
	userName: 'Jeff',
	gravatarHash: '75ad827dc5ac6baa1df806dfe15b394e',
	enrolledIn: [
		{
			currentLesson: 5,
			currentPart: 3,
			completed: [[1, 2]],
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
			courseTitle: "My Great Course Was Just UPDATED!!!!!",
			themeColor: 'purple',
			tags: [],
			courseSummary: 'UPDATED!!',
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

async function tearDownDb() {
	console.warn('Deleting database');
	// return mongoose.connection.dropDatabase();
	await User.remove({});
	await Course.remove({});
}

// TEST INITIAL BUILD

describe('initial build', function () {

	before(function () {
		return runServer(TEST_DATABASE_URL, 63000);
	});

	after(function () {
		return closeServer();
	});

	afterEach(function () {
		tearDownDb();
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

	it('should create new draft', async function () {
		await User.create({...mockUserData, userId: 1});

		const res = await chai.request(app)
			.post(`/api/drafts/1`)
			.send(mockCourseData);

		res.should.have.status(200);
		res.body.should.containSubset(mockCourseData);

		const userInDb = await User.findOne(
			{'drafts.courseId': res.body.courseId}
		);

		// const draftInDb = await User.aggregate(
		// 	[
		// 		{ "$match": { "drafts.courseId": res.body.courseId } },
		// 		{ "$unwind": "$drafts" },
		// 		{ "$match": { "drafts.courseId": res.body.courseId } },
		// 	]
		// );

		// projections to return matched object, try aggregate

		const draftInDb = userInDb.drafts.find(draft => draft.courseId === res.body.courseId);

		draftInDb.should.containSubset(mockCourseData);
	});

	it('should create new user', async function () {
		const res = await chai.request(app)
			.post('/api/users')
			.send(mockUserData);

		res.should.have.status(200);
		res.body.userData.should.containSubset(mockUserData);

		const userInDb = await User.findOne(
			{userId: res.body.userData.userId}
		);
		userInDb.should.containSubset(mockUserData);

	});

	it('should get specific user', async function () {
		await User.create({...mockUserData, userId: 1});

		const res = await chai.request(app)
			.get(`/api/users/1`);

		res.should.have.status(200);
		res.body.should.containSubset(mockUserData);
	});

	it('should edit specified draft', async function () {
		await User.create({...mockUserData, userId: 1});

		const res = await chai.request(app)
			.put(`/api/drafts/1`)
			.send(mockUserDataUpdated);

		res.should.have.status(200);
		res.body.should.containSubset(mockUserDataUpdated);
		// i need to make sure i limit the possible changes to the drafts and nothing else
		// i need to confirm with the jwt that the user has access to do this
	});

	it('should publish draft', async function () {
		await User.create({...mockUserData, userId: 1});

		const res = await chai.request(app)
			.post('/api/courses/')
			.send(mockCourseData);
		// do i want to get the draft data from the user object?
		// or just accept in the body of the request?

		res.should.have.status(200);
		res.body.should.containSubset(mockCourseData);
	});
});
