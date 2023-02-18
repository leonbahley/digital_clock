const first_digit = document.querySelector('.first_digit');

const second_digit = document.querySelector('.second_digit');

const third_digit = document.querySelector('.third_digit');

const fourth_digit = document.querySelector('.fourth_digit');

const fifth_digit = document.querySelector('.fifth_digit');

const sixth_digit = document.querySelector('.sixth_digit');

const day = document.querySelector('.date_wrapper');

const alarm_btn = document.querySelector('.alarm_button');

const alarm_input = document.querySelector('.alarm_input');

const alarm_message = document.querySelector('.alarm_message');

const alarm_message_wrapper = document.querySelector('.alarm_message_wrapper');

const alarm_cancel_button = document.querySelector('.alarm_cancel_button');

const stop_alarm_btn = document.querySelector('.stop_alarm_btn');

const audio = new Audio('alarm.mp3');
audio.loop = true;

const updateDay = weekDay => {
  switch (weekDay) {
    case 1:
      day.innerHTML = '<p>Lunes</p>';
      break;
    case 2:
      day.innerHTML = '<p>Martes</p>';
      break;
    case 3:
      day.innerHTML = '<p>Miercoles</p>';
      break;
    case 4:
      day.innerHTML = '<p>Jueves</p>';
      break;
    case 5:
      day.innerHTML = '<p>Viernes</p>';
      break;
    case 6:
      day.innerHTML = '<p>Sabado</p>';
      break;
    case 0:
      day.innerHTML = '<p>Domingo</p>';
      break;
  }
};

setInterval(setClock, 1000);

let currentHour;
let currentMinute;

function setClock() {
  const date = new Date();

  const seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
  currentHour = hours;
  currentMinute = minutes;

  const weekDay = date.getDay();
  updateValues(hours, first_digit, second_digit);
  updateValues(minutes, third_digit, fourth_digit);
  updateValues(seconds, fifth_digit, sixth_digit);
  updateDay(weekDay);
}

setClock();

function updateValues(num, elem1, elem2) {
  const number = num.split('');
  updateValue(number[0], elem1);
  updateValue(number[1], elem2);
}

function updateValue(num, element) {
  switch (num) {
    case '0':
      element.id = 'zero';
      break;
    case '1':
      element.id = 'number_one';
      break;
    case '2':
      element.id = 'number_two';
      break;
    case '3':
      element.id = 'number_three';
      break;
    case '4':
      element.id = 'number_four';
      break;
    case '5':
      element.id = 'number_five';
      break;
    case '6':
      element.id = 'number_six';
      break;
    case '7':
      element.id = 'number_seven';
      break;
    case '8':
      element.id = 'number_eight';
      break;
    case '9':
      element.id = 'number_nine';
      break;
  }
}

let alarmHour;
let alarmMinute;
let alarmInterval;

const checkAlarm = () => {
  if (alarmHour === currentHour && currentMinute === alarmMinute) {
    alarmHour = null;
    alarmMinute = null;
    alarm_message_wrapper.classList.toggle('visible_item');
    stop_alarm_btn.classList.remove('not_visible');
    audio.play();
    clearInterval(alarmInterval);
  }
};

const handleAlarm = () => {
  if (!alarm_input.value) {
    return;
  }
  audio.play();
  audio.pause();
  alarm_message.innerText = `Alarma puesta a ${alarm_input.value}`;
  const hours = alarm_input.value.split(':')[0];
  const minutes = alarm_input.value.split(':')[1];

  alarm_input.value = '';
  alarm_input.toggleAttribute('disabled');

  alarmHour = hours;
  alarmMinute = minutes;
  alarm_message_wrapper.classList.toggle('visible_item');
  alarmInterval = setInterval(checkAlarm, 1000);
};

alarm_btn.addEventListener('click', handleAlarm);

const handleAlarmCancel = () => {
  clearInterval(alarmInterval);

  alarm_input.toggleAttribute('disabled');
  alarm_message_wrapper.classList.toggle('visible_item');
};

alarm_cancel_button.addEventListener('click', handleAlarmCancel);

// const initilizeAudio = () => {
//   audio.play();
//   audio.pause();
// };

// alarm_btn.addEventListener('click', initilizeAudio);

const handleAlarmStop = () => {
  alarm_input.toggleAttribute('disabled');
  audio.pause();
  audio.currentTime = 0;
  stop_alarm_btn.classList.add('not_visible');
};
stop_alarm_btn.addEventListener('click', handleAlarmStop);
