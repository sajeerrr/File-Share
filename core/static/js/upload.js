document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const dropContent = document.getElementById("dropContent");
    const form = document.getElementById("uploadForm");

    dropZone.onclick = () => fileInput.click();

    dropZone.ondragover = e => {
        e.preventDefault();
        dropZone.classList.add("dragover");
    };

    dropZone.ondragleave = () => dropZone.classList.remove("dragover");

    dropZone.ondrop = e => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        fileInput.files = e.dataTransfer.files;
        renderFiles();
    };

    fileInput.onchange = renderFiles;

    function truncate(name) {
        if (name.length <= 18) return name;
        const ext = name.split('.').pop();
        return name.substring(0, 10) + "..." + ext;
    }

    function renderFiles() {
        fileList.innerHTML = "";

        if (fileInput.files.length === 0) {
            dropContent.style.display = "block";
            return;
        }

        dropContent.style.display = "none";

        Array.from(fileInput.files).forEach(file => {
            const li = document.createElement("li");
            li.className = "file-item";
            li.innerHTML = `
                <span class="file-name">${truncate(file.name)}</span>
                <span class="file-size">${(file.size/1024).toFixed(1)} KB</span>
            `;
            fileList.appendChild(li);
        });
    }

    form.onsubmit = e => {
        if (fileInput.files.length === 0) {
            e.preventDefault();
            alert("First upload a file");
        }
    };
});
