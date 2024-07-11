function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const amPm = document.querySelector('.am-pm');
    
    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = (hours % 12) / 12 * 360 + (minutes / 60) * 30;

    document.querySelector('.second-hand').style.transform = `rotate(${secondDegrees}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
    document.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;

    // Update AM/PM indicator
    if (hours >= 12) {
        amPm.querySelector('.am').style.display = 'none';
        amPm.querySelector('.pm').style.display = 'inline-block';
    } else {
        amPm.querySelector('.am').style.display = 'inline-block';
        amPm.querySelector('.pm').style.display = 'none';
    }

    // Dynamic styling based on time (e.g., dark mode at night)
    if (hours >= 18 || hours < 6) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

setInterval(updateClock, 1000);
updateClock();  // Initial call to set clock immediately on load
