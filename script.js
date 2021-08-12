const main = document.querySelector(".main");
const startGame = () => {
  const gameTitle = document.querySelector(".gameTitle");
  const startButton = document.getElementById("start-button");
  const menu = document.querySelector(".menu");
  const opponentOption = document.getElementById("opponentOption");
  const body = document.querySelector("body");
  const computerOpponent = document.getElementById("computerOpponent");
  const playerOpponent = document.getElementById("playerOpponent");
  // Start Game button animation to scale it onto the page.
  appear();
  function appear() {
    gameTitle.style.opacity = "1";
    gameTitle.style.transition = "1.5s";
    startButton.style.transform = "scale(1)";
    startButton.style.transition = "2s";
  }
  // After clicking start game, the button will disappear and the title will swing up then disappear, revealing opponent choices.
  startButton.addEventListener("click", animationUp);
  function animationUp() {
    body.style.backgroundColor = "rgba(148, 214, 255, 0.2)";
    menu.style.animation = "titleUp 1.5s";
    menu.style.height = "20vh";
    startButton.style.display = "none";
    opponentChoice();
  }

  function opponentChoice() {
    opponentOption.style.display = "flex";
    gameTitle.style.fontSize = "0.00001rem";
  }

  computerOpponent.addEventListener("click", displayGame);
  playerOpponent.addEventListener("click", displayGame);

  function displayGame() {
    // Need animations to get rid of this screen
    opponentOption.style.display = "none";
    main.classList.toggle("hide");
    gameTitle.style.fontSize = "5rem";
  }
};

window.addEventListener("load", startGame);
