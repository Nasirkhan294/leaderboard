export const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

export const createList = (name, score) => {
  const li = document.createElement('li');
  li.textContent = `${name} : ${score}`;
  return li;
};

export const fetchScores = async (gameId) => {
  const res = await fetch(`${apiUrl}games/${gameId}/scores/`);
  const data = await res.json();
  return data.result;
};

export const submitScores = async (gameId, name, score) => {
  const res = await fetch(`${apiUrl}games/${gameId}/scores/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: name, score }),
  });

  const data = await res.json();
  return data.result;
};
