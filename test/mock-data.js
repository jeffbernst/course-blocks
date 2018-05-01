const mockCourseData = {
  courseTitle: 'My Great Course',
  themeColor: 'purple',
  lessons: [
    {
      lessonTitle: 'My Great Lesson',
      parts: [
        {
          partTitle: 'My Great Part',
          partContent: 'Text goes here.'
        }
      ]
    }
  ]
}

const mockCourseDataUpdated = {
  courseTitle: 'My Great Course UPDATED!!!',
  themeColor: 'purple',
  lessons: [
    {
      lessonTitle: 'My Great Lesson',
      parts: [
        {
          partTitle: 'My Great Part',
          partContent: 'Text goes here.'
        }
      ]
    }
  ]
}

const mockUserData = {
  userName: 'Jeff',
  gravatarHash: '75ad827dc5ac6baa1df806dfe15b394e',
  enrolledIn: [],
  drafts: [
    {
      courseTitle: 'My Great Course',
      themeColor: 'purple',
      lessons: [
        {
          lessonTitle: 'My Great Lesson',
          parts: [
            {
              partTitle: 'My Great Part',
              partContent: 'Text goes here.'
            }
          ]
        }
      ]
    }
  ]
}

const mockSignupData = {
  name: 'Jeff',
  email: 'test@test.com',
  password: 'testtesttest'
}

module.exports = {
  mockCourseData,
  mockCourseDataUpdated,
  mockUserData,
  mockSignupData,
}