async function loadCreatePage() {
	checkForJsonWebToken();

	const courseData = await getCourse(courseId);
	const userData = await getUserData(courseId);

	$('.expand-sidebar-desktop').hide().css('background-color', `var(--${courseData.themeColor})`);
	$('.expand-sidebar-mobile').hide().css('background-color', `var(--${courseData.themeColor})`);

	$('.sidebar-button-container-wrapper').show();

	$('.previous-next').hide();
	$('.edit-part').hide();
	$('.mark-as-completed-container').hide();

	$('.pick-to-edit').show();

	closeAndOpenSidebar();
	loadCreateSideBar(courseData, userData);
	moveToClickedLesson(courseData);
	nextButton(courseData);
	previousButton(courseData);
	createDropdown();
	changeCourseColor();
}

function loadCreateSideBar(courseData, userData) {
	$(`.sidebar-create-color-picker-tile.${courseData.themeColor}-tile`).addClass('sidebar-create-color-picker-tile-selected');
	$('.sidebar-course-info').addClass(`${courseData.themeColor}-tile`);
	$('.sidebar-course-title').html(courseData.courseTitle);

	let sidebarCourseInfoHeight = $('.sidebar-course-info').height();
	$('.sidebar-table-of-contents')
		.css("top", () => sidebarCourseInfoHeight + 10)
		.html(createTableOfContents(courseData));
}

function changeCourseColor() {
	$('.sidebar-create-color-picker-tile').click(event => {
		// check if it's the same as the one in the database
		let clickedColor = $(event.currentTarget).data('color');

		// if not, update database and change on screen
		$('.sidebar-create-color-picker-tile').removeClass('sidebar-create-color-picker-tile-selected');
		$(event.currentTarget).addClass('sidebar-create-color-picker-tile-selected');
		$('.sidebar-course-info').attr('class', 'sidebar-course-info').addClass(`${clickedColor}-tile`);

		// update mobile and desktop collapse buttons
	})
}

$(loadCreatePage);


// function createTableOfContents(courseData) {
// 	let tableOfContentsString = '';
// 	let lessons = courseData.lessons;
//
// 	for (let i = 0; i < lessons.length; i++) {
// 		tableOfContentsString += `
// 			<div class="sidebar-lesson">
// 			<div class="sidebar-lesson-number" data-lesson-number="${i}">Lesson ${i+1}</div>
// 			<div class="sidebar-lesson-title">${lessons[i].lessonTitle}</div>
// 			<div class="sidebar-part-group">
// 		`;
// 		for (let j = 0; j < lessons[i].parts.length; j++) {
// 			tableOfContentsString += `
// 				<div class="sidebar-part" data-part-number="${j}">
// 					<span class="sidebar-part-number">- ${j+1}: </span>
// 					${lessons[i].parts[j].partTitle}
// 				</div>
// 			`
// 		}
// 		tableOfContentsString += `</div></div>`
// 	}
// 	return tableOfContentsString;
// }

// function loadCurrentLocation(courseData, userData) {
// 	const userCourseData = userData.enrolledIn.find(course => course.courseId == courseId);
// 	let currentLesson = userCourseData.currentLesson;
// 	let currentPart = userCourseData.currentPart;
// 	let currentPartData = courseData.lessons[currentLesson].parts[currentPart];
//
// 	if (
// 		courseData.lessons[currentLesson].parts[currentPart + 1] === undefined &&
// 		courseData.lessons[currentLesson + 1] === undefined
// 	) {
// 		$('.next-container').hide();
// 	}
//
// 	if (
// 		courseData.lessons[currentLesson].parts[currentPart - 1] === undefined &&
// 		courseData.lessons[currentLesson - 1] === undefined
// 	) {
// 		$('.previous-container').hide();
// 		$('.previous-next').css('justify-content', 'flex-end')
// 	} else {
// 		$('.previous-container').show();
// 	}
//
// 	updateLessonLocationData(currentLesson, currentPart);
//
// 	$('.part-title').html(currentPartData.partTitle);
// 	$('.part-content').html(marked(currentPartData.partContent));
// }

// function calculatePercentComplete(courseData, userData) {
// 	let courseSize = courseData.lessons.reduce((acc, cur) => acc + cur.parts.length, 0);
// 	let completedByUser = userData.completed.reduce((acc, cur) => acc + cur.length, 0);
//
// 	return Math.floor((completedByUser / courseSize) * 100);
// }

// function closeAndOpenSidebar() {
// 	$('.close-sidebar-button').click(event => {
// 		$('.sidebar').hide();
// 		$('.close-sidebar-button').hide();
// 		$('.expand-sidebar-desktop').show();
// 		$('.expand-sidebar-mobile').show();
// 	});
//
// 	$('.expand-sidebar-desktop, .expand-sidebar-mobile').click(event => {
// 		$('.sidebar').show();
// 		$('.close-sidebar-button').show();
// 		$('.expand-sidebar-desktop').hide();
// 		$('.expand-sidebar-mobile').hide();
// 	})
// }

