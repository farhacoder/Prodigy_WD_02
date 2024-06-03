
document.addEventListener('DOMContentLoaded', () => {
    let timerInterval;
    let isRunning = false;
    let elapsedTime = 0;
    const minuteElem = document.querySelector('.text.minute');
    const secElem = document.querySelector('.text.sec');
    const miliSecElem = document.querySelector('.text.mili-seconds');
    const playButton = document.querySelector('.button.play');
    const resetButton = document.querySelector('.button.reset');
    const lapButton = document.querySelector('.button.lap');
    const lapsContainer = document.querySelector('.laps');

    function formatTime(time) {
        const milliseconds = Math.floor((time % 1000) / 10);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        return {
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds: seconds < 10 ? `0${seconds}` : seconds,
            milliseconds: milliseconds < 10 ? `0${milliseconds}` : milliseconds
        };
    }

    function updateDisplay(time) {
        const formattedTime = formatTime(time);
        minuteElem.textContent = `${formattedTime.minutes} : `;
        secElem.textContent = ` ${formattedTime.seconds} : `;
        miliSecElem.textContent = ` ${formattedTime.milliseconds}`;
    }

    function startTimer() {
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
    }

    function stopTimer() {
        clearInterval(timerInterval);

    }

    function resetTimer() {
        stopTimer();
        elapsedTime = 0;
        updateDisplay(elapsedTime);
        lapsContainer.innerHTML = '';
        lapButton.classList.add('hidden');
        resetButton.classList.add('hidden');
    }

    function addLap() {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.classList.add('lap-items');
        lapItem.innerHTML = `<span class="number">#${lapsContainer.children.length + 1}</span>
                             <span class="time-stamp">${lapTime.minutes} : ${lapTime.seconds} : ${lapTime.milliseconds}</span>`;
        lapsContainer.appendChild(lapItem);
    }

    playButton.addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
            playButton.textContent = 'Play';
            lapButton.classList.add('hidden');
            resetButton.classList.remove('hidden');
        } else {
            startTimer();
            playButton.textContent = 'Pause';
            lapButton.classList.remove('hidden');
            resetButton.classList.add('hidden');
        }
        isRunning = !isRunning;
    });

    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', addLap);

    updateDisplay(elapsedTime);
});
