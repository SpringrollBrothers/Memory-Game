const backImg = "img/back.jpeg";
let flippedCards = [];
const flipBackDelay = 200;
let isChecking = false;

let flipCount = 0;
let timerStarted = false;
let startTime = null;
let timerInterval = null;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = `Time: ${elapsedTime}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateFlipCounter() {
  flipCount++;
  document.getElementById("flip-counter").textContent = `Flips: ${flipCount}`;
}

function createCardButton(frontImg) {
  const cardButton = document.createElement("button");
  cardButton.className = "card";
  const img = document.createElement("img");
  img.src = backImg;
  cardButton.appendChild(img);

  cardButton.addEventListener("click", () => {
    if (!timerStarted) {
      timerStarted = true;
      startTimer();
    }

    if (isChecking || img.src === frontImg) return;

    img.src = frontImg;
    updateFlipCounter();

    flippedCards.push({
      button: cardButton,
      img: img,
    });

    if (flippedCards.length === 2) {
      isChecking = true;

      const [firstCard, secondCard] = flippedCards;
      const firstCardImgSrc = firstCard.img.src;
      const secondCardImgSrc = secondCard.img.src;
      if (firstCardImgSrc === secondCardImgSrc) {
        setTimeout(() => {
          firstCard.button.style.visibility = "hidden";
          secondCard.button.style.visibility = "hidden";
          flippedCards = [];
          isChecking = false;

          const allCards = document.querySelectorAll(".card");
          const hiddenCards = Array.from(allCards).filter(
            (card) => card.style.visibility === "hidden"
          );

          if (hiddenCards.length === allCards.length) {
            stopTimer();
            showResults();
          }
        }, 300);
      } else {
        setTimeout(() => {
          flippedCards.forEach(({ img }) => {
            img.src = backImg;
          });
          flippedCards = [];
          isChecking = false;
        }, flipBackDelay);
      }
    }
  });

  return cardButton;
}

async function loadCards() {
  const frontImg = await getData();

  if (frontImg === null) {
    return;
  }

  const doubledFrontImgs = [...frontImg, ...frontImg];
  const shuffledFrontImgs = shuffleArray(doubledFrontImgs);
  const gameBoard = document.querySelector(".game-board");
  if (gameBoard) {
    gameBoard.innerHTML = "";
    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    gameBoard.appendChild(cardContainer);

    shuffledFrontImgs.forEach((frontImg) => {
      cardContainer.appendChild(createCardButton(frontImg));
    });
  }
}

function showResults() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const resultText = `You completed the game in ${elapsedTime}s with ${flipCount} flips.`;
  document.getElementById("result-text").textContent = resultText;
  document.getElementById("result-modal").style.display = "block";
}

function resetGame() {
  flipCount = 0;
  timerStarted = false;
  stopTimer();
  document.getElementById("timer").textContent = "Time: 0s";
  document.getElementById("flip-counter").textContent = "Flips: 0";
  loadCards();
}

document.addEventListener("DOMContentLoaded", function () {
  resetGame();

  document
    .getElementById("restart-button")
    .addEventListener("click", function () {
      document.getElementById("result-modal").style.display = "none";
      resetGame();
    });
});

async function getData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/SpringrollBrothers/SpringrollBrothers.github.io/main/memory.json"
    );

    if (!response.ok) {
      throw new Error("Could not get your data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
