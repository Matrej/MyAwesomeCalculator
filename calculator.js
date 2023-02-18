
let firstNumber = null;
let firstOperator = null;
let seccondNumber = null;
let displayValue = 0;

const display = document.querySelector('.display');
const buttons = Array.from(document.querySelectorAll('button'));

display.textContent = displayValue;
window.addEventListener('keydown', e => {
            let button = document.querySelector(`button[data-key="${e.key}"]`);
            // if (e.key !== button.data) {
                
            // }
            button.classList.add('active');
            button.click();
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
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', e => {
        if (firstNumber === null) {
            return;
        } if (seccondNumber !== null) {
            compute(firstOperator, e.target.textContent);
        }
        if(e.target.textContent !== '=') firstOperator = e.target.textContent;
        updateDisplay();
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
};
function compute (operator, newOperator) {
    let values = [parseInt(firstNumber), parseInt(seccondNumber)];
    if (operator === '+') {
        firstNumber = addiction(values);
    } else if (operator === '-') {
        firstNumber = substraction(values);
    } else if (operator === 'x') {
        firstNumber = multiplication(values);
    } else if (operator === '/') {
        firstNumber = division(values);
    }
    //function about adding new history addiction will be here
    
    if (newOperator === '=') {
        // console.log(newOperator);
        firstOperator = null;
    } else {
        firstOperator = newOperator;
        console.log(newOperator);
    };
    seccondNumber = null;
    updateDisplay();
}

function addiction (numbersArr) {
    return numbersArr[0] + numbersArr[1];
};
function substraction (numbersArr) {
    return numbersArr[0] - numbersArr[1];
};
function multiplication (numbersArr) {
    return numbersArr[0] * numbersArr[1];
};
function division (numbersArr) {
    return numbersArr[0] / numbersArr[1];
};
