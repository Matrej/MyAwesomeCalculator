const field = document.querySelector('.inputField');
const numbers = document.querySelectorAll('.number');


numbers.forEach((number) => {
    number.addEventListener('click', e => enterNumber(e));
})

function enterNumber (num) {
    field.textContent += num.target.textContent;
}