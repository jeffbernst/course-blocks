const url = window.location.href
const draftId =
  typeof url.match(/\/([^/]+)$/)[1] === 'undefined'
    ? 'not in url'
    : url.match(/\/([^/]+)$/)[1]

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
    const draftDataFromDb = userData.drafts.find(draft => draft.courseId == draftId)
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
  // createDropdown()
  changeCourseColor()
  saveDraft()
  // createNewDraft()
  watchSignUpForm()
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

  // dragula([document.querySelector('.sidebar-part-group')]);
  const drake = dragula([document.querySelector('.sidebar-part-group')])
  drake.on('drop', (el, target, source, sibling) =>
    console.log(
      'el: ',
      el,
      'target: ',
      target,
      'source: ',
      source,
      'sibling: ',
      sibling
    )
  )
}

function changeCourseColor () {
  $('.sidebar-create-color-picker-tile').click(event => {
    // check if it's the same as the one in the database
    let clickedColor = $(event.currentTarget).data('color')

    // if not, update database and change on screen
    $('.sidebar-create-color-picker-tile').removeClass(
      'sidebar-create-color-picker-tile-selected'
    )
    $(event.currentTarget).addClass('sidebar-create-color-picker-tile-selected')
    $('.sidebar-course-info')
      .attr('class', 'sidebar-course-info')
      .addClass(`${clickedColor}-tile`)

    // update mobile and desktop collapse buttons
  })
}

function saveDraft () {
  $('.edit-part').submit(async event => {
    event.preventDefault()
    const partTitle = $(event.currentTarget)
      .find('.part-title')
      .val()
    const partContent = $(event.currentTarget)
      .find('.part-content')
      .val()
    const themeColor = $('.sidebar-create-color-picker-tile-selected').data('color')

    const currentLesson = Number($('.current-lesson').data('lesson'))
    const currentPart = Number($('.current-lesson').data('part'))

    const draftData = {
      partTitle,
      partContent,
      currentLesson,
      currentPart,
      themeColor
    }

    const jwt = JSON.parse(localStorage.getItem('JWT'))

    // if new course, create new course on database
    if (draftId === 'create') {
      $.ajax({
        type: 'POST',
        url: 'api/drafts/',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(draftData),
        headers: {'Authorization': `Bearer ${jwt.authToken}`},
        crossDomain: true,
        error: function (error) {
          console.log('there was an error: ', error)
        },
        success: function (data) {
          console.log('it worked!')
        }
      })

      // TODO make sure to update URL after creating course

    } else {
      $.ajax({
        type: 'POST',
        url: 'api/drafts/',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(draftData),
        headers: {'Authorization': `Bearer ${jwt.authToken}`},
        crossDomain: true,
        error: function (error) {
          console.log('there was an error: ', error)
        },
        success: function (data) {
          console.log('it worked!')
        }
      })
    }
//     console.log(updateMessage)
  })
}

function updateDatabase (draftData, title, content, lesson, part) {
  return new Promise((resolve, reject) => {
    let currentUserData = JSON.parse(localStorage.getItem('MOCK_USER_DATA'))
    let draftIndex = currentUserData.drafts.findIndex(
      draft => draft.courseId == draftId
    )

    currentUserData.drafts[draftIndex].lessons[lesson].parts[
      part
      ].partTitle = title
    currentUserData.drafts[draftIndex].lessons[lesson].parts[
      part
      ].partContent = content

    let updatedUserData = Object.assign({}, currentUserData)

    localStorage.setItem('MOCK_USER_DATA', JSON.stringify(updatedUserData))

    location.reload()

    // need to update sidebar and course data that is in the dom
    // moveToClickedLesson is currently using the course data from initial page load

    resolve('updated!')
  })
}

// function createNewDraft() {
//   // initialize course with basic course data and 0 courseIndex
//   // change courseIndex to proper number when published and copied to course database
//   const newDraftData = {
//     courseId: 6,
//     courseTitle: "My Great Course",
//     themeColor: "purple",
//     tags: [],
//     courseSummary: "My great summary.",
//     lessons: [
//       {
//         lessonTitle: "My Great Lesson",
//         parts: [
//           {
//             partTitle: "My Great Part",
//             partContent: "Text goes here."
//           }
//         ]
//       }
//     ]
//   }
// }

$(loadCreatePage)
