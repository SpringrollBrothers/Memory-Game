function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const backImg = "img/back.jpeg";
let flipCount = 0;
let startTime = null;
let timerInterval = null;
let flippedCards = [];
const flipBackDelay = 2000;

function createCardButton(frontImg) {
  const cardButton = document.createElement("button");
  cardButton.className = "card";
  const img = document.createElement("img");
  img.src = backImg;
  cardButton.appendChild(img);
  let showFront = false;
  cardButton.addEventListener("click", () => {
    if (!startTime) {
      startTime = Date.now();
      timerInterval = setInterval(() => {
        const elapsedTime = parseInt((Date.now() - startTime) / 1000);
        console.log("Elapsed time: " + elapsedTime + " seconds");
      }, 1000);
    }
    if (showFront) {
      img.src = backImg;
    } else {
      img.src = frontImg;
      flipCount++;
      console.log("Total flips: " + flipCount);
      flippedCards.push(cardButton);
      if (flippedCards.length === 2) {
        setTimeout(() => {
          flippedCards.forEach((card) => {
            const img = card.querySelector("img");
            img.src = backImg;
          });
          flippedCards = [];
        }, flipBackDelay);
      }
    }
    showFront = !showFront;
  });

  return cardButton;
}

document.addEventListener("DOMContentLoaded", function () {
  let frontImg = [];
  fetch(
    "https://raw.githubusercontent.com/SpringrollBrothers/SpringrollBrothers.github.io/main/memory.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not get your data");
      }
      return response.json();
    })
    .then((data) => {
      frontImg = data;

      const doubledFrontImgs = [...frontImg, ...frontImg];
      const shuffledFrontImgs = shuffleArray(doubledFrontImgs);
      const gameBoard = document.querySelector(".game-board");
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";
      gameBoard.appendChild(cardContainer);
      shuffledFrontImgs.forEach((frontImg) => {
        cardContainer.appendChild(createCardButton(frontImg));
      });
    })
    .catch((error) => console.error(error));
});
