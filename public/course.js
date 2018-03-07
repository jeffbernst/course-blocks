const url = window.location.href;
const courseId = (typeof url.match(/\/([^/]+)$/)[1] === 'undefined') ? 'not in url' : url.match(/\/([^/]+)$/)[1];

function checkForJsonWebTokenOnCourse() {
	if (localStorage.getItem('JWT') !== null) {
		showMemberNav();
		// load standard sidebar and default to course summary
	} else {
		$('.sign-in-log-in').show();
		$('.welcome-message').show();
		$('.course-progress-bar').hide();
		$('.sidebar-button-container-wrapper').show();
	}
}

async function loadPage() {
	checkForJsonWebTokenOnCourse();

	const courseData = await getCourse(courseId);
	const userData = await getUserData(courseId);

	$('.expand-sidebar-desktop').hide().css('background-color', `var(--${courseData.themeColor})`);
	$('.expand-sidebar-mobile').hide().css('background-color', `var(--${courseData.themeColor})`);

	closeAndOpenSidebar();

	loadSideBar(courseData, userData);
	loadCurrentLocation(courseData, userData);
	moveToClickedLesson(courseData);
	nextButton(courseData);
	previousButton(courseData);
	createDropdown();
	watchSignUpButton();
	watchSignUpForm();
	watchLogInButton();
	closeModal();
}

function loadSideBar(courseData, userData) {
	const userCourseData = userData.enrolledIn.find(course => course.courseId == courseId);
	let percentComplete = calculatePercentComplete(courseData, userCourseData);

	$('.sidebar-course-info').addClass(`${courseData.themeColor}-tile`);
	$('.sidebar-course-title').html(courseData.courseTitle);
	$('.sidebar-course-author').html(`by ${courseData.courseAuthor}`);
	$('.course-progress-bar-shader').css({
		'width': `${percentComplete}%`,
		'background-color': `var(--dark-${courseData.themeColor})`
	});
	$('.percent-complete').html(`${percentComplete}% complete`);

	let sidebarCourseInfoHeight = $('.sidebar-course-info').height();
	$('.sidebar-table-of-contents')
		.css("top", () => sidebarCourseInfoHeight + 10)
		.html(createTableOfContents(courseData));
}

function loadCurrentLocation(courseData, userData) {
	const userCourseData = userData.enrolledIn.find(course => course.courseId == courseId);
	let currentLesson = userCourseData.currentLesson || 0;
	let currentPart = userCourseData.currentLesson || 0;
	let currentPartData = courseData.lessons[currentLesson].parts[currentPart];

	if (
		courseData.lessons[currentLesson].parts[currentPart + 1] === undefined &&
		courseData.lessons[currentLesson + 1] === undefined
	) {
		$('.next-container').hide();
	}

	if (
		courseData.lessons[currentLesson].parts[currentPart - 1] === undefined &&
		courseData.lessons[currentLesson - 1] === undefined
	) {
		$('.previous-container').hide();
		$('.previous-next').css('justify-content', 'flex-end')
	} else {
		$('.previous-container').show();
	}

	updateLessonLocationData(currentLesson, currentPart);

	$('.part-title').html(currentPartData.partTitle);
	$('.part-content').html(marked(currentPartData.partContent));
}

function calculatePercentComplete(courseData, userData) {
	let courseSize = courseData.lessons.reduce((acc, cur) => acc + cur.parts.length, 0);
	let completedByUser = (typeof userData.completed === 'undefined') ? 0 : userData.completed.reduce((acc, cur) => acc + cur.length, 0);

	return Math.floor((completedByUser / courseSize) * 100);
}

$(loadPage);

