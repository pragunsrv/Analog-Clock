function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const timeZoneOffset = parseFloat(document.getElementById('timezone-select').value);

    const localTime = new Date(now.getTime() + timeZoneOffset * 60 * 60 * 1000);

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = (hours % 12) / 12 * 360 + (minutes / 60) * 30;

    document.querySelector('.second-hand').style.transform = `rotate(${secondDegrees}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
    document.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;

    // Update digital time
    const formattedTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.querySelector('.digital-time').textContent = formattedTime;

    // Update date
    const formattedDate = localTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.querySelector('.date').textContent = formattedDate;

    // Dynamic styling based on time (e.g., dark mode at night)
    if (localTime.getHours() >= 18 || localTime.getHours() < 6) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function toggleMode() {
    const darkMode = document.body.classList.toggle('dark-mode');
    const modeButton = document.getElementById('toggle-mode');
    modeButton.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
}

function changeClockFace() {
    const faces = [
        'radial-gradient(circle, #ffffff, #f4f4f4)',
        'radial-gradient(circle, #2c3e50, #34495e)',
        'linear-gradient(to right, #ff7e5f, #feb47b)',
        'url("pattern1.png")',
        'url("pattern2.png")'
    ];
    const clock = document.querySelector('.clock');
    const currentFace = clock.style.backgroundImage;
    let newFace = faces[Math.floor(Math.random() * faces.length)];

    while (newFace === currentFace) {
        newFace = faces[Math.floor(Math.random() * faces.length)];
    }

    clock.style.backgroundImage = newFace;
}

function changeClockColor() {
    const colorPicker = document.getElementById('color-picker');
    const selectedColor = colorPicker.value;
    document.querySelector('.clock').style.background = selectedColor;
}

document.getElementById('toggle-mode').addEventListener('click', toggleMode);
document.getElementById('change-face').addEventListener('click', changeClockFace);
document.getElementById('color-picker').addEventListener('input', changeClockColor);
document.getElementById('timezone-select').addEventListener('change', updateClock);

setInterval(updateClock, 1000);
updateClock();  // Initial call to set clock immediately on load
