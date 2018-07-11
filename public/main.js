function getCourse (courseId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `/api/courses/${courseId}`,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      error: function (error) {
        console.log('there was an error getting the course: ', error)
        reject(error)
      },
      success: function (data) {
        console.log('got course')
        resolve(data)
      }
    })
  })
}

function getUserData () {
  return new Promise((resolve, reject) => {
    const jwt = JSON.parse(localStorage.getItem('JWT'))

    $.ajax({
      type: 'GET',
      url: `/api/users/`,
      contentType: 'application/json',
      dataType: 'json',
      headers: {'Authorization': `Bearer ${jwt.authToken}`},
      crossDomain: true,
      error: function (error) {
        console.log('there was an error getting user: ', error)
      },
      success: function (data) {
        console.log('got user')
        resolve(data)
      }
    })
  })
}

function refreshJwt() {
  return new Promise((resolve, reject) => {
    const jwt = JSON.parse(localStorage.getItem('JWT'))

    $.ajax({
      type: 'post',
      url: `/api/users/refresh/`,
      contentType: 'application/json',
      dataType: 'json',
      headers: {'Authorization': `Bearer ${jwt.authToken}`},
      crossDomain: true,
      error: function (error) {
        console.log('there was an error refreshing the token: ', error)
      },
      success: function (data) {
        console.log('refreshed JWT')
        localStorage.setItem('JWT', JSON.stringify(data))
      }
    })
  })
}

function watchSignUpButton () {
  $('.nav-signup-button').click(event => {
    $('.modal').show()
    $('.signup-modal-content').show()
  })
}

function checkSignupInfo (userData) {
  const requiredFields = ['name', 'email', 'password']
  const missingField = requiredFields.find(field => !(field in userData))

  if (missingField) {
    $('.signup-message').html(
      `<div style="color:red">Missing field: ${missingField}</div>`
    )
    return
  }

  const stringFields = ['name', 'email', 'password']
  const nonStringField = stringFields.find(
    field => field in userData && typeof userData[field] !== 'string'
  )

  if (nonStringField) {
    $('.signup-message').html(
      `<div style="color:red">Incorrect field type (expected string): ${nonStringField}</div>`
    )
    return
  }

  const explicitlyTrimmedFields = ['email', 'password']
  const nonTrimmedField = explicitlyTrimmedFields.find(
    field => userData[field].trim() !== userData[field]
  )

  if (nonTrimmedField) {
    $('.signup-message').html(
      `<div style="color:red">${nonTrimmedField.charAt(0).toUpperCase() + nonTrimmedField.slice(1)} can't start or end with whitespace.</div>`
    )
    return
  }

  const sizedFields = {
    password: {
      min: 10,
      max: 72
    }
  }
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
      userData[field].trim().length < sizedFields[field].min
  )
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
      userData[field].trim().length > sizedFields[field].max
  )

  if (tooSmallField || tooLargeField) {
    const message = tooSmallField
      ? `${tooSmallField.charAt(0).toUpperCase() +
      tooSmallField.slice(1)} must be at least ${
        sizedFields[tooSmallField].min
        } characters long.`
      : `${tooLargeField.charAt(0).toUpperCase() +
      tooSmallField.slice(1)} must be at most ${
        sizedFields[tooLargeField].max
        } characters long.`

    $('.signup-message').html(`<div style="color:red">${message}</div>`)
    return
  }
  return userData
}

function watchSignUpForm () {
  $('.signup-form').submit(event => {
    event.preventDefault()

    const name = $(event.currentTarget)
      .find('#signup-name')
      .val()
    const email = $(event.currentTarget)
      .find('#signup-email')
      .val()
    const password = $(event.currentTarget)
      .find('#signup-password')
      .val()
    const passwordConfirmation = $(event.currentTarget)
      .find('#signup-confirm-password')
      .val()

    if (password !== passwordConfirmation)
      $('.signup-message').html(
        `<div style="color:red">Passwords do not match.</div>`
      )
    else {
      const userData = {
        name,
        email,
        password
      }

      const checkData = checkSignupInfo(userData)

      if (checkData)
        $.ajax({
          type: 'POST',
          url: 'api/users/',
          contentType: 'application/json',
          dataType: 'json',
          crossDomain: true,
          data: JSON.stringify(userData),
          error: function (error) {
            $('.signup-message').html(
              `<p style="color:red">An error has occurred: ${
                error.responseText
                }</p>`
            )
          },
          success: function (data) {
            console.log({data})
            localStorage.setItem('JWT', JSON.stringify(data))
            $('.signup-message').html('<p style="color:Green">Signed up!</p>')
            location.reload()
          }
        })
    }
  })
}

function watchLogInButton () {
  $('.nav-login-button').click(event => {
    $('.modal').show()
    $('.login-modal-content').show()
  })
}

