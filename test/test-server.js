const chai = require('chai');
const chaiHttp = require('chai-http');
const {
	app,
	runServer,
	closeServer,
	createNewDraftAndUpdateUser,
	updateDraftInUserObject,
	createNewUser,
	getUser,
	publishCourse} = require('../server');
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

const mockCourseDataUpdated = {
	courseTitle: "My Great Course UPDATED!!!",
	themeColor: 'purple',
	tags: [],
	courseSummary: '>.<',
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

		const newDraft =
			await createNewDraftAndUpdateUser(mockCourseData, 1);

		newDraft.should.containSubset(mockCourseData);

		const userInDb = await User.findOne(
			{'drafts.courseId': newDraft.courseId}
		);

		const draftInDb = userInDb.drafts.find(
			draft => draft.courseId === newDraft.courseId);

		draftInDb.should.containSubset(mockCourseData);
	});

	it('should create new user', async function () {
		const newUser = await createNewUser(mockUserData);

		newUser.userData.should.containSubset(mockUserData);

		const userInDb = await User.findOne(
			{userId: newUser.userData.userId}
		);
		userInDb.should.containSubset(mockUserData);

	});

	it('should get specific user', async function () {
		await User.create({...mockUserData, userId: 1});

		const user = await getUser(1);

		user.should.containSubset(mockUserData);
	});

	it('should edit specified draft', async function () {
		await User.create(
				{
					...mockUserData,
					userId: 1,
					drafts: [
						{
							courseTitle: "My Great Course",
							courseId: 1,
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
				}
			);

		const draft = await updateDraftInUserObject({
				...mockCourseDataUpdated,
				courseId: 1
			}, 1);

		draft.should.containSubset(mockCourseDataUpdated);

		const userInDb = await User.findOne({userId: 1});
		userInDb.should.containSubset(mockUserData);
	});

	it('should publish draft', async function () {
		await User.create({...mockUserData, userId: 1});

		const newCourse = await publishCourse(mockCourseData);

		newCourse.should.containSubset(mockCourseData);

		const courseInDb = await Course.findOne(
			{courseId: newCourse.courseId}
		);
		courseInDb.should.containSubset(mockCourseData);
	});
});
