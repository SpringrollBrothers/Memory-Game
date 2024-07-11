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
    if (showFront) {
      img.src = backImg;
    } else {
      img.src = frontImg;
    }

    showFront = !showFront;
  });

  return cardButton;
}
const shuffledFrontImgs = shuffleArray(doubledFrontImgs);
const gameBoard = document.querySelector(".game-board");
shuffledFrontImgs.forEach((frontImg) => {
  gameBoard.appendChild(createCardButton(frontImg));
});
