document.addEventListener("DOMContentLoaded", function () {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const dropContent = document.getElementById("dropContent");
    const progressContainer = document.getElementById("uploadProgressContainer");
    const progressBar = document.getElementById("uploadProgress");

    dropZone.addEventListener("click", () => {
        fileInput.click();
    });

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        fileInput.files = e.dataTransfer.files;
        showFiles(fileInput.files);
    });

    fileInput.addEventListener("change", () => {
        showFiles(fileInput.files);
    });

    function showFiles(files) {
        fileList.innerHTML = "";
        dropContent.style.display = "none";

        Array.from(files).forEach(file => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${file.name}</span>
                <small>${(file.size / 1024).toFixed(1)} KB</small>
            `;
            fileList.appendChild(li);
        });

        dropZone.style.justifyContent = "flex-start";
    }

    // Fake progress animation (real AJAX later)
    document.getElementById("uploadForm").addEventListener("submit", () => {
        progressContainer.classList.remove("hidden");
        let percent = 0;

        const interval = setInterval(() => {
            percent += 5;
            progressBar.style.width = percent + "%";
            if (percent >= 100) clearInterval(interval);
        }, 100);
    });
});
