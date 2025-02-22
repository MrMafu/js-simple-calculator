const display = document.getElementById("display");
const keys = document.getElementById("keys");

// Equals Button
document.getElementById("equals").addEventListener("click", calculate);

// Clear Button
document.getElementById("clear").addEventListener("click", () => {
    display.value = "";
    display.scrollLeft = 0;
});

// Backspace Button
document.getElementById("backspace").addEventListener("click", () => {
    display.value = display.value.slice(0, -1);
    display.scrollLeft = display.scrollWidth;
});

// Append Clicked Value to Display
keys.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches("button[data-value]")) {
        display.value += target.getAttribute("data-value");
        display.scrollLeft = display.scrollWidth;
    }
});

// Keyboard Functionality
document.addEventListener("keydown", (e) => {
    const allowedKeys = "0123456789+-*/().";
    if (allowedKeys.includes(e.key)) {
        display.value += e.key;
        display.scrollLeft = display.scrollWidth;
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Escape") {
        display.value = "";
        display.scrollLeft = 0;
    } else if (e.key === "Backspace") {
        e.preventDefault();
        display.value = display.value.slice(0, -1);
        display.scrollLeft = display.scrollWidth;
    }
});

// Calculation Function
function calculate() {
    if (/^[0-9+\-*/.() ]+$/.test(display.value)) {
        try {
            display.value = Function('"use strict";return (' + display.value + ')')();
        } catch (error) {
            display.value = "Error";
        }
    } else {
        display.value = "Invalid input";
    }
    display.scrollLeft = display.scrollWidth;
}