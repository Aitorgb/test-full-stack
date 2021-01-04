//Function open tooltip in result page

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip({ html: true });
});

[ ...document.querySelectorAll('.button-result') ].forEach((button) => button.addEventListener('click', activeWindowsResult));

function activeWindowsResult(e) {
	const { name } = e.target;
	const buttonCoach = document.getElementById('coach-button')
	const containerCoach = document.getElementById('coach-result')
	const buttonAssessment = document.getElementById('assessment-button')
	const containerAssessment = document.getElementById('assessment-result')


	if (name === 'assessment') {
		containerCoach.classList.add('none')
		containerAssessment.classList.remove('none')
		buttonAssessment.classList.add('active-button')
		buttonCoach.classList.remove('active-button')
	} else if (name === 'coach') {
		buttonAssessment.classList.remove('active-button')
		buttonCoach.classList.add('active-button')
		containerCoach.classList.remove('none')
		containerAssessment.classList.add('none')
	}
}
