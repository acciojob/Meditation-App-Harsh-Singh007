const app = document.querySelector(".app");
const video = document.querySelector(".bg-video");
const audio = document.querySelector(".meditation-audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

const beachBtn = document.getElementById("beach");
const rainBtn = document.getElementById("rain");

const smallBtn = document.getElementById("smaller-mins");
const mediumBtn = document.getElementById("medium-mins");
const longBtn = document.getElementById("long-mins");

let fakeDuration = 600; // default 10 minutes
let timer;
let isPlaying = false;

// Update time display
function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  timeDisplay.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Start countdown
function startCountdown() {
  let timeLeft = fakeDuration;
  updateDisplay(timeLeft);

  clearInterval(timer); // stop existing timers

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      video.pause();
      audio.pause();
      playBtn.textContent = "Play";
      isPlaying = false;
    }
  }, 1000);
}

// Play/Pause logic
playBtn.addEventListener("click", async () => {
  if (!isPlaying) {
    audio.muted = false;
    await audio.play();
    video.play();
    startCountdown();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    video.pause();
    clearInterval(timer);
    playBtn.textContent = "Play";
  }
  isPlaying = !isPlaying;
});

// Sound switch
beachBtn.addEventListener("click", () => {
  audio.src = "Sounds/beach.mp3";
  video.src = "Videos/beach.mp4";
  resetPlayback();
});

rainBtn.addEventListener("click", () => {
  audio.src = "Sounds/rain.mp3";
  video.src = "Videos/rain.mp4";
  resetPlayback();
});

// Time selection
smallBtn.addEventListener("click", () => {
  fakeDuration = 120;
  resetPlayback();
  updateDisplay(fakeDuration);
});
mediumBtn.addEventListener("click", () => {
  fakeDuration = 300;
  resetPlayback();
  updateDisplay(fakeDuration);
});
longBtn.addEventListener("click", () => {
  fakeDuration = 600;
  resetPlayback();
  updateDisplay(fakeDuration);
});

function resetPlayback() {
  clearInterval(timer);
  audio.pause();
  video.pause();
  isPlaying = false;
  playBtn.textContent = "Play";
}
