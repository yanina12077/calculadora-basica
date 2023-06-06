// Obtiene elementos de la calculadora
const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.keypad-button');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Agrega eventos a los botones
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonPress(button.innerText);
    });
});

// Maneja el clic en un botón
function handleButtonPress(value) {
    if (value === 'C') {
        clearCalculator();
    } else if (value === '=') {
        calculate();
    } else if (value === '%') {
        calculatePercentage();
    } else if (isNumber(value)) {
        appendNumber(value);
    } else {
        setOperation(value);
    }
    updateDisplay();
}

// Limpia la calculadora
function clearCalculator() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

// Realiza cálculos
function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentOperand = result.toString();
    previousOperand = '';
    operation = undefined;
}

// Calcula porcentaje
function calculatePercentage() {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;
    const percentage = current / 100;
    currentOperand = percentage.toString();
}

// Agrega un número al operando actual
function appendNumber(number) {
    currentOperand += number;
}

// Establece la operación actual
function setOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

// Actualiza el display
function updateDisplay() {
    display.textContent = currentOperand;
    if (operation && operation !== '%') {
        display.textContent = `${previousOperand} ${operation} ${currentOperand}`;
    }
}

// Verifica si es un número
function isNumber(value) {
    return !isNaN(value);
}