function watchLoginForm () {
  $('.login-form').submit(event => {
    event.preventDefault()
    const email = $(event.currentTarget)
      .find('#login-email')
      .val()
    const password = $(event.currentTarget)
      .find('#login-password')
      .val()

    const userData = {
      userEmail: email,
      password
    }

    $.ajax({
      type: 'POST',
      url: 'api/users/login',
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      data: JSON.stringify(userData),
      error: function (error) {
        console.log(error)
        $('.login-message').html(
          `<p style="color:red">An error has occurred: ${
            error.responseText
            }</p>`
        )
      },
      success: function (data) {
        console.log('succeeded')
        localStorage.setItem('JWT', JSON.stringify(data))
        $('.login-message').html('<p style="color:Green">Signed in.</p>')
        location.reload()
      }
    })
  })
}

function closeModal () {
  $('.modal, .close-modal').click(event => {
    $('.modal').hide()
    $('.signup-modal-content').hide()
    $('.login-modal-content').hide()
  })
}

async function showMemberNav () {
  const userData = await getUserData()

  let createDropdownData = userData.drafts
    .map(
      course => `<a href="/create/${course.courseId}">${course.courseTitle}</a>`
    )
    .join('')

  $('.nav-user-profile').html(`
		<div class="dropdown">
			<button class="nav-button nav-create">Create</button>
			<div class="dropdown-content">
				<a href="/create" class="create-dropdown-new-course">New Course</a>
				${createDropdownData ? '<hr>' : ''}
				${createDropdownData}
			</div>
		</div>
    <button class="nav-button nav-logout">Logout</button>
  	<img src='https://www.gravatar.com/avatar/${
    userData.gravatarHash
    }' alt='user profile' class="nav-user-profile-image">
  `)

  $('.nav-create').show()
  createDropdown()
  logoutListener()
}

function createDropdown () {
  $('.nav-create').click(() => {
    $('.dropdown-content').toggle()
  })
}

function logoutListener () {
  $('.nav-logout').click(() => {
    localStorage.removeItem('JWT')
    location.reload()
  })
}

function createTableOfContents (courseData, userCourseData) {
  let tableOfContentsString = ''
  let lessons = courseData.lessons

  for (let i = 0; i < lessons.length; i++) {
    tableOfContentsString += `
			<div class="sidebar-lesson">
			<div class="sidebar-lesson-number" data-lesson-number="${i}">Lesson ${i +
    1}</div>
			<div class="sidebar-lesson-title">${lessons[i].lessonTitle}</div>
			<div class="sidebar-part-group">
		`
    for (let j = 0; j < lessons[i].parts.length; j++) {
      // check if user has completed any of the parts, then append checks if so
      const isEmpty = a => Array.isArray(a) && a.every(isEmpty)

      if (typeof userCourseData === 'undefined') {
        tableOfContentsString += `
				<div class="sidebar-part" data-part-number="${j}">
					<span class="sidebar-part-number">- ${j + 1}: </span>
					${lessons[i].parts[j].partTitle}
				</div>
			`
      } else if (isEmpty(userCourseData.completed) === false) {
        const completedThisPart = userCourseData.completed[i].includes(j)

        tableOfContentsString += `
        <div class="sidebar-part" data-part-number="${j}">
					<span class="sidebar-part-number">- ${j + 1}: </span>
					${lessons[i].parts[j].partTitle}
					${completedThisPart ? '&#10004;' : ''}
        </div>
        `
      } else {
        tableOfContentsString += `
				<div class="sidebar-part" data-part-number="${j}">
					<span class="sidebar-part-number">- ${j + 1}: </span>
					${lessons[i].parts[j].partTitle}
				</div>
			`
      }
    }
    tableOfContentsString += `</div></div>`
  }
  return tableOfContentsString
}

function closeAndOpenSidebar () {
  $('.close-sidebar-button').click(event => {
    $('.sidebar').hide()
    $('.close-sidebar-button').hide()
    $('.expand-sidebar-desktop').show()
    $('.expand-sidebar-mobile').show()
  })

  $('.expand-sidebar-desktop, .expand-sidebar-mobile').click(event => {
    $('.sidebar').show()
    $('.close-sidebar-button').show()
    $('.expand-sidebar-desktop').hide()
    $('.expand-sidebar-mobile').hide()
  })
}

function moveToClickedLesson (courseData) {
  $('.sidebar-table-of-contents').on('click', '.sidebar-part', event => {
    let clickedPart = $(event.currentTarget).data('partNumber')

    let clickedLesson = $(event.currentTarget)
      .parent()
      .prevAll('.sidebar-lesson-number')
      .data('lessonNumber')

    let clickedPartData = courseData.lessons[clickedLesson].parts[clickedPart]

    // show for create page
    $('.previous-next').show()
    $('.edit-part').show()
    $('.pick-to-edit').hide()

    showOrHideNextAndPreviousButtons(courseData, clickedLesson, clickedPart)
    updateLessonLocationData(clickedLesson, clickedPart)

    $('div.part-title').html(clickedPartData.partTitle)
    $('div.part-content').html(marked(clickedPartData.partContent))

    $('textarea.part-title').val(clickedPartData.partTitle)
    $('textarea.part-content').val(clickedPartData.partContent)
  })
}

