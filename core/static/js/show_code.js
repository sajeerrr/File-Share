let totalSeconds = 300;

document.addEventListener("DOMContentLoaded", function () {
    const timerEl = document.getElementById("timer");
    const progressEl = document.getElementById("progress");

    const interval = setInterval(() => {
        totalSeconds--;

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        timerEl.innerText = `Expires in ${minutes}:${seconds.toString().padStart(2, '0')}`;

        let percent = (totalSeconds / 300) * 100;
        progressEl.style.width = percent + "%";

        if (totalSeconds <= 0) {
            clearInterval(interval);
            timerEl.innerText = "Code Expired";
            timerEl.style.color = "red";
            progressEl.style.width = "0%";
        }
    }, 1000);
});
