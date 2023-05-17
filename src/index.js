import './styles.css';
import {
  apiUrl, createList, fetchScores, submitScores,
} from './modules/scores.js';

// Grab HTML elements
const refreshBtn = document.getElementById('refresh-btn');
const submitBtn = document.getElementById('submit-btn');
const nameInput = document.getElementById('name-input');
const scoreInput = document.getElementById('score-input');
const scoreList = document.querySelector('.score-list');
const errorMsg = document.getElementById('error-msg');

let gameId;
const createGame = async () => {
  // Check if gameId is stored in localStorage
  const storeGameId = localStorage.getItem('gameId');
  if (storeGameId) {
    // If gameId is stored, use it
    gameId = storeGameId;
  } else {
    // If gameId is not stored, create a new game
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

// Function to update the score list in the browser
const updateScoreList = (scores) => {
  scoreList.innerHTML = '';
  scores.forEach((score) => {
    const li = createList(score.user, score.score);
    scoreList.appendChild(li);
  });
};

refreshBtn.addEventListener('click', async () => {
  const scores = await fetchScores(gameId);
  updateScoreList(scores);
});

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  if (nameInput.value === '' || scoreInput.value === '') {
    errorMsg.style.display = 'flex';
  } else {
    const name = nameInput.value;
    const score = scoreInput.value;
    await submitScores(gameId, name, score);
    nameInput.value = '';
    scoreInput.value = '';
    errorMsg.style.display = 'none';

    // Fetch and update the score list
    const scores = await fetchScores(gameId);
    updateScoreList(scores);
  }
});

// Function to check and load the initial scores from local storage
const loadScores = async () => {
  if (gameId) {
    const scores = await fetchScores(gameId);
    updateScoreList(scores);
  }
};

loadScores();
