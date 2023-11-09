const minutesInput = document.getElementById('minutesInput');
const minutesDisplay = document.getElementById('minutesDisplay');
const secondsDisplay = document.getElementById('secondsDisplay');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const pauseButton = document.getElementById('pauseButton');

let countdownTimer;
let isPaused = false;

const startCountdown = () => {
  const minutes = parseInt(minutesInput.value);

  if (minutes < 1 || isNaN(minutes)) {
    alert('Please enter a valid number of minutes');
    return;
  }

  if (countdownTimer) {
    clearInterval(countdownTimer);
  }

  const startTime = new Date().getTime();
  const endTime = startTime + (minutes * 60 * 1000);

  countdownTimer = setInterval(() => {
    if (!isPaused) {
      const currentTime = new Date().getTime();
      const remainingTime = endTime - currentTime;

      const minutesLeft = Math.floor(remainingTime / (60 * 1000));
      const secondsLeft = Math.floor((remainingTime % (60 * 1000)) / 1000);

      minutesDisplay.textContent = minutesLeft.toString().padStart(2, '0');
      secondsDisplay.textContent = secondsLeft.toString().padStart(2, '0');

      if (remainingTime <= 0) {
        clearInterval(countdownTimer);
        minutesDisplay.textContent = '00';
        secondsDisplay.textContent = '00';
        alert('Time is up!');
      }
    }
  }, 1000);
};

pauseButton.addEventListener('click', () => {
  if (countdownTimer) {
    isPaused = !isPaused;
    const buttonText = isPaused ? 'Resume' : 'Pause';
    pauseButton.textContent = buttonText;
  }
});

startButton.addEventListener('click', startCountdown);

resetButton.addEventListener('click', () => {
  clearInterval(countdownTimer);
  isPaused = false;
  pauseButton.textContent = 'Pause';
  minutesInput.value = '';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
});

minutesInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    startCountdown();
  } else if (event.key === 'Escape') {
    clearInterval(countdownTimer);
    isPaused = false;
    pauseButton.textContent = 'Pause';
    minutesInput.value = '';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
  }
});
