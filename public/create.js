const url = window.location.href;
const draftId = (typeof url.match(/\/([^/]+)$/)[1] === 'undefined') ? 'not in url' : url.match(/\/([^/]+)$/)[1];

async function loadCreatePage() {
	checkForJsonWebToken();

	// const courseData = await getCourse(draftId);
	const userData = await getUserData();
	const draftData = userData.drafts.find(draft => draft.courseId === draftId);

	$('.expand-sidebar-desktop').hide().css('background-color', `var(--${draftData.themeColor})`);
	$('.expand-sidebar-mobile').hide().css('background-color', `var(--${draftData.themeColor})`);

	$('.sidebar-button-container-wrapper').show();

	$('.previous-next').hide();
	$('.edit-part').hide();
	$('.mark-as-completed-container').hide();

	$('.pick-to-edit').show();

	closeAndOpenSidebar();
	loadCreateSideBar(draftData, userData);
	moveToClickedLesson(draftData);
	nextButton(draftData);
	previousButton(draftData);
	createDropdown();
	changeCourseColor();
	saveDraft(draftData);
}

function loadCreateSideBar(draftData, userData) {
	$(`.sidebar-create-color-picker-tile.${draftData.themeColor}-tile`).addClass('sidebar-create-color-picker-tile-selected');
	$('.sidebar-course-info').addClass(`${draftData.themeColor}-tile`);
	$('.sidebar-course-title').html(draftData.courseTitle);

	let sidebarCourseInfoHeight = $('.sidebar-course-info').height();
	$('.sidebar-table-of-contents')
		.css("top", () => sidebarCourseInfoHeight + 10)
		.html(createTableOfContents(draftData));
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

function saveDraft(draftData) {
	$('.edit-part').submit(async event => {
		event.preventDefault();
		const partTitle = $(event.currentTarget).find('.part-title').val();
		const partContent = $(event.currentTarget).find('.part-content').val();

		const currentLesson = Number($('.current-lesson').data('lesson'));
		const currentPart = Number($('.current-lesson').data('part'));

		// api call here
		let updateMessage = await updateDatabase(draftData, partTitle, partContent, currentLesson, currentPart);
		console.log(updateMessage);
	})
}

function updateDatabase(draftData, title, content, lesson, part) {
	return new Promise((resolve, reject) => {
		let updatedDraftData = draftData.slice();
		updatedDraftData.lessons[lesson].parts[part].partTitle = title;
		updatedDraftData.lessons[lesson].parts[part].partContent = content;
		// update localstorage
		console.log(updatedDraftData);
		resolve('updated!')
	})
}

$(loadCreatePage);

