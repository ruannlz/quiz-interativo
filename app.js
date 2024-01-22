
const form = document.querySelector('.quiz-form');
const span = document.querySelector('span');
const popup = document.querySelector('.popup-wrapper');

const correctAnswers = ['A', 'B', 'B', 'C', 'B', 'B', 'A', 'B', 'A', 'B'];

let score = 0;

const getUserAnswers = () => correctAnswers.map((_, index) => 
  form[`inputQuestion${index + 1}`].value);

const calculateUserScore = userAnswers => {  
  correctAnswers.forEach((correctAnswer, index) => {
    const isUserAnswerCorrect = correctAnswer === userAnswers[index];

    if(isUserAnswerCorrect) score += 10;
  });
}

const showFinalScore = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

  popup.classList.remove('d-none');
}

const animateFinalScore = () => {
  let counter = 0;

  const timer = setInterval(() => {

    if(counter === score) clearInterval(timer);

    popup.querySelector('span').textContent = `${counter++}%`.replace('.', ',');
  }, 30);
}

const resetUserScore = () => {
  score = 0;
}

const handleFormSubmission = event => {
  event.preventDefault();
  
  const userAnswers = getUserAnswers();
  
  resetUserScore();
  calculateUserScore(userAnswers);
  showFinalScore();
  animateFinalScore();
}

const handlePopupEvent = event => {
  const classNameOfClickedElement = event.target.classList[0];
  const classNames = ['popup-close', 'popup-link', 'popup-wrapper']
  const shouldClosePopup = classNames.some(className => className === classNameOfClickedElement);

  if(shouldClosePopup) {
    popup.classList.add('d-none');
  }
}

form.addEventListener('submit', handleFormSubmission);
popup.addEventListener('click', handlePopupEvent); 