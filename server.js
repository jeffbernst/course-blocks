const express = require('express');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const bodyparser = require('body-parser');
const {Course} = require('./models');

const app = express();

mongoose.Promise = global.Promise;


DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/test';
PORT = process.env.PORT || 8080;

app.use(express.static('public', {extensions: ['html', 'htm']}));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyparser.json());

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

app.post('api/drafts', async (req, res) => {
	try  {
		// grab user object
		// update user object
		// save and send updated draft
		const newDraft = await Course.create({...req.body, courseId: uuidv4});

	} catch (err) {
		console.error(err);
	}
});

app.post('api/users', async (req, res) => {
	try {

	} catch(err) {
		console.error(err);
	}
});

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