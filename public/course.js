const url = window.location.href
const test = url.match(/(course)\/(.*)\/?$/)
const courseId = test === null ? 'course' : test[2]
// typeof url.match(/\/([^/]+)$/)[1] === 'undefined'
//   ? 'not in url'
//   : url.match(/\/([^/]+)$/)[1]
console.log(courseId)

const jwt = JSON.parse(localStorage.getItem('JWT'))

function checkForJsonWebTokenOnCourse() {
  if (jwt !== null) {
    showMemberNav()
    // load standard sidebar and default to course summary
  } else {
    $(".sign-in-log-in").show()
    $(".welcome-message").show()
    $(".course-progress-bar").hide()
    $(".sidebar-button-container-wrapper").show()
  }
}
//
// const courseData = {
//   courseTitle: 'Title',
//   themeColor: 'purple',
//   tags: [],
//   courseSummary: '',
//   lessons: []
// }

const userData = {
  userId: '',
  gravatarHash: '',
  enrolledIn: [],
  drafts: []
}

async function loadPage() {
  checkForJsonWebTokenOnCourse()

  const courseData = await getCourse(courseId)
  const retrievedUserData = await getUserData()

  userData.userId = retrievedUserData.userId
  userData.gravatarHash = retrievedUserData.gravatarHash
  userData.enrolledIn = retrievedUserData.enrolledIn
  userData.drafts = retrievedUserData.drafts

  $(".expand-sidebar-desktop")
    .hide()
    .css("background-color", `var(--${courseData.themeColor})`)
  $(".expand-sidebar-mobile")
    .hide()
    .css("background-color", `var(--${courseData.themeColor})`)

  closeAndOpenSidebar()

  loadSideBar(courseData, userData)
  loadCurrentLocation(courseData, userData)
  moveToClickedLesson(courseData)
  nextButton(courseData)
  previousButton(courseData)
  clickLessonNameListener(courseData)
  createDropdown()
  watchSignUpButton()
  watchSignUpForm()
  watchLogInButton()
  closeModal()
  enrollButtonListener(courseData)
  markPartCompleted(courseData)
}

function enrollButtonListener(courseData) {
  $('.course-grid-enroll-button').click(() => {
    // TODO test if user is already enrolled

    $.ajax({
      type: 'POST',
      url: `/api/courses/${courseData.courseId}`,
      contentType: 'application/json',
      dataType: 'json',
      headers: {'Authorization': `Bearer ${jwt.authToken}`},
      crossDomain: true,
      error: function (error) {
        console.log('there was an error enrolling: ', error)
      },
      success: function (data) {
        console.log('enrolled successfully: ', data)

        userData.enrolledIn = data.enrolledIn

        loadSideBar(courseData, userData)
      }
    })
  })
}

function loadSideBar(courseData, userData) {
  // const userCourseData = userData.enrolledIn.find(
  //   course => course.courseId == courseId
  // )
  let percentComplete = calculatePercentComplete(courseData, userData)

  $(".sidebar-course-info").addClass(`${courseData.themeColor}-tile`)
  $(".sidebar-course-title").html(courseData.courseTitle)
  $(".sidebar-course-author").html(`by ${courseData.courseAuthor}`)

  // test if user is enrolled
  const userCourseData = userData.enrolledIn.find(
    course => course.courseId === courseId
  )

  console.log({userCourseData})

  if (typeof userCourseData === 'undefined') {
    $('.course-progress-bar').hide()
    $('.course-grid-enroll-button').show()
  } else {
    $('.course-grid-enroll-button').hide()
    $('.course-progress-bar').show()
    $(".course-progress-bar-shader").css({
      width: `${percentComplete}%`,
      "background-color": `var(--dark-${courseData.themeColor})`
    })
    $(".percent-complete").html(`${percentComplete}% complete`)
  }

  let sidebarCourseInfoHeight = $(".sidebar-course-info").height()
  $(".sidebar-table-of-contents")
    .css("top", () => sidebarCourseInfoHeight + 10)
    .html(createTableOfContents(courseData))
}

function loadCurrentLocation(courseData, userData) {
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
    currentLesson = userCourseData.currentLesson
    currentPart = userCourseData.currentPart
    currentPartData = courseData.lessons[currentLesson].parts[currentPart]
  }
  // let currentLesson = userCourseData.currentLesson || 0
  // let currentPart = userCourseData.currentLesson || 0
  // let currentPartData = courseData.lessons[currentLesson].parts[currentPart]

  if (
    courseData.lessons[currentLesson].parts[currentPart + 1] === undefined &&
    courseData.lessons[currentLesson + 1] === undefined
  ) {
    $(".next-container").hide()
  }

  if (
    courseData.lessons[currentLesson].parts[currentPart - 1] === undefined &&
    courseData.lessons[currentLesson - 1] === undefined
  ) {
    $(".previous-container").hide()
    $(".previous-next").css("justify-content", "flex-end")
  } else {
    $(".previous-container").show()
  }

  updateLessonLocationData(currentLesson, currentPart)

  $(".part-title").html(currentPartData.partTitle)
  $(".part-content").html(marked(currentPartData.partContent))
}



function clickLessonNameListener(courseData) {
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

function markPartCompleted(courseData) {
  $('.mark-as-completed-button').click(() => {
    const percentComplete = calculatePercentComplete(courseData, userData)
    const currentLesson = Number($('.current-lesson').data('lesson'))
    const currentPart = Number($('.current-lesson').data('part'))

    let completedArray = []

    if (percentComplete === 0) {
      // first make array structure to hold completed lessons
      courseData.lessons.forEach(lesson => completedArray.push([]))

      // then push completed part into empty array for that lesson
      completedArray[currentLesson].push(currentPart)
    }

    console.log(completedArray)

    // $.ajax({
    //   type: 'PUT',
    //   url: `/api/courses/${courseData.courseId}`,
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   headers: {'Authorization': `Bearer ${jwt.authToken}`},
    //   data: JSON.stringify(userData),
    //   crossDomain: true,
    //   error: function (error) {
    //     console.log('there was an error marking complete: ', error)
    //   },
    //   success: function (data) {
    //     console.log('marked complete successfully: ', data)
    //
    //     userData.enrolledIn = data.enrolledIn
    //
    //     loadSideBar(courseData, userData)
    //   }
    // })
  })
}

$(loadPage)
