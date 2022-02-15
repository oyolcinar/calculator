/* Variables */

let firstNumber = "";
let secondNumber = "";
let lastOperation = "";
let load = false;
let disableDecimal1 = false;
let disableDecimal2 = false;

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
      disableDecimal2 = false;
      load = false;
      secondNumber = "";
    } else if (lastOperation === "-") {
      subtract(parseFloat(firstNumber), parseFloat(secondNumber));
      disableDecimal2 = false;
      load = false;
      secondNumber = "";
    } else if (lastOperation === "*") {
      multiply(parseFloat(firstNumber), parseFloat(secondNumber));
      disableDecimal2 = false;
      load = false;
      secondNumber = "";
    } else if (lastOperation === "/") {
      divide(parseFloat(firstNumber), parseFloat(secondNumber));
      disableDecimal2 = false;
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
  disableDecimal1 = false;
  disableDecimal2 = false;
  display.innerText = 0;
}

function removeLast() {
  if (!load) {
    firstNumber = firstNumber.toString().slice(0, -1);
    firstNumber === "" || firstNumber === "-"
      ? (display.innerText = 0)
      : (display.innerText = firstNumber);
  } else if (load) {
    secondNumber = secondNumber.toString().slice(0, -1);
    secondNumber === "" || secondNumber === "-"
      ? (display.innerText = 0)
      : (display.innerText = secondNumber);
  }
}

function decimal() {
  if (!load && !disableDecimal1 && firstNumber) {
    disableDecimal1 = true;
    firstNumber += ".";
    display.innerText = firstNumber;
  } else if (load && !disableDecimal2 && secondNumber) {
    disableDecimal2 = true;
    secondNumber += ".";
    display.innerText = secondNumber;
  } else if (!load && !disableDecimal1 && !firstNumber) {
    disableDecimal1 = true;
    firstNumber += "0.";
    display.innerText = firstNumber;
  } else if (load && !disableDecimal2 && !secondNumber) {
    disableDecimal2 = true;
    secondNumber += "0.";
    display.innerText = secondNumber;
  } else if (
    !load &&
    disableDecimal1 &&
    firstNumber &&
    !secondNumber &&
    !disableDecimal2
  ) {
    disableDecimal2 = true;
    secondNumber += "0.";
    display.innerText = secondNumber;
  } else if (
    !load &&
    disableDecimal1 &&
    firstNumber &&
    secondNumber &&
    !disableDecimal2
  ) {
    disableDecimal2 = true;
    secondNumber += ".";
    display.innerText = secondNumber;
  }
}

/* Event Listeners */

const numberBtns = document.getElementsByClassName("nums");
for (let i = 0; i < numberBtns.length; i++) {
  numberBtns[i].addEventListener("click", (e) => {
    if (!load && firstNumber.length < 10) {
      firstNumber += e.target.value;
      display.innerText = firstNumber;
    } else if (load && secondNumber.length < 10) {
      secondNumber += e.target.value;
      display.innerText = secondNumber;
    } else if (lastOperation && secondNumber.length < 10) {
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