function nextButton (courseData) {
  $('.next-button').click(event => {
    let currentLesson = Number($('.current-lesson').data('lesson'))
    let currentPart = Number($('.current-lesson').data('part'))

    let nextPart =
      currentPart + 1 >= courseData.lessons[currentLesson].parts.length
        ? 0
        : currentPart + 1
    let nextLesson = nextPart === 0 ? currentLesson + 1 : currentLesson

    let nextPartData = courseData.lessons[nextLesson].parts[nextPart]

    showOrHideNextAndPreviousButtons(courseData, nextLesson, nextPart)
    updateLessonLocationData(nextLesson, nextPart)

    $('.part-title').html(nextPartData.partTitle)
    $('.part-content').html(marked(nextPartData.partContent))

    $('textarea.part-title').val(nextPartData.partTitle)
    $('textarea.part-content').val(nextPartData.partContent)
  })
}

function previousButton (courseData) {
  $('.previous-button').click(event => {
    let currentLesson = Number($('.current-lesson').data('lesson'))
    let currentPart = Number($('.current-lesson').data('part'))

    let previousPart =
      currentPart === 0
        ? courseData.lessons[currentLesson - 1].parts.length - 1
        : currentPart - 1
    let previousLesson = currentPart === 0 ? currentLesson - 1 : currentLesson

    let previousPartData =
      courseData.lessons[previousLesson].parts[previousPart]

    showOrHideNextAndPreviousButtons(courseData, previousLesson, previousPart)
    updateLessonLocationData(previousLesson, previousPart)

    $('.part-title').html(previousPartData.partTitle)
    $('.part-content').html(marked(previousPartData.partContent))

    $('textarea.part-title').val(previousPartData.partTitle)
    $('textarea.part-content').val(previousPartData.partContent)
  })
}

function updateLessonLocationData (lesson, part) {
  $('.current-lesson')
    .html(`Lesson ${lesson + 1} / Part ${part + 1}`)
    .data({lesson: `${lesson}`, part: `${part}`})

  if (typeof userData !== 'undefined') {
    const userCourseData = userData.enrolledIn.find(
      course => course.courseId === courseId
    )
    highlightCurrentPart(lesson, part, userCourseData)
  } else {
    highlightCurrentPart(lesson, part)
  }
}

function highlightCurrentPart (lesson, part, userCourseData) {
  // remove highlight from all parts
  $('.sidebar-part').removeClass('sidebar-part-highlighted')

  $('.sidebar-table-of-contents')
    .find(`.sidebar-lesson-number[data-lesson-number=${lesson}]`)
    .parent()
    .find(`.sidebar-part[data-part-number=${part}]`)
    .addClass('sidebar-part-highlighted')

  console.log({userCourseData})
  if (typeof userCourseData !== 'undefined' && userCourseData.completed.length !== 0) {
    const completedThisPart = userCourseData.completed[lesson].includes(part)
    if (completedThisPart) $('.mark-as-completed-button').hide()
    else $('.mark-as-completed-button').show()
  }
}

function showOrHideNextAndPreviousButtons (courseData, lesson, part) {
  $('.previous-next').css('justify-content', 'space-between')

  if (
    courseData.lessons[lesson].parts[part + 1] === undefined &&
    courseData.lessons[lesson + 1] === undefined
  ) {
    $('.next-container').hide()
    $('.previous-next').css('justify-content', 'flex-start')
  } else {
    $('.next-container').show()
  }

  if (
    courseData.lessons[lesson].parts[part - 1] === undefined &&
    courseData.lessons[lesson - 1] === undefined
  ) {
    $('.previous-container').hide()
    $('.previous-next').css('justify-content', 'flex-end')
  } else {
    $('.previous-container').show()
  }
}

function calculatePercentComplete (courseData, userData) {
  let courseSize = courseData.lessons.reduce(
    (acc, cur) => acc + cur.parts.length,
    0
  )

  const enrolledUserData = userData.enrolledIn.find(course => courseData.courseId === course.courseId)
  if (typeof enrolledUserData === 'undefined') $('.sidebar-button-container-wrapper').show()

  let completedByUser =
    typeof enrolledUserData === 'undefined'
      ? 0
      : enrolledUserData.completed.reduce((acc, cur) => acc + cur.length, 0)

  return Math.floor(completedByUser / courseSize * 100)
}

function enrollInCourse (courseId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `/api/courses/${courseId}`,
      contentType: 'application/json',
      dataType: 'json',
      headers: {'Authorization': `Bearer ${jwt.authToken}`},
      crossDomain: true,
      error: function (error) {
        console.log('there was an error enrolling: ', error)
        reject(error)
      },
      success: function (data) {
        console.log('enrolled successfully: ', data)
        resolve(data)
      }
    })
  })
}

