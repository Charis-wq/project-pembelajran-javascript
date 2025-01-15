//Get element for HTML
const textTypeElement = document.getElementById('text-to-type');
const userInput = document.getElementById('user-input');
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('words-per-minute');

//variabel to text random
const textSamples = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "JavaScript is a versatile programming language.",
  "Success comes to those who work hard.",
  "Never stop learning and growing your skills."
];


let textToType = [];
let startTime;
let timerInterval;

//Function to start test
function startTest() {
  // Select a random text sample
  const randomIndex = Math.floor(Math.random() * textSamples.length);
  textToType = textSamples[randomIndex].split(' ');

  textTypeElement.innerHTML = textToType.map(word => `<span>${word}</span>`).join(' ');

  userInput.value = '';
  userInput.disabled = false;
  userInput.focus();
  timeDisplay.textContent = '0';
  wpmDisplay.textContent = '0';

  startTime = new Date();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

//Function to update timer
function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  timeDisplay.textContent = elapsedTime;
}

//Funtion to calculate WPM
function calculateWPM() {
  const wordsTyped = userInput.value.trim().split(/\s+/).filter(Boolean).length;
  const elapsedTime = Math.floor((new Date() - startTime) / 1000);
  const minutes = elapsedTime / 60;
  const wpm = minutes > 0 ? Math.floor(wordsTyped / minutes) : 0;
  wpmDisplay.textContent = wpm;
}

//Funtion to check input
function checkInput() {
  const typedText = userInput.value.trim().split(' ');
  const spans = textTypeElement.querySelectorAll('span');

  typedText.forEach((word, index) => {
    if (spans[index]) {
      spans[index].className = word === textToType[index] ? 'correct' : 'incorrect';
    }
  });

  for (let i = typedText.length; i < spans.length; i++) {
    spans[i].className = '';
  }
}

//Function to stop test
function stopTest() {
  clearInterval(timerInterval);
  calculateWPM();
  userInput.disabled = true;
  alert('Test completed!');
}

//addevent listener to button and input
startButton.addEventListener('click', () => {
  startTest();
});

userInput.addEventListener('input', () => {
  checkInput();
  const typedText = userInput.value.trim();
  if (typedText === textToType.join(' ')) {
    stopTest();
  }
});