const jwt = JSON.parse(localStorage.getItem('JWT'))

async function checkForJsonWebToken () {
  if (localStorage.getItem('JWT') !== null) {
    const userData = await getUserData()
    showMemberScreen(userData)
    showMemberNav()
    createAndAppendCourseTileHtml(userData)
    watchSearchClear(userData)
  } else {
    $('.sign-in-log-in').show()
    $('.welcome-message').show()
    watchSearchClear()
    createAndAppendCourseTileHtml()
  }
}

function getCoursesForIndexPage () {
  return new Promise((resolve, reject) => {

    $.ajax({
      type: 'GET',
      url: '/api/courses/',
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      error: function (error) {
        console.log('there was an error: ', error)
      },
      success: function (data) {
        console.log('got some courses: ', data)
        resolve(data)
      }
    })
  })
}

async function showMemberScreen (userData) {
  $('.nav-create').show()
  $('.my-courses').show()

  if (userData.enrolledIn.length === 0)
    $('.my-course-list').text('Not enrolled in any courses yet!')
  else {
    userData.enrolledIn.forEach(async userCourseData => {
      const courseData = await getCourse(userCourseData.courseId)

      $('.my-course-list').append(`
			<div class="course-progress-tile ${courseData.themeColor}-tile">
				<div class="course-progress-title-and-author">
					<div class="course-progress-title"><a href="/course/${
        courseData.courseId
        }">${courseData.courseTitle}</a></div>
					<div class="course-progress-author">by ${courseData.courseAuthor}</div>
				</div>
				<div class="course-progress-bar-and-buttons">
					<div class="course-progress-bar course-progress-bar-index">
						<div class="course-progress-bar-shader" style="background-color: var(--dark-${
        courseData.themeColor
        }); width: ${calculatePercentComplete(courseData, userData)}%;">
							<span class="percent-complete">${calculatePercentComplete(
        courseData, userData
      )}% complete</span>
						</div>
					</div>
					<div class="course-progress-buttons">
						<a href="/course/${
        courseData.courseId
        }"><button class="resume-button"><span>Resume &#x1F4D8</span></button></a>
					</div>
				</div>
			</div>
		`)
    })
  }
}

function createAndAppendCourseTileHtml (userData) {
  $('.course-grid').html('')
  $('.clear-search-results').hide()
  getCoursesForIndexPage().then(courseData => {
    if (userData) {
      const coursesToRender = courseData.filter(course => {
        return !userData.enrolledIn.some(enrolledCourse => {
          return course.courseId === enrolledCourse.courseId
        })
      })

      coursesToRender.forEach(course => {
        $('.course-grid').append(renderCourseTile(course))
      })
    } else {
      courseData.forEach(course => {
        $('.course-grid').append(renderCourseTile(course))
      })
    }
  })
}

function renderCourseTile (courseInfo) {
  return `<div class="course-grid-tile ${courseInfo.themeColor}-tile">
						<div class="course-grid-info-container">
							<a href="/course/${courseInfo.courseId}"><div class="course-grid-tile-title">${
    courseInfo.courseTitle
    }</div></a>
							<div class="course-grid-tile-author">by ${courseInfo.courseAuthor}</div>
						</div>	
						<br>
						<div class="course-grid-enroll-container">
							<button class="course-grid-enroll-button" data-course-id=${courseInfo.courseId}><span>Enroll &#x1F680;</span></button>&nbsp;&nbsp;
						</div>
					</div>`
}

function watchFilters () {
  $('.explore-filter').click(event => {
    let filter = $(event.currentTarget)
      .text()
      .toLowerCase()

    $('.course-grid').html('')
    $('.explore-filters span').removeClass('explore-filter-active')
    $(event.currentTarget).addClass('explore-filter-active')

    getFilteredCourses(filter).then(data => {
      data.forEach(courseInfo => {
        $('.course-grid').append(renderCourseTile(courseInfo))
      })
    })
  })
}

function watchSearch () {
  $('.search-form').submit(event => {
    event.preventDefault()

    $('.course-grid').html('')

    let searchTerm = $(event.currentTarget)
      .find('.search-input')
      .val()
      .trim()

    searchCourses(searchTerm).then(data => {
      $('.clear-search-results').show()
      data.forEach(courseInfo => {
        $('.course-grid').append(renderCourseTile(courseInfo))
      })
    })
  })
}

function watchSearchClear (userData) {
  $('.clear-search-results').click(event => {
    event.preventDefault()

    $('.search-input').val('')
    createAndAppendCourseTileHtml(userData)
  })
}

function searchCourses (searchTerm) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `/api/courses/search/${searchTerm}`,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      error: function (error) {
        console.log('there was an error: ', error)
        reject(error)
      },
      success: function (data) {
        console.log('got some courses: ', data)
        resolve(data)
      }
    })
  })
}

function indexPageEnrollButtonListener () {
  $('.course-grid').on('click', '.course-grid-enroll-button', async event => {
    const clickedCourseId = $(event.currentTarget).data('courseId')
    console.log({clickedCourseId})
    console.log('hello world')

    if (jwt === null) {
      alert('Please log in or create an account first! :D')
    } else {
      await enrollInCourse(clickedCourseId)
      console.log('enrolled!')
      window.location.href = `/course/${clickedCourseId}`
    }
  })
}

function tryDemoListener () {
  $('.try-demo').click(() => {
    // there are 10 demo accounts
    // we pick a random one and then log the user in to try it out
    const randomDemoAccountNumber = Math.floor(Math.random() * 10)
    const demoAccountName = 'demo' + randomDemoAccountNumber + '@demo.com'
    console.log(`logging into ${demoAccountName}`)

    const userData = {
      userEmail: demoAccountName,
      password: 'trydemoaccount'
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
      },
      success: function (data) {
        console.log('succeeded')
        localStorage.setItem('JWT', JSON.stringify(data))
        location.reload()
      }
    })
  })
}

function startApp () {
  checkForJsonWebToken()
  watchSearch()
  watchSignUpButton()
  watchSignUpForm()
  watchLogInButton()
  watchLoginForm()
  closeModal()
  watchFilters()
  indexPageEnrollButtonListener()
  tryDemoListener()
}

$(startApp)
