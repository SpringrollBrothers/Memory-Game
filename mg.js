const img = document.createElement("img");
const cardButton = document.querySelector(".card");
const backImg = "img/back.jpeg";
const frontImg = "img/front.jpg";
img.src = backImg;
cardButton.appendChild(img);

let isFlipped = false;

cardButton.addEventListener("click", () => {
  if (isFlipped) {
    img.src = frontImg;
  } else {
    img.src = backImg;
  }
  isFlipped = !isFlipped;
});