// function moveToClickedLesson(courseData) {
// 	$('.sidebar-table-of-contents').on('click', '.sidebar-part', event => {
// 		let clickedPart = $(event.currentTarget).data('partNumber');
//
// 		let clickedLesson =
// 			$(event.currentTarget)
// 				.parent()
// 				.prevAll('.sidebar-lesson-number')
// 				.data('lessonNumber');
//
// 		let clickedPartData = courseData.lessons[clickedLesson].parts[clickedPart];
//
// 		showOrHideNextAndPreviousButtons(courseData, clickedLesson, clickedPart)
// 		updateLessonLocationData(clickedLesson, clickedPart);
//
// 		$('.part-title').html(clickedPartData.partTitle);
// 		$('.part-content').html(marked(clickedPartData.partContent));
// 	});
//
// 	$('.sidebar-table-of-contents').on('click', '.sidebar-lesson-title', event => {
// 		let clickedLesson = $(event.currentTarget).prev().data('lessonNumber');
//
// 		let clickedPartData = courseData.lessons[clickedLesson].parts[0];
//
// 		showOrHideNextAndPreviousButtons(courseData, clickedLesson, 0)
// 		updateLessonLocationData(clickedLesson, 0);
//
// 		$('.part-title').html(clickedPartData.partTitle);
// 		$('.part-content').html(marked(clickedPartData.partContent));v
// 	})
// }

// function nextButton(courseData) {
// 	$('.next-button').click(event => {
// 		let currentLesson = Number($('.current-lesson').data('lesson'));
// 		let currentPart = Number($('.current-lesson').data('part'));
//
// 		let nextPart = currentPart + 1 >= courseData.lessons[currentLesson].parts.length ? 0 : currentPart + 1;
// 		let nextLesson = nextPart === 0 ? currentLesson + 1 : currentLesson;
//
// 		let nextPartData = courseData.lessons[nextLesson].parts[nextPart];
//
// 		showOrHideNextAndPreviousButtons(courseData, nextLesson, nextPart);
// 		updateLessonLocationData(nextLesson, nextPart);
//
// 		$('.part-title').html(nextPartData.partTitle);
// 		$('.part-content').html(marked(nextPartData.partContent));
// 	})
// }
//
// function previousButton(courseData) {
// 	$('.previous-button').click(event => {
// 		let currentLesson = Number($('.current-lesson').data('lesson'));
// 		let currentPart = Number($('.current-lesson').data('part'));
//
// 		let previousPart = currentPart === 0 ? courseData.lessons[currentLesson - 1].parts.length - 1 : currentPart - 1;
// 		let previousLesson = currentPart === 0 ? currentLesson - 1 : currentLesson;
//
// 		let nextPartData = courseData.lessons[previousLesson].parts[previousPart];
//
// 		showOrHideNextAndPreviousButtons(courseData, previousLesson, previousPart);
// 		updateLessonLocationData(previousLesson, previousPart);
//
// 		$('.part-title').html(nextPartData.partTitle);
// 		$('.part-content').html(marked(nextPartData.partContent));
// 	})
// }
//
// function updateLessonLocationData(lesson, part) {
// 	$('.current-lesson')
// 		.html(`Lesson ${lesson + 1} / Part ${part + 1}`)
// 		.data({lesson: `${lesson}`, part: `${part}`});
//
// 	highlightCurrentPart(lesson, part);
// }
//
// function highlightCurrentPart(lesson, part) {
//
// 	// remove highlight from all parts
// 	$('.sidebar-part').removeClass('sidebar-part-highlighted');
//
// 	$('.sidebar-table-of-contents')
// 		.find(`.sidebar-lesson-number[data-lesson-number=${lesson}]`)
// 		.parent()
// 		.find(`.sidebar-part[data-part-number=${part}]`)
// 		.addClass('sidebar-part-highlighted');
// }
//
// function showOrHideNextAndPreviousButtons(courseData, lesson, part) {
// 	$('.previous-next').css('justify-content', 'space-between');
//
// 	if (
// 		courseData.lessons[lesson].parts[part + 1] === undefined &&
// 		courseData.lessons[lesson + 1] === undefined
// 	) {
// 		$('.next-container').hide();
// 		$('.previous-next').css('justify-content', 'flex-start')
// 	} else {
// 		$('.next-container').show();
// 	}
//
// 	if (
// 		courseData.lessons[lesson].parts[part - 1] === undefined &&
// 		courseData.lessons[lesson - 1] === undefined
// 	) {
// 		$('.previous-container').hide();
// 		$('.previous-next').css('justify-content', 'flex-end')
// 	} else {
// 		$('.previous-container').show();
// 	}
// }

