if (require.main === module) {
	require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const bodyparser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {Course, User} = require('./models');
const {jwtStrategy} = require('./strategies');
const app = express();

mongoose.Promise = global.Promise;

DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/test';
PORT = process.env.PORT || 8080;

app.use(express.static('public', {extensions: ['html', 'htm']}));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyparser.json());

passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

// ~~~~~~ http requests ~~~~~~

app.get('/course/:courseId', (req, res) => {
	const options = {
		root: __dirname + '/public/'
	};

	res.sendFile('course.html', options);
});

app.get('/create/:courseId', (req, res) => {
	const options = {
		root: __dirname + '/public/'
	};

	res.sendFile('create.html', options);
});

// ~~~~~~ DRAFTS API ~~~~~~

// create function to make new draft and update user
async function createNewDraftAndUpdateUser(draft, userId) {
	const newDraft = {...draft, courseId: uuidv4()};

	const updatedUser = await User.findOneAndUpdate(
		{userId},
		{$push: {drafts: newDraft}}
	);

	return newDraft;
}

app.post('/api/drafts', jwtAuth, async (req, res) => {
	try {
		// don't have userId in URL, get it from JWT

		// need to send userId with update
		// make sure user has access to do this
		// req.user should have jwt info
		const newDraft = await createNewDraftAndUpdateUser(req.body, req.user._id);
		res.send(newDraft);

	} catch (err) {
		console.error(err);
	}
});

async function updateDraftInUserObject(updatedDraft, userId) {
	const userToUpdate = await User.findOne(
		{userId: userId}
	);

	const draftToUpdate = userToUpdate.drafts.find(
		draft => draft.courseId === updatedDraft.courseId
	);

	if (draftToUpdate) {
		draftToUpdate.remove();
		userToUpdate.drafts.push(updatedDraft);
	}

	await userToUpdate.save();

	return updatedDraft;
}

app.put('/api/drafts', jwtAuth, async (req, res) => {
	try {
		await updateDraftInUserObject(req.body, req.user._id);
		res.send(req.body);

	} catch (err) {
		console.error(err);
	}
});

// ~~~~~~ USER API ~~~~~~

async function createNewUser(userData) {
	const newUser = await User.create(userData);

	const token = jwt.sign(
		{user: {_id: newUser._id}},
		process.env.JWT_SECRET
	);
	const user = {
		jwt: token,
		userData: newUser
	};

	return user;
}

app.post('/api/users', jwtAuth, async (req, res) => {
	try {
		const newUser = await createNewUser(req.body);
		res.send(newUser);

	} catch (err) {
		console.error(err);
	}
});

async function getUser(userId) {
	return await User.findOne({userId: userId});
}

app.get('/api/users/:userId', async (req, res) => {
	// can i just use mongo id instead of creating one with uuid?
	try {
		const user = await getUser(req.params.userId);
		res.send(user);

	} catch (err) {
		console.error(err);
	}
});

// ~~~~~~ COURSES API ~~~~~~

async function publishCourse(course) {
	await Course.findOne({courseId: course.courseId}).remove();
	return await Course.create(course);
}

app.post('/api/courses', jwtAuth, async (req, res) => {
	try {
		const newCourse = await publishCourse(req.body);
		res.send(newCourse);

	} catch (err) {
		console.error(err);
	}
});

// ~~~~~~ start and stop server ~~~~~~

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

if (require.main === module) {
	runServer();
}

module.exports = {
	runServer,
	app,
	closeServer,
	createNewDraftAndUpdateUser,
	updateDraftInUserObject,
	createNewUser,
	getUser,
	publishCourse
};