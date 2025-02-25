const tamuBtn = document.getElementById('tamuBtn');
const days180Btn = document.getElementById('days180Btn');
const days210Btn = document.getElementById('days210Btn');
const digitalClock = document.getElementById('digital-clock');
const expirationDateEl = document.getElementById('expiration-date');
const currentDateEl = document.getElementById('current-date');
let tamuActive = false;
let alarmAudio = new Audio('alarm-sound.wav');
let alarmTimeout;

alarmAudio.loop = true;

tamuBtn.addEventListener('click', () => {
    tamuActive = !tamuActive;
    tamuBtn.classList.toggle('active', tamuActive);
    if (!tamuActive) {
        alarmAudio.pause();
    }
});

days180Btn.addEventListener('click', () => {
    updateExpirationDate(180);
    updateButtonColors(days180Btn, days210Btn);
});

days210Btn.addEventListener('click', () => {
    updateExpirationDate(210);
    updateButtonColors(days210Btn, days180Btn);
});

const updateButtonColors = (activeBtn, inactiveBtn) => {
    activeBtn.classList.remove('green-btn');
    activeBtn.classList.add('red-btn');
    inactiveBtn.classList.remove('red-btn');
    inactiveBtn.classList.add('green-btn');
};

const digitalClockInit = () => {
    setInterval(() => {
        const now = new Date();
        const hour = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const sec = String(now.getSeconds()).padStart(2, '0');
        digitalClock.innerText = `${hour}:${min}:${sec}`;
        updateCurrentDate(now);
        checkAlarm(now);
        updateExpirationCountdown();
    }, 500);
};

infoIcon.addEventListener('click', () => {
    infoPopup.style.display = 'block';
});

instructionsIcon.addEventListener('click', () => {
    instructionsPopup.style.display = 'block';
});

closeInfoPopup.addEventListener('click', () => {
    infoPopup.style.display = 'none';
});

closeInstructionsPopup.addEventListener('click', () => {
    instructionsPopup.style.display = 'none';
});

const checkAlarm = (now) => {
    if (!tamuActive) {
        return;
    }
    const mins = now.getMinutes();
    const secs = now.getSeconds();
   // if ((mins === 0 || mins === 15 || mins === 30 || mins === 45) && secs === 0) {
   //     alarmAudio.play();
    if ((mins === 0 || mins === 20 || mins === 40 ) && secs === 0) {
        alarmAudio.play();
    }
};

const updateCurrentDate = (now) => {
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dayOfWeek = now.toLocaleString('default', { weekday: 'long' }).toUpperCase();
    currentDateEl.innerHTML = `${year}.${month}.${day} ${dayOfWeek}`;
};

let expirationDate;
const updateExpirationDate = (days) => {
    const now = new Date();
    expirationDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    updateExpirationCountdown();
};

const updateExpirationCountdown = () => {
    if (!expirationDate) return;
    const now = new Date();
    const timeRemaining = expirationDate - now;
    if (timeRemaining <= 0) {
        expirationDateEl.innerHTML = 'Expiration Date: EXPIRED';
        return;
    }
    const expDay = String(expirationDate.getDate()).padStart(2, '0');
    const expMonth = expirationDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const expYear = String(expirationDate.getFullYear()).slice(-2);
    const expHour = String(expirationDate.getHours()).padStart(2, '0');
    const expMinute = String(expirationDate.getMinutes()).padStart(2, '0');
    expirationDateEl.innerHTML = `Expiration Date: ${expDay}${expMonth}${expYear} ${expHour}${expMinute}`;
};

window.onload = () => {
    document.body.appendChild(alarmAudio);
    digitalClockInit();
};
