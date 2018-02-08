const MOCK_COURSE_DATA = [
  {
    courseId: 1,
    courseTitle: 'Learn to Program Apps on STEEM',
    courseAuthor: 'Jeff Bernstein',
    studentCount: 234,
    themeColor: 'purple',
    tags: ['programming', 'crypto'],
		courseSummary: `A summary here to display when course is loaded.`,
		lessons: [{
			lessonTitle: 'First Lesson Title Here & Some Other Stuff',
			parts: [
				{
					partTitle: 'Here\'s a part Title',
					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
				},
				{
					partTitle: 'Here\'s a part Title',
					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
				}
			]
		}]
  },
	{
    courseId: 1,
    courseTitle: 'Learn CSS Grid',
    courseAuthor: 'Gary Gridington',
    studentCount: 2,
		themeColor: 'blue',
		tags: ['programming'],
		courseSummary: `A summary here to display when course is loaded.`,
		lessons: [{
			lessonTitle: 'First Lesson Title Here & Some Other Stuff',
			parts: [
				{
					partTitle: 'Here\'s a part Title',
					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
				},
				{
					partTitle: 'Here\'s a part Title',
					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
				}
			]
		}]
  },
	{
    courseId: 1,
    courseTitle: 'Learn to Program Apps on STEEM',
    courseAuthor: 'Jeff Bernstein',
    studentCount: 234,
		themeColor: 'green',
		tags: ['language'],
		courseSummary: `A summary here to display when course is loaded.`,
		lessons: [{
			lessonTitle: 'First Lesson Title Here & Some Other Stuff',
			parts: [
				{
					partTitle: 'Here\'s a part Title',
					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
				},
				{
					partTitle: 'Here\'s a part Title',
					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
				}
			]
		}]
  }
];

const MOCK_USER_DATA = {
	userId: 1,
	userName: 'jeffbernst',
	gravatarHash: '75ad827dc5ac6baa1df806dfe15b394e',
	enrolledIn: [
		{
			courseId: 1,
			courseTitle: 'Learn to Program Apps on STEEM',
			courseAuthor: 'Jeff B',
			themeColor: 'purple',
			tags: ['programming', 'crypto'],
			currentLesson: 1, // maybe this can be the lesson after the last lesson marked as completed
			currentPart: 3,
			completed: [				// and divide them by the total parts to get percent complete
				[1]
			]
		},
		{
			courseId: 20,
			courseTitle: 'Learn CSS Grid',
			courseAuthor: 'Gary Gridington',
			themeColor: 'blue',
			tags: ['programming'],
			currentLesson: 1,
			currentPart: 2,
			completed: [				// and divide them by the total parts to get percent complete
				[1, 2]
			]
		},
		{
			courseId: 7,
			courseTitle: 'Learn Great Stuff',
			courseAuthor: 'Some Other Person',
			themeColor: 'green',
			tags: ['language'],
			currentLesson: 1,
			currentPart: 2,
			completed: [				// and divide them by the total parts to get percent complete
				[1, 2]
			]
		}
	],
	created: [
		{
			courseId: 5,
			published: false,
			courseTitle: "This is a Draft",
			themeColor: 'purple',
			tags: ['language', 'crypto'],
			courseSummary: 'Here is my really great summary.',
			lessons: [
				{
					lessonTitle: 'A Great Lesson',
					parts: [
						{
							partTitle: ' Here is My part Title',
							partContent: 'lorem lorem lorem'
						},
						{
							partTitle: 'Here is My Second part Title',
							partContent: 'lorem again!'
						}
					]
				}
			]
			// how to handle when a course is published vs a draft
		}
	]
};

const url = window.location.href;
const courseId = url.match(/\/([^/]+)$/)[1];

function getCourse(courseId) {
  return new Promise((resolve, reject) => {
    resolve(MOCK_COURSE_DATA.find(course => course.courseId == courseId));
  });
}

function getUserData() {
	return new Promise((resolve, reject) => {
		// api call will go here
		resolve(MOCK_USER_DATA);
	});
}

function checkForJsonWebToken() {
	if (localStorage.getItem('JWT') !== null) showMemberNav();
	else {
		$('.sign-in-log-in').show();
		$('.welcome-message').show();
		$('.course-progress-bar').hide();
		$('.sidebar-button-container-wrapper').show();
	}
}

async function showMemberNav() {
	const memberData = await getUserData();

	$('.nav-user-profile').html(`
		<button class="nav-button nav-profile-button">${memberData.userName}</button>
  	<img src='https://www.gravatar.com/avatar/${memberData.gravatarHash}' alt='user profile' class="nav-user-profile-image">
  `);

	$('.nav-create').show();
}

async function loadPage() {
	checkForJsonWebToken();

	$('.expand-sidebar-desktop').hide();
	$('.expand-sidebar-mobile').hide();
	closeAndOpenSidebar();

	const courseData = await getCourse(courseId);
	const userData = await getUserData(courseId);
	loadSideBar(courseData, userData);
	loadCourseData(courseData, userData);
}

function loadSideBar(courseData, userData) {
	const userCourseData = userData.enrolledIn.find(course => course.courseId == courseId);

	$('.sidebar-course-title').html(courseData.courseTitle);
	$('.sidebar-course-author').html(`by ${courseData.courseAuthor}`);
	$('.percent-complete').html(`${calculatePercentComplete(courseData, userCourseData)}% complete`);

	let sidebarCourseInfoHeight = $('.sidebar-course-info').height();
	$('.sidebar-table-of-contents')
		.css("top", () => sidebarCourseInfoHeight + 10)
		.html(createTableOfContents(courseData));
}

function createTableOfContents(courseData) {
	let tableOfContentsString = '';
	let lessons = courseData.lessons;

	for (let i = 0; i < lessons.length; i++) {
		tableOfContentsString += `
			<div class="sidebar-lesson-number">Lesson ${i+1}</div>
			<div class="sidebar-lesson-title">${lessons[i].lessonTitle}</div>
			<div class="sidebar-part-group">
		`;
		for (let j = 0; j < lessons[i].parts.length; j++) {
			tableOfContentsString += `
				<div class="sidebar-part">
					<span class="sidebar-part-number">- ${j+1}: </span>
					${lessons[i].parts[j].partTitle}
				</div>
			`
		}
		tableOfContentsString += `</div>`
	}
	return tableOfContentsString;
}

function loadCourseData(courseData, userData) {

}

function calculatePercentComplete(courseData, userData) {
	let courseSize = courseData.lessons.reduce((acc, cur) => acc + cur.parts.length, 0);
	let completedByUser = userData.completed.reduce((acc, cur) => acc + cur.length, 0);

	return (completedByUser / courseSize) * 100;
}

function closeAndOpenSidebar() {
  $('.close-sidebar-button').click(event => {
  	$('.sidebar').hide();
  	$('.close-sidebar-button').hide();
  	$('.expand-sidebar-desktop').show();
  	$('.expand-sidebar-mobile').show();
	});

	$('.expand-sidebar-desktop, .expand-sidebar-mobile').click(event => {
		$('.sidebar').show();
		$('.close-sidebar-button').show();
		$('.expand-sidebar-desktop').hide();
		$('.expand-sidebar-mobile').hide();
	})
}

$(loadPage);
