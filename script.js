const startGame = () => {
  const gameTitle = document.querySelector(".gameTitle");
  const startButton = document.getElementById("start-button");
  const menu = document.querySelector(".menu");
  const opponentOption = document.getElementById("opponentOption");
  const body = document.querySelector("body");
  const computerOpponentBtn = document;

  appear();
  function appear() {
    gameTitle.style.opacity = "1";
    gameTitle.style.transition = "1.5s";
    startButton.style.transform = "scale(1)";
    startButton.style.transition = "2s";
  }

  function animationUp() {
    body.style.backgroundColor = "rgba(148, 214, 255, 0.2)";
    menu.style.animation = "titleUp 1.5s";
    menu.style.height = "20vh";
    startButton.style.display = "none";
    opponentChoice();
  }

  startButton.addEventListener("click", animationUp);

  function opponentChoice() {
    opponentOption.style.display = "flex";
    gameTitle.style.fontSize = "0.00001rem";
  }
};

window.addEventListener("load", startGame);
