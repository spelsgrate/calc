/**
 * Validates user input from both number fields
 * @returns {false|{num1: number, num2: number}} Returns false if invalid, or object with parsed numbers
 */

/**
 * Core Functions
 * These functions handle the main calculator operations
 */

function validateInputs(singleInput = false) {
    const num1 = document.getElementById('oneBox').value;
    const num2 = singleInput ? null : document.getElementById('twoBox').value;
    
    if (!num1 || (!singleInput && !num2)) {
        alert('Please enter valid numbers');
        return false;
    }
    
    return {
        num1: parseFloat(num1),
        num2: singleInput ? null : parseFloat(num2)
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
 * Calculates square root of num1
 */
function sqrt() {
    const vals = validateInputs(true);
    if (vals) {
        if (vals.num1 < 0) {
            alert('Cannot calculate square root of negative number');
            return;
        }
        updateResult('√', vals.num1, '', Math.sqrt(vals.num1));
    }
}

/**
 * Calculates percentage of num1 and num2
 */
function percent() {
    const vals = validateInputs();
    if (vals) updateResult('%', vals.num1, vals.num2, (vals.num1 * vals.num2) / 100);
}

/**
 * Negates num1
 */
function negate() {
    const vals = validateInputs(true);
    if (vals) updateResult('negate', vals.num1, '', -vals.num1);
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
    if (e.key === '%') percent();
    if (e.key === 'r') sqrt();
    if (e.key === 'n') negate();
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
    const validChars = "0123456789.-";
    if (!validChars.includes(x.key)) {
        x.preventDefault();
    }
    
    // Prevent multiple decimal points
    if (x.key === '.' && x.target.value.includes('.')) {
        x.preventDefault();
    }
    
    // Prevent multiple minus signs
    if (x.key === '-' && x.target.value.includes('-')) {
        x.preventDefault();
    }
}

/**
 * Graphing Calculator Functions
 */
let scale = 20; // pixels per unit
let offsetX = 0;
let offsetY = 0;

function initGraph() {
    const canvas = document.getElementById('graphCanvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    drawGrid(ctx);
}

function drawGrid(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw minor grid lines
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = centerX % scale; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = centerY % scale; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels
    for (let x = -Math.floor(width/(2*scale)); x <= width/(2*scale); x++) {
        if (x === 0) continue;
        const px = centerX + x * scale;
        ctx.fillText(x, px, centerY + 20);
    }
    
    // Y-axis labels
    ctx.textAlign = 'right';
    for (let y = -Math.floor(height/(2*scale)); y <= height/(2*scale); y++) {
        if (y === 0) continue;
        const py = centerY - y * scale;
        ctx.fillText(y, centerX - 5, py + 4);
    }
}

function evaluateExpression(expression, x) {
    // Create a safer math context
    const mathContext = {
        x: x,
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        sqrt: Math.sqrt,
        abs: Math.abs,
        pi: Math.PI,
        e: Math.E,
        pow: Math.pow
    };
    
    // Replace common mathematical notations
    const safeExp = expression
        .replace(/\^/g, '**')
        .replace(/pi/g, 'pi')
        .replace(/([0-9])x/g, '$1*x')  // Convert implicit multiplication (2x -> 2*x)
        .replace(/\b(?:sin|cos|tan|sqrt|abs)\b/g, match => match); // Keep math functions
    
    try {
        return Function(...Object.keys(mathContext), `"use strict"; return ${safeExp};`)
            (...Object.values(mathContext));
    } catch (e) {
        throw new Error('Invalid expression');
    }
}

function plotFunction() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const func = document.getElementById('functionInput').value;
    
    if (!func) {
        alert('Please enter a function');
        return;
    }
    
    drawGrid(ctx);
    
    try {
        ctx.beginPath();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;
        let lastY = null;
        
        // Plot with higher resolution
        for (let px = 0; px < width; px += 0.5) {
            const x = (px - width/2) / scale;
            try {
                const y = -evaluateExpression(func, x) * scale + centerY;
                
                // Handle discontinuities and keep plot within canvas
                if (isFinite(y) && y >= -1000 && y <= height + 1000) {
                    if (lastY === null || Math.abs(y - lastY) > height/2) {
                        ctx.moveTo(px, y);
                    } else {
                        ctx.lineTo(px, y);
                    }
                    lastY = y;
                } else {
                    lastY = null;
                }
            } catch (e) {
                lastY = null;
            }
        }
        ctx.stroke();
    } catch (e) {
        alert('Invalid function! Examples:\nx^2\nsin(x)\n2*x+1');
    }
}

function zoomIn() {
    scale *= 1.2;
    plotFunction();
}

function zoomOut() {
    scale /= 1.2;
    plotFunction();
}

function resetView() {
    scale = 20;
    plotFunction();
}

function clearGraph() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    drawGrid(ctx);
}

// Add to existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    setup();
    initGraph();
});
