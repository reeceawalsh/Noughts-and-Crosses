// Globally declared functions.
const main = document.querySelector(".main");
const gameTitle = document.querySelector(".gameTitle");
const opponentOption = document.getElementById("opponentOption");
const body = document.querySelector("body");
var colours = document.querySelector(":root");

// Runs the start menu function.
const startMenu = () => {
  // Variables
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
    gameTitle.style.fontSize = "4rem";
    if (opponent === "computer") {
      colours.style.setProperty("--color-of-o", "rgb(237, 249, 254)");
    } else {
      colours.style.setProperty("--color-of-o", "rgb(214, 236, 246)");
    }
    startGame(opponent);
  }

  const startGame = (opponent) => {
    // Gameboard variables
    const cellElements = document.querySelectorAll("[data-cell]");
    const gameBoard = document.querySelector(".game-board");
    const CROSSES_CLASS = "x";
    const NOUGHTS_CLASS = "o";
    const GAMEBOARD = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    const WINNING_GAMEBOARD = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let playerOnesTurn;
    let win = true;
    opponent = opponent;

    // Clear board ready for game to start
    clearBoard();
    function clearBoard() {
      cellElements.forEach((cell) => {
        cell.classList.remove(NOUGHTS_CLASS);
        cell.classList.remove(CROSSES_CLASS);
      });
    }

    // Once: true means that you can't click on that cell after it's been clicked.
    cellElements.forEach((cell) => {
      cell.addEventListener("click", handleClick, { once: true });
    });

    function handleClick(e) {
      const cell = e.target;
      const currentClass = playerOnesTurn ? NOUGHTS_CLASS : CROSSES_CLASS;
      placeMark(cell, currentClass);
      if (checkForWin(currentClass)) {
        endGame(win);
      }
      if (checkForDraw()) {
        endGame(!win);
      }
      switchTurns();
    }

    function placeMark(cell, currentClass) {
      cell.classList.add(currentClass);
    }

    // If there are three cell elements in a row that have the class of the current class then it will return true (a win).
    function checkForWin(currentClass) {
      // Checks to see if any of the combinations are returning true. If one full sub-array in the array returns true then it's a win.
      return WINNING_GAMEBOARD.some((combination) => {
        // Checks to see if every element of the sub-array meets the next condition.
        return combination.every((index) => {
          // Checks each array and looks to see if that corresponding cell (cellElements[index]) has currentClass on it's class list.
          return cellElements[index].classList.contains(currentClass);
        });
      });
    }

    // Checks if every cell contains a cross or a nought, if they do then it's a draw.
    function checkForDraw() {
      return [...cellElements].every((cell) => {
        return (
          cell.classList.contains(CROSSES_CLASS) ||
          cell.classList.contains(NOUGHTS_CLASS)
        );
      });
    }

    // It's either player ones turn (true) or not player ones turn (false);
    function switchTurns() {
      playerOnesTurn = !playerOnesTurn;
      gameBoard.classList.toggle(CROSSES_CLASS);
      gameBoard.classList.toggle(NOUGHTS_CLASS);
    }
  };

  // Ends Game
  const endGame = (result, opponent) => {
    const endOfGameMessage = document.getElementById("end-of-game-message");
    const endOfGameMessageText = document.getElementById(
      "end-of-game-message-text"
    );
    const restartGameBtn = document.getElementById("restart-button");

    endOfGameMessage.style.display = "flex";
    if (result) {
      endOfGameMessageText.textContent = "Winner!";
    } else {
      endOfGameMessageText.textContent = "Draw!";
    }

    restartGameBtn.addEventListener("click", function () {
      endOfGameMessage.style.display = "none";
      startGame(opponent);
    });
  };
};

window.addEventListener("load", startMenu);
