const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();

DATABASE_URL = process.env.DATABASE_URL || 'http://localhost:8080/';
PORT = process.env.PORT || 8080;

app.use(express.static('public'));

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
	app.listen(process.env.PORT || 8080, function () {
		console.info(`App listening on ${this.address().port}`);
	});
}

module.exports = {runServer, app, closeServer};

var teststuff = ""