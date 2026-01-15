const codeInput = document.querySelector(".code-input");

// Allow only numbers
codeInput.addEventListener("input", () => {
    codeInput.value = codeInput.value.replace(/[^0-9]/g, "");
});

// Auto move cursor to end
codeInput.addEventListener("focus", () => {
    const val = codeInput.value;
    codeInput.value = "";
    codeInput.value = val;
});
