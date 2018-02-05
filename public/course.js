const MOCK_COURSE_DATA = [
  {
    courseId: 1,
    courseTitle: 'Learn to Program Apps on STEEM',
    author: 'Jeff B',
    studentCount: 234,
    themeColor: 'purple',
    tags: ['programming', 'crypto']
  }
];

const url = window.location.href;
const courseId = url.match(/\/([^/]+)$/)[1];

function getCourse(courseId) {
  return new Promise((resolve, reject) => {
    resolve(MOCK_COURSE_DATA.find(course => course.courseId == courseId));
  });
}

async function loadPage() {
	const courseData = await getCourse(courseId);
  $('.put-stuff-here').html(JSON.stringify(courseData));
}



$(loadPage);
