const express = require('express');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const bodyparser = require('body-parser');
const {Course, User} = require('./models');
const jwt = require('jsonwebtoken');
const app = express();

mongoose.Promise = global.Promise;

DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/test';
PORT = process.env.PORT || 8080;

app.use(express.static('public', {extensions: ['html', 'htm']}));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyparser.json());

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

app.post('/api/drafts/:userId', async (req, res) => {
	try {
		// don't have userId in URL, get it from JWT

		// need to send userId with update
		// make sure user has access to do this
		// req.user should have jwt info
		const newDraft = {...req.body, courseId: uuidv4()};

		const updatedUser = await User.findOneAndUpdate(
			{userId: req.params.userId},
			{$push: {drafts: newDraft}}
		);
		res.send(newDraft);

	} catch (err) {
		console.error(err);
	}
});

app.put('/api/drafts/:userId', async (req, res) => {
	try {
		const updatedUser = await User.updateOne(
			{userId: req.params.userId},
			{...req.body}
		);
		res.send(updatedUser);

	} catch (err) {
		console.error(err);
	}
});

// ~~~~~~ USER API ~~~~~~

app.post('/api/users', async (req, res) => {
	try {
		const newUser = await User.create({...req.body, userId: uuidv4()});

		// where do i handle password checks?

		const token = jwt.sign(
			{userId: newUser.userId},
			process.env.SECRET_CODE
		);
		const user = {
			jwt: token,
			userData: newUser
		};

		res.send(user);

	} catch (err) {
		console.error(err);
	}
});

app.get('/api/users/:userId', async (req, res) => {
	// can i just use mongo id instead of creating one with uuid?
	try {
		const user = await User.findOne({userId: req.params.userId});
		res.send(user);

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
	app.listen(process.env.PORT || 8080, function () {
		console.info(`App listening on ${this.address().port}`);
	});
}

module.exports = {runServer, app, closeServer};