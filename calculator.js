
let firstNumber = null;
let firstOperator = null;
let seccondNumber = null;
let displayValue = 0;
let result = null;
const errorMsg = 'You cannot divide by Zero!';
const enabledKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', 'Enter', 'Delete', 'Backspace', '.'];

const display = document.querySelector('.display');
const buttons = Array.from(document.querySelectorAll('button'));
const history = document.querySelector('.history');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

display.textContent = displayValue;

// LISTEN FOR PRESSING KEYS ON KEYBOARD, BUT ONLY WHICH FUNCTIONS WITH CALCULATOR
window.addEventListener('keydown', e => {
    let button = document.querySelector(`button[data-key="${e.key}"]`);
    if (!enabledKeys.includes(e.key)) {
        return;
    }
    button.classList.add('active');
    button.click();
});

// CSS LISTENER FOR ANIMATION END
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('active');
  }
// NUMBERS LISTENER FOR A CLICK

numbers.forEach(number => {
    number.addEventListener('click', () => {
        number.classList.add('active');
        if (seccondNumber === null && firstOperator === null) {
            // If the input is '.' > there could be only one period in float number!
            if (number.textContent === '.' && firstNumber !== null && firstNumber.toString().includes(number.textContent)) { 
                return;
            }
            updateFirstNumber(number.textContent);
        } else if (firstOperator !== null) {
            // If the input is '.' > there could be only one period in float number!
            if(number.textContent === '.' && seccondNumber !== null && seccondNumber.includes(number.textContent)) {
                return;
            }
            updateSeccondNumber(number.textContent);
        }
        updateDisplay();
    })
});
// OPERATORS LISTENER FOR A CLICK

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        operator.classList.add('active');
        if (operator.classList.contains('reset')) {
            reset();
            return;
        } else if (operator.classList.contains('del')) {
            removeNumber();
            return;
        }
        if (firstNumber === null) {
            return;
        } else if (seccondNumber !== null) {
            makeHistoryLog(firstNumber, firstOperator, seccondNumber, compute(firstOperator), operator.textContent);
        }
        if(operator.textContent !== '=') firstOperator = operator.textContent;
        updateDisplay();
    })
});

// HELPING FUNCTIONS TO MAKE THE CODE CLEANER
function reset () {
    firstNumber = 0;
    seccondNumber = null;
    firstOperator = null;
    displayValue = 0;
    updateDisplay();
};

function removeNumber () {
    if (!seccondNumber) {
        firstNumber = firstNumber.slice(0,firstNumber.length-1);
    } else {
        seccondNumber = seccondNumber.slice(0,seccondNumber.length-1);
    }
    updateDisplay();
};

function updateFirstNumber (withNumber) {
    if (firstNumber === null || firstNumber === errorMsg) {
        firstNumber  = withNumber;
    } else {
        firstNumber += withNumber;
    }
};
function updateSeccondNumber (withNumber) {
    if (seccondNumber === null) {
        seccondNumber  = withNumber;
    } else {
        seccondNumber += withNumber;
    }
};
function updateDisplay () {
    if (seccondNumber === null && firstOperator === null) {
        displayValue = `${firstNumber}`;
    } else if (seccondNumber === null) {
        displayValue = `${firstNumber} ${firstOperator}`
    } else {
        displayValue = `${firstNumber} ${firstOperator} ${seccondNumber}`;
    }
    display.textContent = displayValue;
};
function compute (operator) {
    let values = [parseFloat(firstNumber), parseFloat(seccondNumber)];
    if (operator === '+') {
        return add(values);
    } else if (operator === '-') {
        return substract(values);
    } else if (operator === 'x') {
        return multiply(values);
    } else if (operator === '/') {
        return divide(values);
    }};
function makeHistoryLog(num1, operator, num2, result, newOperator) {
    const entryLog = document.createElement('p');
    entryLog.textContent = `${num1} ${operator} ${num2} = ${result}`;
    history.appendChild(entryLog);

    firstNumber = result;
    if (newOperator === '=') {
        firstOperator = null;
    } else {
        firstOperator = newOperator;
    };
    seccondNumber = null;
    updateDisplay();
}

function add (numbersArr) {
    return numbersArr[0] + numbersArr[1];
};
function substract (numbersArr) {
    return numbersArr[0] - numbersArr[1];
};
function multiply (numbersArr) {
    return numbersArr[0] * numbersArr[1];
};
function divide (numbersArr) {
    if (numbersArr[0] === 0 || numbersArr[1] === 0) {
        return errorMsg;
    }else {
        return numbersArr[0] / numbersArr[1];
    }
};
