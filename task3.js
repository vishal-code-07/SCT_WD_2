let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);

  display.textContent =
    `${hrs.toString().padStart(2, '0')}:` +
    `${mins.toString().padStart(2, '0')}:` +
    `${secs.toString().padStart(2, '0')}`;
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 1000);
    startStopBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const time = display.textContent;
    const lap = document.createElement("p");
    lap.textContent = `Lap ${laps.children.length + 1}: ${time}`;
    laps.prepend(lap);
  }
});
