/* Variables */

let firstNumber = "";
let secondNumber = "";
let lastOperation = "";
let load = false;
let disableDecimal1 = false;
let disableDecimal2 = false;
let songOn = false;
let song = new Audio("./sounds/blackholesun8bit.mp3");

/* Selectors */

const pointBtn = document.getElementById("pointBtn");
const equals = document.getElementById("equalsBtn");
const cancel = document.getElementById("cBtn");
const acReset = document.getElementById("acBtn");
const display = document.getElementById("display");

/* Basic Operator Functions */

function add(x, y) {
  firstNumber = x + y;
  firstNumber = firstNumber.toString();
  let answer = firstNumber.slice(0, 10);
  if (firstNumber.length >= 10) {
    let remainingDigits = firstNumber.toString().length - answer.length + 3;
    display.innerText = `${answer.slice(0, 7)} e${remainingDigits}`;
  } else {
    display.innerText = answer;
  }
}

function subtract(x, y) {
  firstNumber = x - y;
  firstNumber = firstNumber.toString();
  let answer = firstNumber.slice(0, 10);
  if (firstNumber.length >= 10) {
    let remainingDigits = firstNumber.toString().length - answer.length + 3;
    display.innerText = `${answer.slice(0, 7)} e${remainingDigits}`;
  } else {
    display.innerText = answer;
  }
}

function multiply(x, y) {
  firstNumber = x * y;
  firstNumber = firstNumber.toString();
  let answer = firstNumber.slice(0, 10);
  if (firstNumber.length >= 10) {
    let remainingDigits = firstNumber.toString().length - answer.length + 3;
    display.innerText = `${answer.slice(0, 7)} e${remainingDigits}`;
  } else {
    display.innerText = answer;
  }
}

function divide(x, y) {
  if (y === 0) {
    display.innerText = "BLACK HOLE SUN";
    blackHoleSun();
  } else {
    firstNumber = x / y;
    firstNumber = firstNumber.toString();
    let answer = firstNumber.slice(0, 10);
    if (firstNumber.length >= 10) {
      let remainingDigits = firstNumber.toString().length - answer.length + 3;
      display.innerText = `${answer.slice(0, 7)} e${remainingDigits}`;
    } else {
      display.innerText = answer;
    }
  }
}

/* Not So Basic Operator Functions */

function operate() {
  pauseBlackHoleSun();
  playSound();
  if (!lastOperation || !secondNumber || !firstNumber) return;

  if (lastOperation === "+") {
    add(parseFloat(firstNumber), parseFloat(secondNumber));
    disableDecimal2 = false;
    load = false;
    secondNumber = "";
  }
  if (lastOperation === "-") {
    subtract(parseFloat(firstNumber), parseFloat(secondNumber));
    disableDecimal2 = false;
    load = false;
    secondNumber = "";
  }
  if (lastOperation === "*") {
    multiply(parseFloat(firstNumber), parseFloat(secondNumber));
    disableDecimal2 = false;
    load = false;
    secondNumber = "";
  }
  if (lastOperation === "/") {
    divide(parseFloat(firstNumber), parseFloat(secondNumber));
    disableDecimal2 = false;
    load = false;
    secondNumber = "";
  }
}

function reset() {
  pauseBlackHoleSun();
  playSound();
  firstNumber = "";
  secondNumber = "";
  lastOperation = "";
  load = false;
  disableDecimal1 = false;
  disableDecimal2 = false;
  display.innerText = 0;
}

function removeLast() {
  pauseBlackHoleSun();
  playSound();
  if (!load) {
    firstNumber = firstNumber.toString().slice(0, -1);
    if (firstNumber === "" || firstNumber === "-") {
      disableDecimal1 = false;
      display.innerText = 0;
      firstNumber = "";
    } else {
      firstNumber = firstNumber.slice(0, 10);
      display.innerText = firstNumber;
    }
  }
  if (load) {
    secondNumber = secondNumber.toString().slice(0, -1);
    if (secondNumber === "" || secondNumber === "-") {
      disableDecimal2 = false;
      display.innerText = 0;
      secondNumber = "";
    } else {
      secondNumber = secondNumber.slice(0, 10);
      display.innerText = secondNumber;
    }
  }
}

function decimal() {
  pauseBlackHoleSun();
  playSound();
  if (!firstNumber.includes(".") && firstNumber && !load) {
    firstNumber += ".";
    display.innerText = firstNumber;
  }
  if (!firstNumber.includes(".") && !firstNumber && !load) {
    firstNumber += "0.";
    display.innerText = firstNumber;
  }
  if (!secondNumber.includes(".") && secondNumber && load) {
    secondNumber += ".";
    display.innerText = secondNumber;
  }
  if (!secondNumber.includes(".") && !secondNumber && load) {
    secondNumber += "0.";
    display.innerText = secondNumber;
  }
}

function numbers(number) {
  pauseBlackHoleSun();
  playSound();
  if (!load && firstNumber.length < 10) {
    if (display.innerText === "0" && number === "0") return;
    firstNumber += number;
    display.innerText = firstNumber;
  }
  if (load && secondNumber.length < 10) {
    if (display.innerText === "0" && number === "0") return;
    secondNumber += number;
    display.innerText = secondNumber;
  }
}

function setOperation(operation) {
  pauseBlackHoleSun();
  playSound();
  if (firstNumber === "" && secondNumber === "") {
    return;
  }

  if (secondNumber === "") {
    lastOperation = operation;
    load = true;
  }

  if (lastOperation) {
    operate();
    lastOperation = operation;
  }
}

/* Key Event Handler */

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) numbers(e.key);
  if (e.key === ".") decimal();
  if (e.key === "=" || e.key === "Enter") operate();
  if (e.key === "Backspace") removeLast();
  if (e.key === "Escape") reset();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(e.key);
}

/* Sound Functions */

function playSound() {
  let sound = new Audio("./sounds/buttonpress.mp3");
  sound.play();
}

function blackHoleSun() {
  if (!songOn) {
    songOn = true;
    song.play();
  }
}

function pauseBlackHoleSun() {
  if (songOn) {
    songOn = false;
    song.pause();
    song.currentTime = 0;
  }
}

/* Event Listeners */

window.addEventListener("keydown", handleKeyboardInput);

const numberBtns = document.getElementsByClassName("nums");
for (let i = 0; i < numberBtns.length; i++) {
  numberBtns[i].addEventListener("click", (e) => {
    numbers(e.target.value);
  });
}

const operatorBtns = document.getElementsByClassName("operatorBtns");
for (let i = 0; i < operatorBtns.length; i++) {
  operatorBtns[i].addEventListener("click", (e) => {
    setOperation(e.target.value);
  });
}

equals.addEventListener("click", operate);

pointBtn.addEventListener("click", decimal);

acReset.addEventListener("click", reset);

cancel.addEventListener("click", removeLast);
