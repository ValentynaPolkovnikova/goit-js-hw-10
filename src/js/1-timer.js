import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate < now) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

// Function to add leading zero if necessary
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Function to convert milliseconds to days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Function to start the countdown timer
function startTimer(endTime) {
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = endTime - currentTime;
    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      updateTimerUI(0, 0, 0, 0);
      document.querySelector('#datetime-picker').disabled = false; 
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
}

// Function to update the timer UI
function updateTimerUI(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

// Event listener for the Start button
document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value, 'Y-m-d H:i');
  if (selectedDate) {
    const now = new Date();
    if (selectedDate > now) {
      document.querySelector('#datetime-picker').disabled = true;
      startTimer(selectedDate);
    } else {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
    }
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please select a valid date',
    });
  }
});
