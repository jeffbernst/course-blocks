const MOCK_COURSE_TILE_DATA = [
	{
		"courseId": 1,
		"courseTitle": "Learn to Program Apps on STEEM",
		"author": "Jeff B",
		"studentCount": 234,
		"themeColor": "purple",
		"tags": [
			"programming",
			"crypto"
		]
	}, {
		"courseId": 7,
		"courseTitle": "Learn Great Stuff About Cryptocurrencies",
		"author": "Some Other Person",
		"studentCount": 1123,
		"themeColor": "teal",
		"tags": [
			"crypto"
		]
	}, {
		"courseId": 5,
		"courseTitle": "MongoDB",
		"author": "Steve Stevenson",
		"studentCount": 500,
		"themeColor": "purple",
		"tags": [
			"programming"
		]
	}, {
		"courseId": 20,
		"courseTitle": "Learn CSS Grid",
		"author": "Gary Gridington",
		"studentCount": 4,
		"themeColor": "green",
		"tags": [
			"programming"
		]
	}, {
		"courseId": 17,
		"courseTitle": "JavaScript Fundamentals",
		"author": "Sally Student",
		"studentCount": 48,
		"themeColor": "orange",
		"tags": [
			"programming"
		]
	}, {
		"courseId": 55,
		"courseTitle": "Learn Some Really Neat Stuff!!",
		"author": "Me",
		"studentCount": 48,
		"themeColor": "pink",
		"tags": [
			"language"
		]
	}, {
		"courseId": 1,
		"courseTitle": "Learn to Program Apps on STEEM",
		"author": "Jeff B",
		"studentCount": 234,
		"themeColor": "yellow",
		"tags": [
			"programming",
			"crypto"
		]
	}, {
		"courseId": 7,
		"courseTitle": "Learn Great Stuff",
		"author": "Some Other Person",
		"studentCount": 1123,
		"themeColor": "green",
		"tags": [
			"language"
		]
	}, {
		"courseId": 20,
		"courseTitle": "Learn CSS Grid",
		"author": "Gary Gridington",
		"studentCount": 4,
		"themeColor": "blue",
		"tags": [
			"programming"
		]
	}
];

const MOCK_USER_DATA = {

};

function checkForJsonWebToken() {
	if (localStorage.getItem("JWT") !== undefined) showMemberScreen();
}

function showMemberScreen() {
	$('.welcome-message').hide();

}

function getCoursesForIndexPage() {
	return new Promise((resolve, reject) => {
		// api call will go here
		resolve(MOCK_COURSE_TILE_DATA);
	})
}

function createAndAppendCourseTileHtml() {
	$('.course-grid').html('');
	$('.clear-search-results').hide();
	getCoursesForIndexPage()
		.then(data => {
			data.forEach(courseInfo => {
				$('.course-grid').append(renderCourseTile(courseInfo));
			});
		})
}

function renderCourseTile(courseInfo) {
	return	`<div class="course-grid-tile ${courseInfo.themeColor}-tile">
						<div class="course-grid-info-container">
							<div class="course-grid-tile-title">${courseInfo.courseTitle}</div>
							<div class="course-grid-tile-author">by ${courseInfo.author}</div>
						</div>	
						<br>
						<div class="course-grid-enroll-container">
							<button type="submit" class="course-grid-enroll-button">Enroll &#x1F680;</button>&nbsp;&nbsp;
							<span class="course-grid-students-count">${courseInfo.studentCount} students</span>
						</div>
					</div>`
}

function watchFilters() {
	$('.explore-filter').click(event => {
		let filter = $(event.currentTarget).text().toLowerCase();

		$('.course-grid').html('');
		$('.explore-filters span').removeClass('explore-filter-active');
		$(event.currentTarget).addClass('explore-filter-active');

		getFilteredCourses(filter)
			.then(data => {
				data.forEach(courseInfo => {
					$('.course-grid').append(renderCourseTile(courseInfo));
				})
			})
	});
}

function watchExploreTitle() {
	$('.explore-title').click(event => {
		$('.explore-filters span').removeClass('explore-filter-active');
		createAndAppendCourseTileHtml();
	})
}

function getFilteredCourses(filter) {
	return new Promise((resolve, reject) => {
		// api call will go here
		resolve(mockFilterCourses(filter));
	})
}

function mockFilterCourses(filter) {
	return MOCK_COURSE_TILE_DATA.filter(course => {
		return course.tags.indexOf(filter) > -1;
	});
}

function watchSearch() {
	$('.search-form').submit(event => {
		event.preventDefault();

		$('.course-grid').html('');

		let searchTerm = $(event.currentTarget)
			.find('.search-input')
			.val()
			.trim();

		searchCourses(searchTerm)
			.then(data => {
				$('.clear-search-results').show();
				data.forEach(courseInfo => {
				$('.course-grid').append(renderCourseTile(courseInfo));
			})
		});
	});
}

function watchSearchClear() {
	$('.clear-search-results').click(event => {
		event.preventDefault();

		$('.search-input').val('');
		createAndAppendCourseTileHtml();
	})
}

function searchCourses(searchTerm) {
	return new Promise((resolve, reject) => {
		// api call will go here
		resolve(mockSearch(searchTerm));
	})
}

function mockSearch(searchTerm) {
	return MOCK_COURSE_TILE_DATA.filter(course => {
			return course.courseTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
	});
}

function watchSignUpButton() {
	$('.nav-signup-button').click(event => {
		$('.modal').show();
		$('.signup-modal-content').show();
	})
}

function watchLogInButton() {
	$('.nav-login-button').click(event => {
		$('.modal').show();
		$('.login-modal-content').show();
	})
}

function closeModal() {
	$('.modal, .close-modal').click(event => {
		$('.modal').hide();
		$('.signup-modal-content').hide();
		$('.login-modal-content').hide();
	})
}

function startApp() {
	checkForJsonWebToken();
	createAndAppendCourseTileHtml();
	watchSearch();
	watchSearchClear();
	watchSignUpButton();
	watchLogInButton();
	closeModal();
	watchFilters();
	watchExploreTitle();
}

$(startApp);