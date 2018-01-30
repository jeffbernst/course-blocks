const MOCK_COURSE_TILE_DATA = [
	{
		"courseId": 1,
		"courseTitle": "Learn to Program Apps on STEEM",
		"author": "Jeff B",
		"studentCount": 234
	}, {
		"courseId": 7,
		"courseTitle": "Learn Great Stuff",
		"author": "Some Other Person",
		"studentCount": 1123
	}, {
		"courseId": 5,
		"courseTitle": "MongoDB",
		"author": "Steve Stevenson",
		"studentCount": 500
	}, {
		"courseId": 20,
		"courseTitle": "Learn CSS Grid",
		"author": "Gary Gridington",
		"studentCount": 4
	}, {
		"courseId": 17,
		"courseTitle": "JavaScript Fundamentals",
		"author": "Sally Student",
		"studentCount": 48
	}
];

function getCourseTiles() {
	return new Promise((resolve, reject) => {
		// api call will go here
		resolve(MOCK_COURSE_TILE_DATA);
	})
}

function renderCourseTiles() {
	getCourseTiles()
		.then(data => {
			data.forEach(courseInfo => {
				console.log('appending');
				$('.course-grid').append(`
					<div class="course-grid-tile">
						<div class="course-grid-tile-title">${courseInfo.courseTitle}</div>
						<div class="course-grid-tile-author">${courseInfo.author}</div>
						<br>
						<div class="course-grid-enroll-container">
							<button type="submit" class="course-grid-enroll-button">Enroll &#x1F680;</button>&nbsp;&nbsp;
							<span class="course-grid-students-count">${courseInfo.studentCount} students</span>
						</div>
					</div>`)
			});
		})
}

$(renderCourseTiles);