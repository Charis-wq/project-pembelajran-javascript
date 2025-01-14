//Generate random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

//get element by HTML
const guestInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

//function to check guess input
function checkGuess(){
    const userGuess = Number(guestInput.value)
    //after check use guess, attempts ++
    attempts++

    if(userGuess === randomNumber){
        message.textContent = `Congratulations! You Guess the Numbers 
        ${randomNumber} correctly in${attempts} attempts`
        message.style.color = '#00FC1E'
        endGame()
    }else if(userGuess > randomNumber){
        message.textContent = 'To Hight! Try Again'
        message.style.color = '#FC0000'
    }else if(userGuess < randomNumber){
        message.textContent = 'To Low! Try Again'
        message.style.color = '#FC0000'
    }else{
        guestInput = ''
        guestInput.focus()
    }
}; 

//function to end for the game
function endGame(){
    guestInput.disabled = true
    guessButton.disabled = true
    restartButton.style.display = 'inline'
};

//function to reset for the game
function resetGame(){
    randomNumber = Math.floor(Math.random() * 100) + 1
    attempts = 0
    guestInput.disabled = false
    guessButton.disabled = false
    message.textContent = 'Good Luck Start Guessing...'
    message.style.color = '#333333'
    restartButton.style.display = 'none'
    guestInput.focus()

};

//addevent listener to button and input
guessButton.addEventListener('click', checkGuess);

restartButton.addEventListener('click', resetGame);

guestInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        checkGuess()
    }
});
