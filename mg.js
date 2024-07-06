const backImg = "img/back.jpeg";
const frontImg = "img/front.jpg";
let showFront = false;

function createCardButton() {
  const cardButton = document.createElement("button");
  cardButton.className = "card";

  const img = document.createElement("img");
  img.src = backImg;
  cardButton.appendChild(img);

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
const gameBoard = document.querySelector(".game-board");
gameBoard.appendChild(createCardButton());
