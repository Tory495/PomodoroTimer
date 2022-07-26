class PomodoroTimer {
	constructor(minutes, seconds) {
		this._minutes = minutes;
		this._seconds = seconds;
	}

	get minutes() {
		return this._minutes;
	}

	set minutes(value) {
		if (value >= 60) {
			this._minutes = 0;
		} else {
			this._minutes = value;
		}
	}

	get seconds() {
		return this._seconds;
	}

	set seconds(value) {
		if (value >= 60) {
			this._seconds = 0;
		} else if (value < 0) {
			this._seconds = 59;
		} else {
			this._seconds = value;
		}
	}

	[Symbol.toStringTag] = "PomodoroTimer";

	toString() {
		return `${this._minutes} : ${this._seconds}`
	}
}

let workTime = 25;
let shortBreakTime = 5;
let longBreakTime = 40;
let timer = new PomodoroTimer(workTime, 0);
let startButton = document.getElementById("start-button");
startButton.onclick = startButtonClick;
// flag (true = работа / false = отдых)
let flag = true;


function startButtonClick() {

	let intervalId = setInterval(update, 10);
	this.textContent = "ОСТАНОВИТЬ";
	this.onclick = function() {
		stop(this, intervalId);
	};
}


function update() {
	let minutesSpan = document.getElementById("minutes");
	let secondsSpan = document.getElementById("seconds");
	if (timer.seconds === 0 && timer.minutes === 0) {
		flag = !flag;
		let container = document.getElementsByClassName("container")[0];
		if (!flag) {
			container.style.background = 'lightgreen';
			timer.minutes = shortBreakTime;
		} else {
			container.style.background = 'tomato';
			timer.minutes = workTime;
		}	
	}
	if (timer.seconds === 0) {
		timer.minutes--;
	}

	timer.seconds--;

	addZero(minutesSpan, "minutes");
	addZero(secondsSpan, "seconds");
}

function addZero(span, value) {
	if (timer[value] < 10) {
		span.textContent = "0" + timer[value];
	} else {
		span.textContent = timer[value];
	}
}

function stop(button, intervalId) {
	clearInterval(intervalId);
	button.textContent = "ПРОДОЛЖИТЬ";
	button.onclick = startButtonClick;
}

// TODO: сделать валидацию вводимых цифр в инпутах
function validateNumbers() {

}

function confirmButtonClick() {
	workTime = document.getElementById("work-time").value;
	shortBreakTime = document.getElementById("short-break-time").value;
	longBreakTime = document.getElementById("long-break-time").value;
	// TODO: сделать правильную логику смены времени (блокировать кнопку подтвердить)
	// на время работы таймера (пока он не остановлен без продолжения)
	let minutesSpan = document.getElementById("minutes");
	if (flag) {
		minutesSpan.textContent = workTime;
		timer.minutes = workTime;

	}
	addZero(minutesSpan, "minutes");
}