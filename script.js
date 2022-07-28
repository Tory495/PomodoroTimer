class PomodoroTimer {
	constructor() {
		
		this._studyTime = 25;
		this._shortBreakTime = 5;
		this._longBreakTime = 15;
		this._minutes = this._studyTime;
		this._seconds = 0;
		this._flag = true;
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

	get studyTime() {
		return this._studyTime;
	}

	set studyTime(value) {
		if (value > 60) {
			this._studyTime = 60;
		} else if (value < 5) {
			this._studyTime = 5;
		} else {
			this._studyTime = value;
		}
	}

	get shortBreakTime() {
		return this._shortBreakTime;
	}

	set shortBreakTime(value) {
		if (value > 60) {
			this._shortBreakTime = 60;
		} else if (value < 5) {
			this._shortBreakTime = 5;
		} else {
			this._shortBreakTime = value;
		}
	}

	get flag() {
		return this._flag;
	}

	set flag(value) {
		this._flag = value;
	}

	[Symbol.toStringTag] = "PomodoroTimer";

	toString() {
		return `${this._minutes} : ${this._seconds}`
	}
}


let timer = new PomodoroTimer();

let minutesSpan = document.getElementById("minutes");
let secondsSpan = document.getElementById("seconds");

addZero(minutesSpan, "minutes");
addZero(secondsSpan, "seconds");

// TODO: реализовать длинный перерыв
// flag (true = учеба / false = отдых)

function startButtonClick(startButton) {
	// Логика работы таймера
	let intervalId = setInterval(update, 10);
	// Изменение текста и события кнопки старта
	startButton.textContent = "ПАУЗА";
	startButton.onclick = function() {
		pauseButtonClick(this, intervalId);
	};
	// Отключение кнопки "Подтвердить"
	let confirmButton = document.getElementById("confirm-button");
	confirmButton.disabled = true;
	// Включение кнопки "Остановить"
	let stopButton = document.getElementById("stop-button");
	stopButton.disabled = false;
	stopButton.onclick = function() {
		stopButtonClick(this, intervalId, startButton, confirmButton);
	};

}


function update() {
	if (timer.seconds === 0 && timer.minutes === 0) {
		timer.flag = !timer.flag;
		let container = document.getElementsByClassName("container")[0];
		let sound = new Audio("bell.wav");
		if (timer.flag) {
			container.style.background = 'tomato';
			timer.minutes = timer.studyTime;
		} else {
			container.style.background = 'lightgreen';
			timer.minutes = timer.shortBreakTime;
		}	
		sound.play();
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

function pauseButtonClick(button, intervalId) {
	clearInterval(intervalId);
	button.textContent = "ПРОДОЛЖИТЬ";
	button.onclick = function () {
		startButtonClick(this);
	};
}

function stopButtonClick(button, intervalId, startButton, confirmButton) {
	clearInterval(intervalId);
	button.disabled = true;
	confirmButton.disabled = false;
	startButton.textContent = "ЗАПУСТИТЬ";
	startButton.onclick = function() {
		startButtonClick(this);
	};
	timer.minutes = timer.studyTime;
	timer.flag = true;
	timer.seconds = 0;

	addZero(minutesSpan, "minutes");
	addZero(secondsSpan, "seconds");
}

function validateNumber(input) {
	if (input.value.toUpperCase() !== input.value.toLowerCase()) {
		input.value = "";
	}
	if (parseInt(input.value) >= 60) {
		input.value = 59;
	} else if (parseInt(input.value) < 5) {
		input.value = 5;
	}
}

function confirmButtonClick() {
	let studyTime = document.getElementById("study-time").value;
	let shortBreakTime = document.getElementById("short-break-time").value;
	let longBreakTime = document.getElementById("long-break-time").value;
	if (!studyTime || !shortBreakTime || !longBreakTime) {
		alert("Заполните время");
		return undefined;
	}
	if (timer.flag && studyTime) {
		minutesSpan.textContent = studyTime;
		timer.studyTime = studyTime;
		timer.minutes = timer.studyTime;
	}
	if (shortBreakTime) {
		timer.shortBreakTime = shortBreakTime;
	}
	addZero(minutesSpan, "minutes");
}