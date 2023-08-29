import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const button = document.querySelector('button[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let timerId;
button.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] <= new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future!');
            button.disabled = true
        }
        else {
            Notiflix.Notify.success('Click the button to start the countdown!');
            button.disabled = false;
        }
    },
  };

  const pickedTime = flatpickr('input#datetime-picker', options);

  button.addEventListener('click', () => {
    timeUpdate();
    button.disabled = true;
    timerId = setInterval(timeUpdate, 1000);
  })
  function timeUpdate() {
    const timeDifference = pickedTime.selectedDates[0] - new Date();
    if(timeDifference <= 0) {
        clearInterval(timerId);
        button.disabled = false;
        Notiflix.Notify.success('The countdown is over! Pick another date')
        return;
    }

    const {seconds, minutes, hours, days} = convertMs(timeDifference);
    secondsElem.innerHTML = addLeadingZero(seconds);
    minutesElem.innerHTML = addLeadingZero(minutes);
    hoursElem.innerHTML = addLeadingZero(hours);
    daysElem.innerHTML = addLeadingZero(days);
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  
  function convertMs(ms) {
    // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
    // Remaining days
      const days = Math.floor(ms / day);
    // Remaining hours
      const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
      return { days, hours, minutes, seconds };
    }