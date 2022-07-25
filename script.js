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
	let intervalId = setInterval(update, 1000);
	startButton.textContent = "ОСТАНОВИСЬ";
	// TODO: Переделать эту дичь
	startButton.onclick = () => {
		clearInterval(intervalId);
		startButton.textContent = "ПРОДОЛЖАЕМ";
		startButton.onclick = start;
	};
}

function update() {
	let minutesSpan = document.getElementById("minutes");
	let secondsSpan = document.getElementById("seconds");

	timer.seconds += 1;

	if (timer.seconds < 10) {
		secondsSpan.textContent = "0" + timer.seconds;
	} else {
		secondsSpan.textContent = timer.seconds;
	}

	if (timer.minutes < 10) {
		minutesSpan.textContent = "0" + timer.minutes;
	} else {
		minutesSpan.textContent = timer.minutes;
	}
}

function stop(intervalId) {
	clearInterval(intervalId);
}