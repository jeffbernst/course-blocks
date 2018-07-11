const url = window.location.href
const test = url.match(/(course)\/(.*)\/?$/)
const courseId = test === null ? 'course' : test[2]

const jwt = JSON.parse(localStorage.getItem('JWT'))

async function checkForJsonWebTokenOnCourse () {
  if (jwt !== null) {
    await refreshJwt()
    const retrievedUserData = await getUserData()

    userData.userId = retrievedUserData.userId
    userData.gravatarHash = retrievedUserData.gravatarHash
    userData.enrolledIn = retrievedUserData.enrolledIn
    userData.drafts = retrievedUserData.drafts

    showMemberNav()

  } else {
    $('.mark-as-completed-button').hide()
    $('.sign-in-log-in').show()
    $('.welcome-message').show()
    $('.course-progress-bar').hide()
    $('.sidebar-button-container-wrapper').show()
  }
}

const userData = {
  userId: '',
  gravatarHash: '',
  enrolledIn: [],
  drafts: [],
  completed: []
}

async function loadPage () {
  checkForJsonWebTokenOnCourse()

  const courseData = await getCourse(courseId)

  $('.expand-sidebar-desktop')
    .hide()
    .css('background-color', `var(--${courseData.themeColor})`)
  $('.expand-sidebar-mobile')
    .hide()
    .css('background-color', `var(--${courseData.themeColor})`)
  $('.mark-as-completed-button').hide()

  closeAndOpenSidebar()
  loadSideBar(courseData, userData)
  loadCurrentLocation(courseData, userData)
  moveToClickedLesson(courseData)
  nextButton(courseData)
  previousButton(courseData)
  clickLessonNameListener(courseData)
  watchSignUpButton()
  watchSignUpForm()
  watchLogInButton()
  closeModal()
  coursePageEnrollButtonListener(courseData)
  markPartCompleted(courseData)
}

function coursePageEnrollButtonListener (courseData) {
  $('.course-grid-enroll-button').click(async () => {
    if (jwt === null) {
      alert('Please log in or create an account first! :D')
    } else {
      const response = await enrollInCourse(courseData.courseId)

      userData.enrolledIn = response.enrolledIn

      loadSideBar(courseData, userData)
      loadCurrentLocation(courseData, userData)
      $('.mark-as-completed-button').show()
    }
  })
}

function loadSideBar (courseData, userData) {
  let percentComplete = calculatePercentComplete(courseData, userData)

  $('.sidebar-course-info').addClass(`${courseData.themeColor}-tile`)
  $('.sidebar-course-title').html(courseData.courseTitle)
  $('.sidebar-course-author').html(`by ${courseData.courseAuthor}`)

  const userCourseData = userData.enrolledIn.find(
    course => course.courseId === courseId
  )

  if (typeof userCourseData === 'undefined') {
    $('.course-progress-bar').hide()
    $('.course-grid-enroll-button').show()
  } else {
    $('.course-grid-enroll-button').hide()
    $('.course-progress-bar').show()
    $('.course-progress-bar-shader').css({
      width: `${percentComplete}%`,
      'background-color': `var(--dark-${courseData.themeColor})`
    })
    $('.percent-complete').html(`${percentComplete}% complete`)
  }

  let sidebarCourseInfoHeight = $('.sidebar-course-info').height()
  $('.sidebar-table-of-contents')
    .css('top', () => sidebarCourseInfoHeight + 10)
    .html(createTableOfContents(courseData, userCourseData))
}

function loadCurrentLocation (courseData, userData) {
  const userCourseData = userData.enrolledIn.find(
    course => course.courseId === courseId
  )

  let currentLesson
  let currentPart
  let currentPartData

  if (typeof userCourseData === 'undefined') {
    currentLesson = 0
    currentPart = 0
    currentPartData = courseData.lessons[currentLesson].parts[currentPart]
  } else {
    $('.mark-as-completed-button').show()
    currentLesson = userCourseData.currentLesson
    currentPart = userCourseData.currentPart
    currentPartData = courseData.lessons[currentLesson].parts[currentPart]
  }

  if (
    courseData.lessons[currentLesson].parts[currentPart + 1] === undefined &&
    courseData.lessons[currentLesson + 1] === undefined
  ) {
    $('.next-container').hide()
  }

  if (
    courseData.lessons[currentLesson].parts[currentPart - 1] === undefined &&
    courseData.lessons[currentLesson - 1] === undefined
  ) {
    $('.previous-container').hide()
    $('.previous-next').css('justify-content', 'flex-end')
  } else {
    $('.previous-container').show()
  }

  updateLessonLocationData(currentLesson, currentPart)

  $('.part-title').html(currentPartData.partTitle)
  $('.part-content').html(marked(currentPartData.partContent))
}

function clickLessonNameListener (courseData) {
  $('.sidebar-table-of-contents').on(
    'click',
    '.sidebar-lesson-title',
    event => {
      let clickedLesson = $(event.currentTarget)
        .prev()
        .data('lessonNumber')

      let clickedPartData = courseData.lessons[clickedLesson].parts[0]

      showOrHideNextAndPreviousButtons(courseData, clickedLesson, 0)
      updateLessonLocationData(clickedLesson, 0)

      $('.part-title').html(clickedPartData.partTitle)
      $('.part-content').html(marked(clickedPartData.partContent))

      $('textarea.part-title').val(clickedPartData.partTitle)
      $('textarea.part-content').val(clickedPartData.partContent)
    }
  )
}

function markPartCompleted (courseData) {
  $('.mark-as-completed-button').click(() => {
    const percentComplete = calculatePercentComplete(courseData, userData)

    const currentLesson = Number($('.current-lesson').data('lesson'))
    const currentPart = Number($('.current-lesson').data('part'))
    // find location of enrolled data for current course
    let enrolledInLocation = userData.enrolledIn.map(course => course.courseId).indexOf(courseId)

    if (percentComplete === 0) {
      let completedArray = []
      // first make array structure to hold completed lessons
      courseData.lessons.forEach(() => completedArray.push([]))
      completedArray[currentLesson].push(currentPart)
      userData.enrolledIn[enrolledInLocation].completed = completedArray
    } else {
      let userDataEnrolledIn = userData.enrolledIn
      userDataEnrolledIn[enrolledInLocation].completed[currentLesson].push(currentPart)
      userData.enrolledIn = userDataEnrolledIn
    }

    $.ajax({
      type: 'PUT',
      url: `/api/courses/${courseData.courseId}`,
      contentType: 'application/json',
      dataType: 'json',
      headers: {'Authorization': `Bearer ${jwt.authToken}`},
      data: JSON.stringify(userData),
      crossDomain: true,
      error: function (error) {
        console.log('there was an error marking complete: ', error)
      },
      success: function (data) {
        console.log('marked part complete: ', data)

        userData.enrolledIn = data.enrolledIn

        loadSideBar(courseData, userData)
        updateLessonLocationData(currentLesson, currentPart)
      }
    })
  })
}

$(loadPage)
