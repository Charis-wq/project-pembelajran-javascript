//get the HTML element
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const countdownElement = document.getElementById('countdown');

const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
const startButton = document.getElementById('button');

//variabel countdown inteerval
let countdownInterval;

//function to start time into second
function startTimer(){
    let hours = parseInt(inputHours.value) || 0;
    let minutes = parseInt(inputMinutes.value) || 0;
    let seconds = parseInt(inputSeconds.value) || 0;

    //convert total time into seconds
    let totalTimeSeconds = hours * 3600 + minutes * 60 + seconds;

    //if for stop the function
    if(totalTimeSeconds <= 0){
        alert('Please Enter a Valid Time')
        return

    }

    //clear the input after the timer display every seconds
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';

    
    //function to update the time display every seconds
    countdownInterval = setInterval(() => {
        // //calculate remaining days, minutes and seconds
        const days = Math.floor(totalTimeSeconds / 86400);
        const hours = Math.floor((totalTimeSeconds % 86400) / 3600);
        const minutes = Math.floor((totalTimeSeconds % 86400) / 60);
        const seconds = Math.floor((totalTimeSeconds % 60));

        //update the HTML element for display
        daysElement.textContent = days.toString().padStart(2,'0');
        hoursElement.textContent = hours.toString().padStart(2,'0');
        minutesElement.textContent = minutes.toString().padStart(2,'0');
        secondsElement.textContent = seconds.toString().padStart(2,'0');

         //decrease the total time by one seconds
         totalTimeSeconds--

         //stop the timer if time runs out
         if(totalTimeSeconds < 0 ){
            clearInterval(countdownInterval)
            alert('Time is up')
         }
    },1000//miliseconda
)
}

//add eventLiitener for the start button
startButton.addEventListener('click', () => {
    //stop any timer
    clearInterval(countdownInterval);
    //start timer
    startTimer();

})