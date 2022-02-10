/* Selectors */

const zero = document.getElementById("zeroBtn");
const one = document.getElementById("oneBtn");
const two = document.getElementById("twoBtn");
const three = document.getElementById("threeBtn");
const four = document.getElementById("fourBtn");
const five = document.getElementById("fiveBtn");
const six = document.getElementById("sixBtn");
const seven = document.getElementById("sevenBtn");
const eight = document.getElementById("eightBtn");
const nine = document.getElementById("nineBtn");
const addBtn = document.getElementById("addBtn");
const subtractBtn = document.getElementById("subtractBtn");
const multiplyBtn = document.getElementById("multiplyBtn");
const divideBtn = document.getElementById("divideBtn");
const point = document.getElementById("pointBtn");
const equals = document.getElementById("equalsBtn");
const cancel = document.getElementById("cBtn");
const reset = document.getElementById("acBtn");
const display = document.getElementById("display");

/* Basic Operator Functions */

function add(x, y) {
  display.innerText = x + y;
}

function subtract(x, y) {
  display.innerText = x - y;
}

function multiply(x, y) {
  display.innerText = x * y;
}

function divide(x, y) {
  display.innerText = x / y;
}

/* Display */

let displayValue = "";
let displayValue2 = "";
let noDisplay1 = false;
let noDisplay2 = false;
let lastOperation = "";

/* Event Listeners */

const numberBtns = document.getElementsByClassName("nums");
for (let i = 0; i < numberBtns.length; i++) {
  numberBtns[i].addEventListener("click", (e) => {
    if (displayValue === 0) {
      displayValue = "";
      displayValue += e.target.value;
      display.innerText = displayValue;
    } else if (displayValue.length < 9) {
      displayValue += e.target.value;
      display.innerText = displayValue;
    } else if (noDisplay2 && displayValue2.length < 9) {
      displayValue2 += e.target.value;
      display.innerText = displayValue2;
    }
  });
}

const operatorBtns = document.getElementsByClassName("operatorBtns");
for (let i = 0; i < operatorBtns.length; i++) {
  operatorBtns[i].addEventListener("click", (e) => {
    if (displayValue2 === "") {
      noDisplay2 = true;
      lastOperation += e.target.value;
    } else if (e.target.value === "+") {
      add(displayValue, displayValue2);
    } else if (e.target.value === "-") {
      subtract(displayValue, displayValue2);
    } else if (e.target.value === "*") {
      multiply(displayValue, displayValue2);
    } else if (e.target.value === "/") {
      divide(displayValue, displayValue2);
    }
  });
}
function operate() {}
