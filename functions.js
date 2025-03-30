/**
 * Validates user input from both number fields
 * @returns {false|{num1: number, num2: number}} Returns false if invalid, or object with parsed numbers
 */

/**
 * Core Functions
 * These functions handle the main calculator operations
 */

function validateInputs() {
    const num1 = document.getElementById('oneBox').value;
    const num2 = document.getElementById('twoBox').value;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
        alert('Please enter valid numbers');
        return false;
    }
    return {
        num1: parseFloat(num1),
        num2: parseFloat(num2)
    };
}

/**
 * Updates the result display and adds the calculation to history
 * @param {string} operation - Mathematical operator symbol
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {number} result - Result of the calculation
 */
function updateResult(operation, num1, num2, result) {
    const para = document.getElementById('para');
    const history = document.getElementById('history');
    para.textContent = `= ${result}`;
    history.innerHTML = `<p>${num1} ${operation} ${num2} = ${result}</p>` + history.innerHTML;
}

/**
 * Mathematical Operations
 * Each function validates inputs before performing calculation
 */

// Basic arithmetic operations
function add() {
    const vals = validateInputs();
    if (vals) updateResult('+', vals.num1, vals.num2, vals.num1 + vals.num2);
}

function sub() {
    const vals = validateInputs();
    if (vals) updateResult('-', vals.num1, vals.num2, vals.num1 - vals.num2);
}

function mul() {
    const vals = validateInputs();
    if (vals) updateResult('×', vals.num1, vals.num2, vals.num1 * vals.num2);
}

/**
 * Performs division and includes divide by zero check
 */
function div() {
    const vals = validateInputs();
    if (vals) {
        if (vals.num2 === 0) {
            alert('Cannot divide by zero');
            return;
        }
        updateResult('÷', vals.num1, vals.num2, vals.num1 / vals.num2);
    }
}

/**
 * Calculates num1 raised to the power of num2
 */
function pow() {
    const vals = validateInputs();
    if (vals) updateResult('^', vals.num1, vals.num2, Math.pow(vals.num1, vals.num2));
}

/**
 * UI Management
 * Functions for managing the calculator interface
 */

function clearFields() {
    document.getElementById('oneBox').value = '';
    document.getElementById('twoBox').value = '';
    document.getElementById('para').textContent = '=';
    document.getElementById('history').innerHTML = '';
}

/**
 * Event Listeners
 * Handle keyboard shortcuts and input validation
 */

// Keyboard shortcuts for calculator operations
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') add();
    if (e.key === '-') sub();
    if (e.key === '*') mul();
    if (e.key === '/') div();
    if (e.key === '^') pow();
    if (e.key === 'Escape') clearFields();
});

/**
 * Initialization
 * Setup code that runs when the page loads
 */

// Initialize event listeners when DOM is ready
document.addEventListener("DOMContentLoaded", setup);

/**
 * Sets up initial event listeners
 */
function setup() {
    var oneBox = document.forms[0];
    document.forms[0].addEventListener("keypress", isValid);
}

/**
 * Validates keypress input
 * @param {KeyboardEvent} x - The keyboard event
 */
function isValid(x) {
    var num = "0123456789";
    console.log(num);
    console.log(x.key);
    console.log(document.forms[0].elements[0]);
}
