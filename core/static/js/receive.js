const codeInput = document.querySelector(".code-input");
const form = document.querySelector("form");
const errorMsg = document.getElementById("error-msg");

// Allow only numbers
codeInput.addEventListener("input", () => {
    codeInput.value = codeInput.value.replace(/[^0-9]/g, "");
    errorMsg.textContent = "";
});

// Submit validation
form.addEventListener("submit", (e) => {
    if (codeInput.value.trim() === "") {
        e.preventDefault();
        errorMsg.textContent = "Please enter your 5-digit access code.";
    } 
    else if (codeInput.value.length !== 5) {
        e.preventDefault();
        errorMsg.textContent = "The access code must be exactly 5 digits.";
    }
});
