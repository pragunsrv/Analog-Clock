document.addEventListener('DOMContentLoaded', function() {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    const digitalTime = document.querySelector('.digital-time');
    const dateDisplay = document.querySelector('.date');
    const clock = document.querySelector('.clock');
    const colorPicker = document.getElementById('color-picker');
    const toggleModeButton = document.getElementById('toggle-mode');
    const changeFaceButton = document.getElementById('change-face');
    const timezoneSelect = document.getElementById('timezone-select');

    function updateClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondDegrees = (seconds / 60) * 360;
        const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
        const hourDegrees = (hours % 12) / 12 * 360 + (minutes / 60) * 30;

        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;

        const hourFormat = hours % 12 || 12; // 12-hour format
        const minuteFormat = minutes < 10 ? `0${minutes}` : minutes;
        const secondFormat = seconds < 10 ? `0${seconds}` : seconds;

        digitalTime.textContent = `${hourFormat}:${minuteFormat}:${secondFormat}`;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }

    function toggleMode() {
        document.body.classList.toggle('dark-mode');
    }

    function changeClockFace() {
        const faces = [
            'radial-gradient(circle at 20%, #ffffff, #d1d1d1)',
            'radial-gradient(circle at 20%, #ff7e5f, #feb47b)',
            'linear-gradient(to right, #ff7e5f, #feb47b)',
            'url("pattern1.png")',
            'url("pattern2.png")'
        ];

        let newFace = faces[Math.floor(Math.random() * faces.length)];
        clock.style.backgroundImage = newFace;
    }

    function changeClockColor() {
        const selectedColor = colorPicker.value;
        clock.style.background = selectedColor;
    }

    function updateTimezone() {
        const selectedTimezone = timezoneSelect.value;
        const now = new Date().toLocaleString('en-US', { timeZone: selectedTimezone });
        const localNow = new Date(now);
        const seconds = localNow.getSeconds();
        const minutes = localNow.getMinutes();
        const hours = localNow.getHours();

        const secondDegrees = (seconds / 60) * 360;
        const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
        const hourDegrees = (hours % 12) / 12 * 360 + (minutes / 60) * 30;

        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        
        const hourFormat = hours % 12 || 12;
        const minuteFormat = minutes < 10 ? `0${minutes}` : minutes;
        const secondFormat = seconds < 10 ? `0${seconds}` : seconds;

        digitalTime.textContent = `${hourFormat}:${minuteFormat}:${secondFormat}`;
    }

    // Populate timezone select options
    function populateTimezones() {
        const timezones = [
            'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
            'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Australia/Sydney'
        ];

        timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz;
            option.textContent = tz;
            timezoneSelect.appendChild(option);
        });

        timezoneSelect.addEventListener('change', updateTimezone);
    }

    populateTimezones();
    toggleModeButton.addEventListener('click', toggleMode);
    changeFaceButton.addEventListener('click', changeClockFace);
    colorPicker.addEventListener('input', changeClockColor);

    setInterval(updateClock, 1000);
    updateClock();  // Initial call to set clock immediately on load
});
