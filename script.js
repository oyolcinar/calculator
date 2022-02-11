/* Variables */

let firstNumber = "";
let secondNumber = "";
let lastOperation = "";
let load = false;

/* Selectors */

const pointBtn = document.getElementById("pointBtn");
const equals = document.getElementById("equalsBtn");
const cancel = document.getElementById("cBtn");
const acReset = document.getElementById("acBtn");
const display = document.getElementById("display");

/* Basic Operator Functions */

function add(x, y) {
  firstNumber = x + y;
  display.innerText = firstNumber;
}

function subtract(x, y) {
  firstNumber = x - y;
  display.innerText = firstNumber;
}

function multiply(x, y) {
  firstNumber = x * y;
  display.innerText = firstNumber;
}

function divide(x, y) {
  firstNumber = x / y;
  display.innerText = firstNumber;
}

function operate() {
  if (!lastOperation || !secondNumber || !firstNumber) {
    return;
  } else {
    if (lastOperation === "+") {
      add(parseFloat(firstNumber), parseFloat(secondNumber));
      load = false;
      secondNumber = "";
    } else if (lastOperation === "-") {
      subtract(parseFloat(firstNumber), parseFloat(secondNumber));
      load = false;
      secondNumber = "";
    } else if (lastOperation === "*") {
      multiply(parseFloat(firstNumber), parseFloat(secondNumber));
      load = false;
      secondNumber = "";
    } else if (lastOperation === "/") {
      divide(parseFloat(firstNumber), parseFloat(secondNumber));
      load = false;
      secondNumber = "";
    }
  }
}

function reset() {
  firstNumber = "";
  secondNumber = "";
  lastOperation = "";
  load = false;
  display.innerText = 0;
}

function removeLast() {
  if ((display.innerText = firstNumber)) {
    firstNumber = firstNumber.toString().slice(0, -1);
    firstNumber = parseFloat(firstNumber);
    display.innerText = firstNumber;
  } else if ((display.innerText = secondNumber)) {
    secondNumber = secondNumber.toString().slice(0, -1);
    secondNumber = parseFloat(secondNumber);
    display.innerText = secondNumber;
  }
}

function decimal() {
  if ((display.innerText = firstNumber)) {
    firstNumber += ".";
    display.innerText = firstNumber;
  } else if ((display.innerText = secondNumber)) {
    secondNumber += ".";
    display.innerText = secondNumber;
  }
}

/* Event Listeners */

const numberBtns = document.getElementsByClassName("nums");
for (let i = 0; i < numberBtns.length; i++) {
  numberBtns[i].addEventListener("click", (e) => {
    if (firstNumber === 0) {
      firstNumber = "";
      firstNumber += e.target.value;
      display.innerText = firstNumber;
    } else if (!load && firstNumber.length < 9) {
      firstNumber += e.target.value;
      display.innerText = firstNumber;
    } else if (load && secondNumber.length < 9) {
      secondNumber += e.target.value;
      display.innerText = secondNumber;
    } else {
      secondNumber += e.target.value;
      display.innerText = secondNumber;
    }
  });
}

const operatorBtns = document.getElementsByClassName("operatorBtns");
for (let i = 0; i < operatorBtns.length; i++) {
  operatorBtns[i].addEventListener("click", (e) => {
    if (firstNumber === "" && secondNumber === "") {
      return;
    } else if (secondNumber === "") {
      lastOperation = e.target.value;
      load = true;
    } else if (lastOperation) {
      operate();
      lastOperation = e.target.value;
    }
  });
}

equals.addEventListener("click", operate);

pointBtn.addEventListener("click", decimal);

acReset.addEventListener("click", reset);

cancel.addEventListener("click", removeLast);
