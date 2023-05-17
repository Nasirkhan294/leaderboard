import './styles.css';
import {
  apiUrl, createList, fetchScores, submitScores,
} from './modules/Scores.js';

// Grab HTML elements
const refreshBtn = document.getElementById('refresh-btn');
const submitBtn = document.getElementById('submit-btn');
const nameInput = document.getElementById('name-input');
const scoreInput = document.getElementById('score-input');
const scoreList = document.querySelector('.score-list');

let gameId;
const createGame = async () => {
  const storeGameId = localStorage.getItem('gameId');
  if (storeGameId) {
    gameId = storeGameId;
  } else {
    const res = await fetch(`${apiUrl}games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'My Game' }),
    });
    const data = await res.json();
    gameId = data.result;
    localStorage.setItem('gameId', gameId);
  }
};

createGame();

refreshBtn.addEventListener('click', async () => {
  const scores = await fetchScores(gameId);
  scoreList.innerHTML = '';
  scores.forEach((score) => {
    const li = createList(score.user, score.score);
    scoreList.appendChild(li);
  });
});

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const score = scoreInput.value;
  await submitScores(gameId, name, score);
  nameInput.value = '';
  scoreInput.value = '';
});