const display = document.querySelector(".calculator__display");
const keyboard = document.querySelector(".calculator__keyboard");

let currentOperator = "";
let currentOperand = "";
let previousOperand = "";

function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  if (x === 0 || y === 0) return 0;
  else return x / y;
}

function clear() {
  currentOperand = "";
  previousOperand = "";
  currentOperator = "";
  updateDisplay();
}

function negative(x, y) {
  if (y) return Math.sign(y) ? -y : +y;
  else return Math.sign(x) ? -x : +x;
}

function percentage(x, y) {
  return x / 100;
}

function operate(operator, x, y) {
  if (operator === "add") return add(x, y);
  if (operator === "subtract") return subtract(x, y);
  if (operator === "multiply") return multiply(x, y);
  if (operator === "divide") return divide(x, y);
  if (operator === "plus-minus") return negative(x, y);
  if (operator === "clear") return clear();
  if (operator === "percentage") return percentage(x, y);
}

function compute() {
  keyboard.addEventListener("click", (e) => {
    const operator = e.target.dataset.key;
    if (Number.isNaN(Number(operator))) {
      if (operator === "clear") {
        operate(operator, previousOperand, currentOperand);
      }
      if (operator === "plus-minus") {
        const result = operate(operator, previousOperand, currentOperand);
        if (result) {
          updateDisplay(result);
          currentOperand = result;
          currentOperator = "";
          previousOperand = "";
        }
      }
      if (operator === "percentage") {
        const result = operate(operator, previousOperand, currentOperand);
        updateDisplay(result);
        currentOperand = result;
        currentOperator = "";
        previousOperand = "";
      }
      if (
        operator === "equals" &&
        currentOperator &&
        currentOperand &&
        previousOperand
      ) {
        let result = operate(
          currentOperator,
          Number(previousOperand),
          Number(currentOperand)
        );

        if (Number(result) === result && result % 1 !== 0) {
          result = result.toFixed(5);
        }

        updateDisplay(result);
        currentOperand = result;
        currentOperator = "";
        previousOperand = "";
      }
    }
  });
}

function getOperator() {
  keyboard.addEventListener("click", (e) => {
    const operator = e.target.dataset.key;
    if (Number.isNaN(Number(operator))) {
      if (operator !== "equals" && operator !== "clear" && operator !== "dot") {
        if (!currentOperator) {
          currentOperator = operator;
          previousOperand = currentOperand;
          currentOperand = "";
        }
      }
    }
  });
}

function getOperand() {
  keyboard.addEventListener("click", (e) => {
    const number = e.target.dataset.key;
    if (Number.isNaN(Number(number)) && number === "dot") {
      if (!String(currentOperand).includes(".") && currentOperand) {
        currentOperand = currentOperand + ".";
        updateDisplay(currentOperand);
      }
    }
    if (!Number.isNaN(Number(number))) {
      currentOperand += number;
      updateDisplay(currentOperand);
    }
  });
}

function updateDisplay(value = 0) {
  display.textContent = value;
}

function init() {
  getOperator();
  getOperand();
  compute();
}

init();
