function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const backImg = "img/back.jpeg";
let flippedCards = [];
const flipBackDelay = 300;
let isChecking = false;

function createCardButton(frontImg) {
  const cardButton = document.createElement("button");
  cardButton.className = "card";
  const img = document.createElement("img");
  img.src = backImg;
  cardButton.appendChild(img);

  cardButton.addEventListener("click", () => {
    if (isChecking || img.src === frontImg) return;

    img.src = frontImg;
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
            reloadNewGame();
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

function reloadNewGame() {
  loadCards();
}

document.addEventListener("DOMContentLoaded", function () {
  loadCards();
});
