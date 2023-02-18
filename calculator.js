
let firstNumber = null;
let firstOperator = null;
let seccondNumber = null;
let seccondOperator = null;
let displayValue = 0;

const display = document.querySelector('.display');
const buttons = Array.from(document.querySelectorAll('button'));

display.textContent = displayValue;
window.addEventListener('keydown', e => {
            let button = document.querySelector(`button[data-key="${e.keyCode}"]`)
            button.classList.add('active');
        }
);
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('active');
  }

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', e => {
        if (seccondNumber === null && firstOperator === null) {
            updateFirstNumber(e.target.textContent);
        } else if (firstOperator !== null) {
            updateSeccondNumber(e.target.textContent);
        }
        updateDisplay();
        return;
    })
});

function updateFirstNumber (withNumber) {
    if (firstNumber === null) {
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
}

function addiction (num1, num2) {
    field.textContent = num1 + num2;
};
function substraction (num1, num2) {
    field.textContent = num1 - num2;
};
function multiplication (num1, num2) {
    field.textContent = num1 * num2;
};
function division (num1, num2) {
    field.textContent = num1 / num2;
};
