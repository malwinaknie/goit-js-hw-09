import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const button = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => resolve({position, delay}), delay)
    } else {
      setTimeout(() => reject({position, delay}), delay)
    }
  })
}

form.addEventListener('click', event => {
  event.preventDefault();
  button.disabled = true;

  const formDelay = Number(form.delay.value);
  const formStep = Number(form.step.value);
  const formAmount = Number(form.amount.value);

  for (let i = 0; i < formAmount; i++) {
    const position = i + 1;
    const delay = formDelay + formStep * i;
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }); 
  }
  button.disabled = false;
})
