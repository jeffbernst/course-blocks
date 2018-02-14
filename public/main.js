// const MOCK_COURSE_DATA = [
// 	{
// 		courseId: 1,
// 		courseTitle: 'Learn to Program Apps on STEEM',
// 		courseAuthor: 'Jeff Bernstein',
// 		studentCount: 234,
// 		themeColor: 'purple',
// 		tags: ['programming', 'crypto'],
// 		courseSummary: `A summary here to display when course is loaded.`,
// 		lessons: [{
// 			lessonTitle: 'First Lesson Title Here & Some Other Stuff',
// 			parts: [
// 				{
// 					partTitle: 'How does this look if I make it much longer like this?',
// 					partContent: `
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// ## Here's a markdown title
//
// _And here's some italic text._ **Here's some bold text.**
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 				},
// 				{
// 					partTitle: 'Here\'s a part Title first lesson part 2',
// 					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 				}
// 			]
// 		},
// 			{
// 				lessonTitle: 'Here\'s a Second Lesson!',
// 				parts: [
// 					{
// 						partTitle: 'Here\'s a part Title 1',
// 						partContent: `This is great! **I can even write in bold!**`},
// 					{
// 						partTitle: 'Here\'s a part Title 2',
// 						partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus. consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 					}
// 				]
// 			},
// 			{
// 				lessonTitle: 'And Here is My Third & Final Lesson!',
// 				parts: [
// 					{
// 						partTitle: 'Here\'s a part Title final lesson 1',
// 						partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 					},
// 					{
// 						partTitle: 'Here\'s a part Title final lesson 2',
// 						partContent: `I don't really know what to write anymore`
// 					}
// 				]
// 			}]
// 	},
// 	{
// 		courseId: 2,
// 		courseTitle: 'Learn CSS Grid',
// 		courseAuthor: 'Gary Gridington',
// 		studentCount: 2,
// 		themeColor: 'blue',
// 		tags: ['programming'],
// 		courseSummary: `A summary here to display when course is loaded.`,
// 		lessons: [{
// 			lessonTitle: 'First Lesson Title Here & Some Other Stuff',
// 			parts: [
// 				{
// 					partTitle: 'Here\'s a part Title',
// 					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 				},
// 				{
// 					partTitle: 'Here\'s a part Title Again',
// 					partContent: `**Here's some more markdown!** _It's great!_`
// 				}
// 			]
// 		}]
// 	},
// 	{
// 		courseId: 3,
// 		courseTitle: 'Learn to Program Apps on STEEM',
// 		courseAuthor: 'Jeff Bernstein',
// 		studentCount: 234,
// 		themeColor: 'green',
// 		tags: ['language'],
// 		courseSummary: `A summary here to display when course is loaded.`,
// 		lessons: [{
// 			lessonTitle: 'First Lesson Title Here & Some Other Stuff',
// 			parts: [
// 				{
// 					partTitle: 'Here\'s a part Title',
// 					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 				},
// 				{
// 					partTitle: 'Here\'s a part Title',
// 					partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 				}
// 			]
// 		}]
// 	},
// 	{
// 		courseId: 5,
// 		courseTitle: "This is a Really Great Course on Stuff",
// 		themeColor: 'purple',
// 		tags: ['language', 'crypto'],
// 		courseSummary: 'Here is my really great summary.',
// 		lessons: [
// 			{
// 				lessonTitle: 'A Great Lesson DRAFT!',
// 				parts: [
// 					{
// 						partTitle: 'Here is My part Title in this great draft',
// 						partContent: 'lorem lorem lorem'
// 					},
// 					{
// 						partTitle: 'Here is My Second part Title again in a draft :D',
// 						partContent: 'lorem again!'
// 					}
// 				]
// 			}
// 		]
// 	}
// ];

// moved the course data up in mock course data and only left the created array with course numbers

