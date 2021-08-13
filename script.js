// Globally declared functions.
const main = document.querySelector(".main");
const gameTitle = document.querySelector(".gameTitle");
const opponentOption = document.getElementById("opponentOption");
const body = document.querySelector("body");
var colours = document.querySelector(":root");

// Runs the start menu function.
const startMenu = () => {
  // StartMenu declared functions
  const startButton = document.getElementById("start-button");
  const menu = document.querySelector(".menu");
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
    opponentChoiceScreen();
  }

  // Shows opponent choice screen and takes away the game title.
  function opponentChoiceScreen() {
    opponentOption.style.display = "flex";
    gameTitle.style.fontSize = "0.00001rem";
  }

  // Go to the player function.
  gameMode();
};

// This function will take into account which mode the player picked and then run that mode.
const gameMode = () => {
  // Computer opponent mode.
  computerOpponent.addEventListener("click", function () {
    body.style.backgroundColor = "var(--computer-color)";
    let opponent = "computer";
    displayGame(opponent);
  });

  // Player opponent mode.
  playerOpponent.addEventListener("click", function () {
    body.style.backgroundColor = "var(--player-color)";
    let opponent = "player";
    displayGame(opponent);
  });

  // Displaying which game the player picked.
  function displayGame(opponent) {
    opponentOption.style.display = "none";
    main.classList.toggle("hide");
    gameTitle.style.fontSize = "5rem";
    // Decide which game to play
    if (opponent === "computer") startComputerGame();
    if (opponent == "player") startPlayerGame();
    else return;
  }
};

// Starting computer game.
const startComputerGame = () => {
  colours.style.setProperty("--color-of-o", "rgb(237, 249, 254)");
  console.log("starting computer game");
};

// Starting player game.
const startPlayerGame = () => {
  colours.style.setProperty("--color-of-o", "rgb(214, 236, 246)");
  console.log("starting player game");
};

window.addEventListener("load", startMenu);
