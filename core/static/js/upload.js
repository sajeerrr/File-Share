document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const dropContent = document.getElementById("dropContent");
    const form = document.getElementById("uploadForm");
    const errorMsg = document.getElementById("uploadError");

    let filesArray = [];

    dropZone.onclick = () => {
        fileInput.click();
        errorMsg.style.display = "none";
    };

    dropZone.ondragover = e => {
        e.preventDefault();
        dropZone.classList.add("dragover");
    };

    dropZone.ondragleave = () => dropZone.classList.remove("dragover");

    dropZone.ondrop = e => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        addFiles(e.dataTransfer.files);
        errorMsg.style.display = "none";
    };

    fileInput.onchange = () => {
        addFiles(fileInput.files);
        fileInput.value = "";
        errorMsg.style.display = "none";
    };

    function truncate(name) {
        if (name.length <= 18) return name;
        const ext = name.split('.').pop();
        return name.substring(0, 10) + "..." + ext;
    }

    function addFiles(newFiles) {
        Array.from(newFiles).forEach(file => {
            filesArray.push(file);
        });
        renderFiles();
    }

    function renderFiles() {
        fileList.innerHTML = "";

        if (filesArray.length === 0) {
            dropContent.style.display = "block";
            return;
        }

        dropContent.style.display = "none";

        filesArray.forEach((file, index) => {
            const li = document.createElement("li");
            li.className = "file-item";

            li.innerHTML = `
                <span class="file-name" title="${file.name}">
                    ${truncate(file.name)}
                </span>
                <span class="file-size">
                    ${(file.size / 1024).toFixed(1)} KB
                </span>
                <span class="remove-btn" data-index="${index}">✖</span>
            `;

            fileList.appendChild(li);
        });

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.onclick = function (e) {
                e.stopPropagation(); // 🔥 STOP opening file window
                const index = this.getAttribute("data-index");
                filesArray.splice(index, 1);
                renderFiles();
            };
        });

    }

    form.onsubmit = e => {
        if (filesArray.length === 0) {
            e.preventDefault();
            errorMsg.innerText = "First upload a file";
            errorMsg.style.display = "block";
            return;
        }

        // Put filesArray back into input before submit
        const dataTransfer = new DataTransfer();
        filesArray.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
    };
});
