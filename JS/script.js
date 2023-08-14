"use strict";

class Calcultor {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += String(number);
  }

  chooseOperation(operation) {
    let lastChar = this.previousOperand.charAt(this.previousOperand.length - 1);

    if (
      (lastChar == "*" ||
        lastChar == "/" ||
        lastChar == "+" ||
        lastChar == "-") &&
      this.currentOperand == ""
    ) {
      return;
    } else {
      this.previousOperand +=
        " " + this.currentOperand + " " + String(operation);
      this.currentOperand = "";
    }
  }

  compute() {
    this.previousOperand += this.currentOperand;
    let string = this.previousOperand;
    this.previousOperand = "";
    this.currentOperand = "";
    string = result(string);
    this.currentOperand = string;
  }

  updateDisplay() {
    this.currentOperandText.innerHTML = this.currentOperand;
    this.previousOperandText.innerHTML = this.previousOperand;
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

const calcultor = new Calcultor(previousOperandText, currentOperandText);

//// Events ////
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (calcultor.currentOperand == "") {
      if (btn.innerHTML != "0") {
        calcultor.appendNumber(btn.innerHTML);
        calcultor.updateDisplay();
      }
    } else {
      calcultor.appendNumber(btn.innerHTML);
      calcultor.updateDisplay();
    }
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calcultor.chooseOperation(btn.innerHTML);
    calcultor.updateDisplay();
  });
});

allClearBtn.addEventListener("click", () => {
  calcultor.clear();
  calcultor.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calcultor.delete();
  calcultor.updateDisplay();
});

equalsBtn.addEventListener("click", () => {
  calcultor.compute();
  calcultor.updateDisplay();
});

//// Functions ////
function result(string) {
  return eval(string);
}
