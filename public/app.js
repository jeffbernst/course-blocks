let MOCK_COURSE = {
	// do i need this first part?
	course: {
		"courseId": "1234",
		"title": "This is a Great Course",
		"authorName": "jeffbernst",
		"authorId": "abcd",
		"publishedAt": 1470011976609,
		"lessons": [
			{
				// should i number the lessons?
				"lessonNumber": 1,
				"lessonTitle": "This is a Great Lesson 1",
				"chapters": [
					{
						"chapterTitle": "This is a great chapter!",
						"chapterContent": "Here's some really, really great content. Here's some really, really great content. Here's some really, really great content. Here's some really, really great content."
					}
				]
			},
			{
				"lessonNumber": 2,
				"lessonTitle": "This is an Even Better Lesson 2",
				"chapters": [
					{
						"chapterTitle": "This is an even better chapter!",
						"chapterContent": "Here's even better content!!! Here's even better content!!! Here's even better content!!! Here's even better content!!! Here's even better content!!! Here's even better content!!! Here's even better content!!!"
					}
				]
			}
		]
	}
};

function getCourse(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_COURSE)}, 100);
}

function displayCourse(data) {
	$('body').append(marked(data));
}

function getAndDisplayCourse() {
	getCourse(displayCourse);
}

$(function() {
	getAndDisplayCourse();
});