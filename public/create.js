const url = window.location.href
const test = url.match(/(create)\/(.*)\/?$/)
const draftId = test === null ? 'create' : test[2]
// typeof url.match(/\/([^/]+)$/)[1] === 'undefined'
//   ? 'not in url'
//   : url.match(/\/([^/]+)$/)[1]
console.log(draftId)

function checkForJsonWebToken () {
  if (localStorage.getItem('JWT') !== null) showMemberNav()
  else {
    $('.sign-in-log-in').show()
    $('.welcome-message').show()
    $('.course-progress-bar').hide()
    $('.sidebar-button-container-wrapper').show()
  }
}

const draftData = {
  courseTitle: 'Title',
  themeColor: 'purple',
  tags: [],
  courseSummary: '',
  lessons: []
}

// const updatedDraftData = {}

async function loadCreatePage () {
  checkForJsonWebToken()

  // const courseData = await getCourse(draftId);

  if (draftId === 'create') {
    draftData.courseTitle = 'My Great Course'
    draftData.themeColor = 'purple'
    draftData.courseSummary = 'My great summary.'
    draftData.lessons = [
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
  } else {
    const userData = await getUserData()
    const draftDataFromDb = userData.drafts.find(
      draft => draft.courseId === draftId
    )
    draftData.courseTitle = draftDataFromDb.courseTitle
    draftData.themeColor = draftDataFromDb.themeColor
    draftData.courseSummary = draftDataFromDb.courseSummary
    draftData.lessons = draftDataFromDb.lessons
  }

  $('.expand-sidebar-desktop')
    .hide()
    .css('background-color', `var(--${draftData.themeColor})`)
  $('.expand-sidebar-mobile')
    .hide()
    .css('background-color', `var(--${draftData.themeColor})`)

  $('.sidebar-button-container-wrapper').show()

  $('.previous-next').hide()
  $('.edit-part').hide()
  $('.mark-as-completed-container').hide()

  $('.pick-to-edit').show()

  closeAndOpenSidebar()
  loadCreateSideBar(draftData)
  moveToClickedLesson(draftData)
  nextButton(draftData)
  previousButton(draftData)
  clickToEditCourseName()
  updatePartOnKeypress()
  // createDropdown()
  changeCourseColor()
  saveDraftListener()
  clickToEditLessonName()
  // createNewDraft()
  watchSignUpForm()
  addMenu()
  publishCourse()
}

function loadCreateSideBar (draftData) {
  $(`.sidebar-create-color-picker-tile.${draftData.themeColor}-tile`).addClass(
    'sidebar-create-color-picker-tile-selected'
  )
  $('.sidebar-course-info').addClass(`${draftData.themeColor}-tile`)
  $('.sidebar-course-title').html(draftData.courseTitle)

  let sidebarCourseInfoHeight = $('.sidebar-course-info').height()
  $('.sidebar-table-of-contents')
    .css('top', () => sidebarCourseInfoHeight + 10)
    .html(createTableOfContents(draftData))
}

function changeCourseColor () {
  $('.sidebar-create-color-picker-tile').click(event => {
    // check if it's the same as the one in the database
    let clickedColor = $(event.currentTarget).data('color')

    // if not, update database and change on screen
    $('.sidebar-create-color-picker-tile').removeClass(
      'sidebar-create-color-picker-tile-selected'
    )
    $(event.currentTarget).addClass(
      'sidebar-create-color-picker-tile-selected'
    )
    $('.sidebar-course-info')
      .attr('class', 'sidebar-course-info')
      .addClass(`${clickedColor}-tile`)

    draftData.themeColor = clickedColor
    // TODO update mobile and desktop collapse buttons
  })
}

function saveDraftListener () {
  $('.save-draft-button').click(async () => {
    await saveDraft()
  })
}

function saveDraft () {

  const jwt = JSON.parse(localStorage.getItem('JWT'))

  return new Promise((resolve, reject) => {
    // if new course, create new course on database
    if (draftId === 'create') {
      $.ajax({
        type: 'POST',
        url: '/api/drafts/',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(draftData),
        headers: {Authorization: `Bearer ${jwt.authToken}`},
        crossDomain: true,
        error: function (error) {
          reject(error)
          console.log('there was an error: ', error)
        },
        success: function (data) {
          resolve(data)
          console.log('draft created! heres the data: ', data)
          window.location.href = `/create/${data.courseId}`
        }
      })

      // otherwise update existing draft
    } else {
      $.ajax({
        type: 'PUT',
        url: '/api/drafts/',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({...draftData, courseId: draftId}),
        headers: {Authorization: `Bearer ${jwt.authToken}`},
        crossDomain: true,
        error: function (error) {
          reject(error)
          console.log('there was an error: ', error)
        },
        success: function (data) {
          resolve(data)
          console.log('draft updated: ', data)
        }
      })
    }
  })
  // if new course, create new course on database
}

function publishCourse () {
  const jwt = JSON.parse(localStorage.getItem('JWT'))

  $('.publish-button').click(async () => {
    await saveDraft()

    $.ajax({
      type: 'POST',
      url: '/api/courses/',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({...draftData, courseId: draftId}),
      headers: {Authorization: `Bearer ${jwt.authToken}`},
      crossDomain: true,
      error: function (error) {
        console.log('there was an error: ', error)
      },
      success: function (data) {
        console.log('course published: ', data)
      }
    })
  })
}

function clickToEditLessonName () {
  $('.sidebar-table-of-contents').on(
    'click',
    '.sidebar-lesson-title',
    event => {
      let clickedLesson = $(event.currentTarget)
        .prev()
        .data('lessonNumber')

      draftData.lessons[clickedLesson].lessonTitle = prompt(
        'Enter a new lesson name and hit OK 🙂',
        `${draftData.lessons[clickedLesson].lessonTitle}`
      )

      loadCreateSideBar(draftData)
    }
  )
}

function clickToEditCourseName () {
  $('.sidebar-course-title').on('click', event => {
    draftData.courseTitle = prompt(
      'Enter a new course name and hit OK 👍',
      `${draftData.courseTitle}`
    )

    loadCreateSideBar(draftData)
  })
}

function updatePartOnKeypress () {
  $('.part-title').on('input', () => {
    let currentLesson = Number($('.current-lesson').data('lesson'))
    let currentPart = Number($('.current-lesson').data('part'))

    draftData.lessons[currentLesson].parts[currentPart].partTitle = $(
      '.part-title'
    ).val()

    loadCreateSideBar(draftData)
  })

  $('.part-content').on('input', () => {
    let currentLesson = Number($('.current-lesson').data('lesson'))
    let currentPart = Number($('.current-lesson').data('part'))

    draftData.lessons[currentLesson].parts[currentPart].partContent = $(
      '.part-content'
    ).val()
  })
}

// menu for adding lessons and parts
function addMenu () {
  $('.add-button').click(() => {
    $('.add-menu').toggle()
  })

  $('.add-lesson').click(() => {
    const newLesson = prompt('What would you like to name your new lesson?')

    draftData.lessons.push({
      lessonTitle: newLesson,
      parts: [
        {
          partTitle: 'My Great Part',
          partContent: 'Text goes here.'
        }
      ]
    })

    loadCreateSideBar(draftData)
  })

  $('.add-part').click(() => {
    let newPartLocation = prompt('Which lesson should the part be added to?')

    if (newPartLocation > draftData.lessons.length) {
      alert('Please pick a lesson that exists.')
    } else {
      const newPartTitle = prompt('What would you like to name your new part?')

      draftData.lessons[newPartLocation - 1].parts.push({
        partTitle: newPartTitle,
        partContent: 'Text goes here.'
      })

      loadCreateSideBar(draftData)
    }
  })
}

$(loadCreatePage)