// const MOCK_USER_DATA = {
// 	userId: 1,
// 	userName: 'jeffbernst',
// 	gravatarHash: '75ad827dc5ac6baa1df806dfe15b394e',
// 	enrolledIn: [
// 		{
// 			courseId: 1,
// 			courseTitle: 'Learn to Program Apps on STEEM',
// 			courseAuthor: 'Jeff B',
// 			themeColor: 'purple',
// 			tags: ['programming', 'crypto'],
// 			currentLesson: 0, // maybe this can be the lesson after the last lesson marked as completed
// 			currentPart: 0,
// 			completed: [
// 				[1]
// 			],
// 			lessons: [{
// 				lessonTitle: 'First Lesson Title Here & Some Other Stuff',
// 				parts: [
// 					{
// 						partTitle: 'How does this look if I make it much longer like this?',
// 						partContent: `
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// ## Here's a markdown title
//
// _And here's some italic text._ **Here's some bold text.**
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 					},
// 					{
// 						partTitle: 'Here\'s a part Title',
// 						partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 					}
// 				]
// 			},
// 				{
// 					lessonTitle: 'Here\'s a Second Lesson!',
// 					parts: [
// 						{
// 							partTitle: 'Here\'s a part Title',
// 							partContent: `This is great! **I can even write in bold!**`},
// 						{
// 							partTitle: 'Here\'s a part Title',
// 							partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus. consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 						}
// 					]
// 				},
// 				{
// 					lessonTitle: 'And Here is My Third & Final Lesson!',
// 					parts: [
// 						{
// 							partTitle: 'Here\'s a part Title',
// 							partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 						},
// 						{
// 							partTitle: 'Here\'s a part Title',
// 							partContent: `I don't really know what to write anymore`
// 						}
// 					]
// 				}]
// 		},
// 		{
// 			courseId: 2,
// 			courseTitle: 'Learn CSS Grid',
// 			courseAuthor: 'Gary Gridington',
// 			themeColor: 'blue',
// 			tags: ['programming'],
// 			currentLesson: 0,
// 			currentPart: 1,
// 			completed: [
// 				[0]
// 			],
// 			lessons: [{
// 				lessonTitle: 'First Lesson Title Here & Some Other Stuff',
// 				parts: [
// 					{
// 						partTitle: 'Here\'s a part Title',
// 						partContent: `tetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 					},
// 					{
// 						partTitle: 'Here\'s a part Title Again',
// 						partContent: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.
//
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel ducimus accusantium facere laborum, ipsum natus molestias inventore nostrum, cupiditate autem delectus nobis ipsam iure, earum a laudantium deleniti repellendus.`
// 					}
// 				]
// 			}]
// 		}
// 	],
// 	drafts: [
// 		{
// 		courseId: 5,
// 		courseTitle: "This is a Really Great Course on Stuff",
// 		themeColor: 'purple',
// 		tags: ['language', 'crypto'],
// 		courseSummary: 'Here is my really great summary.',
// 		lessons: [
// 			{
// 				lessonTitle: 'A Great Lesson DRAFT!',
// 				parts: [
// 					{
// 						partTitle: 'Here is My part Title in this great draft',
// 						partContent: 'lorem lorem lorem'
// 					},
// 					{
// 						partTitle: 'Here is My Second part Title again in a draft :D',
// 						partContent: 'lorem again!'
// 					}
// 				]
// 			}
// 		]
// 	}
// 	]
// };

// localStorage.setItem('MOCK_COURSE_DATA', JSON.stringify(MOCK_COURSE_DATA));

// const url = window.location.href;
// const courseId = (typeof url.match(/\/([^/]+)$/)[1] === 'undefined') ? 'not in url' : url.match(/\/([^/]+)$/)[1];

function getCourse(courseId) {
	return new Promise((resolve, reject) => {
		let MOCK_COURSE_DATA = JSON.parse(localStorage.getItem('MOCK_COURSE_DATA'));
		resolve(MOCK_COURSE_DATA.find(course => course.courseId == courseId));
	});
}

function getUserData() {
	return new Promise((resolve, reject) => {
		// api call will go here
		let MOCK_USER_DATA = JSON.parse(localStorage.getItem('MOCK_USER_DATA'));
		resolve(MOCK_USER_DATA);
	});
}



function watchSignUpButton() {
	$('.nav-signup-button').click(event => {
		$('.modal').show();
		$('.signup-modal-content').show();
	});
}

function watchLogInButton() {
	$('.nav-login-button').click(event => {
		$('.modal').show();
		$('.login-modal-content').show();
	});
}

function closeModal() {
	$('.modal, .close-modal').click(event => {
		$('.modal').hide();
		$('.signup-modal-content').hide();
		$('.login-modal-content').hide();
	});
}

async function showMemberNav() {
	const userData = await getUserData();
	let createDropdownData = userData.drafts.map(course => `<a href="/create/${course.courseId}">${course.courseTitle}</a>`).join('');

	$('.nav-user-profile').html(`
		<div class="dropdown">
			<button class="nav-button nav-create">Create</button>
			<div class="dropdown-content">
				<a href="/create" class="create-dropdown-new-course">New Course</a>
				${createDropdownData}
			</div>
		</div>
  	<img src='https://www.gravatar.com/avatar/${userData.gravatarHash}' alt='user profile' class="nav-user-profile-image">
  `);

	$('.nav-create').show();
}

function createDropdown() {
	$('.nav-create').click(event => {
		$('.dropdown-content').toggle();
	})
}

function createTableOfContents(courseData) {
	let tableOfContentsString = '';
	let lessons = courseData.lessons;

	for (let i = 0; i < lessons.length; i++) {
		tableOfContentsString += `
			<div class="sidebar-lesson">
			<div class="sidebar-lesson-number" data-lesson-number="${i}">Lesson ${i+1}</div>
			<div class="sidebar-lesson-title">${lessons[i].lessonTitle}</div>
			<div class="sidebar-part-group">
		`;
		for (let j = 0; j < lessons[i].parts.length; j++) {
			tableOfContentsString += `
				<div class="sidebar-part" data-part-number="${j}">
					<span class="sidebar-part-number">- ${j+1}: </span>
					${lessons[i].parts[j].partTitle}
				</div>
			`
		}
		tableOfContentsString += `</div></div>`
	}
	return tableOfContentsString;
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

function moveToClickedLesson(courseData) {
	$('.sidebar-table-of-contents').on('click', '.sidebar-part', event => {
		let clickedPart = $(event.currentTarget).data('partNumber');

		let clickedLesson =
			$(event.currentTarget)
				.parent()
				.prevAll('.sidebar-lesson-number')
				.data('lessonNumber');

		let clickedPartData = courseData.lessons[clickedLesson].parts[clickedPart];

		// show for create page
		$('.previous-next').show();
		$('.edit-part').show();
		$('.mark-as-completed-container').show();
		$('.pick-to-edit').hide();

		showOrHideNextAndPreviousButtons(courseData, clickedLesson, clickedPart);
		updateLessonLocationData(clickedLesson, clickedPart);

		$('div.part-title').html(clickedPartData.partTitle);
		$('div.part-content').html(marked(clickedPartData.partContent));

		$('textarea.part-title').val(clickedPartData.partTitle);
		$('textarea.part-content').val(clickedPartData.partContent);
	});

	$('.sidebar-table-of-contents').on('click', '.sidebar-lesson-title', event => {
		let clickedLesson = $(event.currentTarget).prev().data('lessonNumber');

		let clickedPartData = courseData.lessons[clickedLesson].parts[0];

		showOrHideNextAndPreviousButtons(courseData, clickedLesson, 0)
		updateLessonLocationData(clickedLesson, 0);

		$('.part-title').html(clickedPartData.partTitle);
		$('.part-content').html(marked(clickedPartData.partContent));

		$('textarea.part-title').val(clickedPartData.partTitle);
		$('textarea.part-content').val(clickedPartData.partContent);
	})
}

function nextButton(courseData) {
	$('.next-button').click(event => {
		let currentLesson = Number($('.current-lesson').data('lesson'));
		let currentPart = Number($('.current-lesson').data('part'));

		let nextPart = currentPart + 1 >= courseData.lessons[currentLesson].parts.length ? 0 : currentPart + 1;
		let nextLesson = nextPart === 0 ? currentLesson + 1 : currentLesson;

		let nextPartData = courseData.lessons[nextLesson].parts[nextPart];

		showOrHideNextAndPreviousButtons(courseData, nextLesson, nextPart);
		updateLessonLocationData(nextLesson, nextPart);

		$('.part-title').html(nextPartData.partTitle);
		$('.part-content').html(marked(nextPartData.partContent));

		$('textarea.part-title').val(nextPartData.partTitle);
		$('textarea.part-content').val(nextPartData.partContent);
	})
}

function previousButton(courseData) {
	$('.previous-button').click(event => {
		let currentLesson = Number($('.current-lesson').data('lesson'));
		let currentPart = Number($('.current-lesson').data('part'));

		let previousPart = currentPart === 0 ? courseData.lessons[currentLesson - 1].parts.length - 1 : currentPart - 1;
		let previousLesson = currentPart === 0 ? currentLesson - 1 : currentLesson;

		let previousPartData = courseData.lessons[previousLesson].parts[previousPart];

		showOrHideNextAndPreviousButtons(courseData, previousLesson, previousPart);
		updateLessonLocationData(previousLesson, previousPart);

		$('.part-title').html(previousPartData.partTitle);
		$('.part-content').html(marked(previousPartData.partContent));

		$('textarea.part-title').val(previousPartData.partTitle);
		$('textarea.part-content').val(previousPartData.partContent);
	})
}

function updateLessonLocationData(lesson, part) {
	$('.current-lesson')
		.html(`Lesson ${lesson + 1} / Part ${part + 1}`)
		.data({lesson: `${lesson}`, part: `${part}`});

	highlightCurrentPart(lesson, part);
}

function highlightCurrentPart(lesson, part) {

	// remove highlight from all parts
	$('.sidebar-part').removeClass('sidebar-part-highlighted');

	$('.sidebar-table-of-contents')
		.find(`.sidebar-lesson-number[data-lesson-number=${lesson}]`)
		.parent()
		.find(`.sidebar-part[data-part-number=${part}]`)
		.addClass('sidebar-part-highlighted');
}

function showOrHideNextAndPreviousButtons(courseData, lesson, part) {
	$('.previous-next').css('justify-content', 'space-between');

	if (
		courseData.lessons[lesson].parts[part + 1] === undefined &&
		courseData.lessons[lesson + 1] === undefined
	) {
		$('.next-container').hide();
		$('.previous-next').css('justify-content', 'flex-start')
	} else {
		$('.next-container').show();
	}

	if (
		courseData.lessons[lesson].parts[part - 1] === undefined &&
		courseData.lessons[lesson - 1] === undefined
	) {
		$('.previous-container').hide();
		$('.previous-next').css('justify-content', 'flex-end')
	} else {
		$('.previous-container').show();
	}
}
