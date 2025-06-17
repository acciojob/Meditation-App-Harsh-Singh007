//your JS code here. If required.
const video = document.getElementById("meditationVideo");
const audio = document.querySelector('.meditation-audio');
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

const beachBtn = document.getElementById("beach");
const rainBtn = document.getElementById("rain");

const timeButtons = {
  "smaller-mins": 120,
  "medium-mins": 300,
  "long-mins": 600
};

let fakeDuration = 600;
let isPlaying = false;

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    countdown();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    video.pause();
    clearInterval(timer);
    playBtn.textContent = "Play";
  }
  isPlaying = !isPlaying;
});

// Sound switching
beachBtn.addEventListener("click", () => {
  switchMedia("Sounds/beach.mp3", "Videos/beach.mp4");
});
rainBtn.addEventListener("click", () => {
  switchMedia("Sounds/rain.mp3", "Videos/rain.mp4");
});

function switchMedia(audioSrc, videoSrc) {
  audio.pause();
  audio.src = audioSrc;
  video.src = videoSrc;
  video.load();
  if (isPlaying) {
    audio.play();
    video.play();
  }
}

// Time select buttons
for (let id in timeButtons) {
  document.getElementById(id).addEventListener("click", () => {
    fakeDuration = timeButtons[id];
    updateDisplay(fakeDuration);
  });
}

// Countdown logic
let timer;
function countdown() {
  let timeLeft = fakeDuration;
  updateDisplay(timeLeft);
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      audio.pause();
      video.pause();
      playBtn.textContent = "Play";
      isPlaying = false;
    }
  }, 1000);
}

function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  timeDisplay.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
}
