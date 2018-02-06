const MOCK_COURSE_DATA = [
  {
    courseId: 1,
    courseTitle: 'Learn to Program Apps on STEEM',
    author: 'Jeff Bernstein',
    studentCount: 234,
    themeColor: 'purple',
    tags: ['programming', 'crypto'],
		courseSummary: `A summary here to display when course is loaded.`,
		lessons: [{
			lessonTitle: 'First Lesson Title Here & Some Other Stuff',
			chapters: [
				{
					chapterTitle: 'Here\'s a Chapter Title',
					chapterContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
				},
				{
					chapterTitle: 'Here\'s a Chapter Title',
					chapterContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.

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
			author: 'Jeff B',
			studentCount: 234,
			themeColor: 'purple',
			tags: ['programming', 'crypto'],
			currentLesson: 1, // maybe this can be the lesson after the last lesson marked as completed
			currentChapter: 3,
			percentComplete: 50, // maybe i can just take the length of the completed arrays
			completed: [				// and divide them by the total chapters to get percent complete
				[1, 2]
			]
		},
		{
			courseId: 20,
			courseTitle: 'Learn CSS Grid',
			author: 'Gary Gridington',
			studentCount: 4,
			themeColor: 'blue',
			tags: ['programming'],
			currentLesson: 1,
			currentChapter: 2,
			percentComplete: 20
		},
		{
			courseId: 7,
			courseTitle: 'Learn Great Stuff',
			author: 'Some Other Person',
			studentCount: 1123,
			themeColor: 'green',
			tags: ['language'],
			currentLesson: 1,
			currentChapter: 2,
			percentComplete: 90
		}
	],
	published: [1, 5, 3],
	drafts: [
		{
			draftId: 5,
			courseTitle: "This is a Draft",
			themeColor: 'purple',
			tags: ['language', 'crypto'],
			courseSummary: 'Here is my really great summary.',
			lessons: [
				{
					lessonTitle: 'A Great Lesson',
					chapters: [
						{
							chapterTitle: ' Here is My Chapter Title',
							chapterContent: 'lorem lorem lorem'
						},
						{
							chapterTitle: 'Here is My Second Chapter Title',
							chapterContent: 'lorem again!'
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

function checkForJsonWebToken() {
	if (localStorage.getItem('JWT') !== null) showMemberNav();
	else {
		$('.sign-in-log-in').show();
		$('.welcome-message').show();
		$('.course-progress-bar').hide();
		$('.sidebar-button-container-wrapper').show();
	}
}

function getUserData() {
	return new Promise((resolve, reject) => {
		// api call will go here
		resolve(MOCK_USER_DATA);
	});
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
	console.log(MOCK_USER_DATA);
  $('.put-stuff-here').html(JSON.stringify(courseData));
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
