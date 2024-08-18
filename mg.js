const backImg = "img/back.jpeg";
const frontImg = [
  "img/front.jpg",
  "img/front1.jpeg",
  "img/front2.jpeg",
  "img/front3.jpeg",
  "img/front4.avif",
  "img/front5.jpeg",
];
const doubledFrontImgs = [...frontImg, ...frontImg];
let flipCount = 0;
let startTime = null;
let timerInterval = null;
let flippedCards = [];
const flipBackDelay = 2000;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
      img.scr = backImg;
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

document.addEventListener("DOMContentLoaded", async function () {
  let frontImg = [];
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/SpringrollBrothers/SpringrollBrothers.github.io/main/memory.json"
    );

    if (!response.ok) {
      throw new Error("Could not get your data");
    }
    const data = await response.json();
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
  } catch (error) {
    console.error(error);
  }
});
