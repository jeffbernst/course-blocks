const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
	{
		courseId: String,
		courseTitle: String,
		authorId: String,
		author: { type: Schema.Types.ObjectId, ref: "User" },
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
		enrolledIn: [
			{
				currentLesson: Number,
				currentPart: Number,
				completed: [[Number]],
				// should courseData be linked from courses database?
				courseData: courseSchema
			}
		],
		drafts: [courseSchema]
	}
);

const User = mongoose.model('user', userSchema);

module.exports = { User, Course };

