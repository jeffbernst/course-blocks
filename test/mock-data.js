const mockCourseData = {
  courseTitle: 'My Great Course',
  themeColor: 'purple',
  tags: [],
  courseSummary: 'My great summary.',
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
  tags: [],
  courseSummary: '>.<',
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
  enrolledIn: [
    {
      currentLesson: 5,
      currentPart: 3,
      completed: [[1, 2]],
      // should courseData be linked from courses database?
      courseData: {
        courseTitle: 'My Great Course',
        themeColor: 'purple',
        tags: [],
        courseSummary: 'My great summary.',
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
    }
  ],
  drafts: [
    {
      courseTitle: 'My Great Course',
      themeColor: 'purple',
      tags: [],
      courseSummary: 'My great summary.',
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

const mockUserDataUpdated = {
  userName: 'Jeff',
  gravatarHash: '75ad827dc5ac6baa1df806dfe15b394e',
  enrolledIn: [
    {
      currentLesson: 5,
      currentPart: 3,
      completed: [[1, 2]],
      // should courseData be linked from courses database?
      courseData: {
        courseTitle: 'My Great Course',
        themeColor: 'purple',
        tags: [],
        courseSummary: 'My great summary.',
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
    }
  ],
  drafts: [
    {
      courseTitle: 'My Great Course Was Just UPDATED!!!!!',
      themeColor: 'purple',
      tags: [],
      courseSummary: 'UPDATED!!',
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
  mockUserDataUpdated,
  mockSignupData
}