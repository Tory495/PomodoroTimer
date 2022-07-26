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
			this._minutes += 1;
		} else {
			this._seconds = value;
		}
	}

	[Symbol.toStringTag] = "PomodoroTimer";

	toString() {
		return `${this._minutes} : ${this._seconds}`
	}
}

let timer = new PomodoroTimer(0, 0);
let startButton = document.getElementById("start-button");

startButton.onclick = start;

function start() {
	let intervalId = setInterval(update, 10);
	startButton.textContent = "ОСТАНОВИТЬ";
	// TODO: Переделать эту дичь
	startButton.onclick = function() {
		stop(this, intervalId);
	};
}


function update() {
	let minutesSpan = document.getElementById("minutes");
	let secondsSpan = document.getElementById("seconds");
	
	timer.seconds += 1;
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
	button.onclick = start;
}