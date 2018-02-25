const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
	{
		courseId: String,
		courseTitle: String,
		themeColor: String,
		tags: [String],
		courseSummary: String,
		lessons: [
			{
				lessonTitle: String,
				parts: [
					{
						partTitle: String,
						partContent: String
					}
				]
			}
		]
	}
);

const Course = mongoose.model('course', courseSchema);

const userSchema = new Schema(
	{
		userId: String,
		userName: String,
		gravatarHash: String,
		// should enrolledIn be linked from courses database?
		enrolledIn: [Course],
		drafts: [
			{
				courseId: 5,
				courseTitle: "This is a Really Great Course on Stuff",
				themeColor: 'purple',
				tags: ['language', 'crypto'],
				courseSummary: 'Here is my really great summary.',
				lessons: [
					{
						lessonTitle: 'A Great Lesson DRAFT!',
						parts: [
							{
								partTitle: 'Here is My part Title in this great draft',
								partContent: 'lorem lorem lorem'
							},
							{
								partTitle: 'Here is My Second part Title again in a draft :D',
								partContent: 'lorem again!'
							}
						]
					}
				]
			}
		]
	}
);

const User = mongoose.model('user', userSchema);

module.exports = { User, Course };

