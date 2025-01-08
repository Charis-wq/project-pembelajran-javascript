const calculator ={
    displayValue : '0',
    firstOperand : null,
    waitingForSecondOperand : false,
    operator : null,
};

//function to update display
function updateDisplay(){
    const display = document.querySelector('.calculator-display');
    display.value = calculator.displayValue;
}
console.log(updateDisplay.value)
//function to input digit 
function inputDigit(digit){
    const  {displayValue, waitingForSecondOperand} = calculator;

    if(waitingForSecondOperand){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else{
        calculator.displayValue = displayValue ==='0'? digit : displayValue + digit;

    }
    updateDisplay()
}

//function to input decimal 
function inputDecimal(dot){
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
    updateDisplay()
}

//function to handle operator
function handleOPerator(nextOpertor){
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand){
        calculator.operator =nextOpertor
        return
    }

    if(firstOperand === null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue;

    } else if (operator){
        const result = calculate(firstOperand, inputValue, operator);
        calculator.inputValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;

    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOpertor;
    updateDisplay()
}

//function to calculate
function calculate(firstOperand, inputValue, operator){
    if(operator === '+'){
        return firstOperand + inputValue;
    }else if(operator === '-'){
        return firstOperand - inputValue;
    }else if(operator === '*'){
        return firstOperand * inputValue;
    }else if(operator === '/'){
        return firstOperand / inputValue;
    }else if(operator === '√'){
        return Math.sqrt(firstOperand);
    }else if(operator === '%'){
        return firstOperand / 100;
    }
    console.error(`it's not Operator ${operator}`)
    return null
}

//function to handel equal
function handleEqual(){
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && !calculator.waitingForSecondOperand){
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
        calculator.operator = null;
        calculator.waitingForSecondOperand = false;
        updateDisplay()
    }
}

//function to reset calculator
function resetCalculator(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    updateDisplay()
}

//add event listener to button
document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const { target } = event;
    if(!target.matches('button')){
        return
    }
    if(target.classList.contains('operator')){
        handleOPerator(target.value)
        return
    }
    if(target.classList.contains('decimal')){
        inputDecimal(target.value)
        return
    }
    if(target.classList.contains('all-clear')){
        resetCalculator(target.value)
        return
    }
    if(target.classList.contains('equal-sign')){
        handleEqual(target.value)
        return
    }
    
    inputDigit(target.value)
})
       
    