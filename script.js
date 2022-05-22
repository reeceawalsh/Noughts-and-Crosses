// Globally declared functions.
const main = document.querySelector(".main");
const gameTitle = document.querySelector(".gameTitle");
const opponentOption = document.getElementById("opponentOption");
const body = document.querySelector("body");
var colours = document.querySelector(":root");
const rightPlayer = document.getElementById("right-player");
const leftPlayer = document.getElementById("left-player");
const changeModeBtn = document.getElementById("change-mode-btn");
let round = 0;
let playerTwosTurn = true;
const endOfGameMessage = document.getElementById("end-of-game-message");
const endOfGameMessageText = document.getElementById(
  "end-of-game-message-text"
);
const restartGameBtn = document.getElementById("restart-button");
const playerLeftScore = document.getElementById("playerLeftScore");
const playerRightScore = document.getElementById("playerRightScore");

// Runs the start menu function.
const startMenu = () => {
  // Variables
  const startButton = document.getElementById("start-button");
  const menu = document.querySelector(".menu");

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
    gameTitle.style.fontSize = "-0.0000001rem";
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
    gameTitle.style.fontSize = "3.5rem";
    if (opponent === "computer") {
      colours.style.setProperty("--color-of-o", "rgb(237, 249, 254)");
      changeModeBtn.textContent = "Play a Friend";
    } else {
      colours.style.setProperty("--color-of-o", "rgb(214, 236, 246)");
      changeModeBtn.textContent = "Play the Computer";
    }

    // Change mode
    // changeModeBtn.addEventListener("click", function () {
    //   console.log(opponent);
    //   if ((opponent = "player")) {
    //     changeModeBtn.textContent = "Play the Computer";
    //     opponent = "computer";
    //     console.log("opp = player");
    //   } else {
    //     changeModeBtn.textContent = "Play a Friend";
    //     opponent = "player";
    //     console.log("opp = comp");
    //   }
    // });

    startGame(opponent);
  }
};

const startGame = (opponent) => {
  // Gameboard variables
  const cellElements = document.querySelectorAll("[data-cell]");
  const gameBoard = document.querySelector(".game-board");
  const leftPlayerSide = document.getElementById("leftPlayerSide");
  const rightPlayerSide = document.getElementById("rightPlayerSide");
  const CROSSES_CLASS = "x";
  const NOUGHTS_CLASS = "o";
  let currentClass = playerTwosTurn ? NOUGHTS_CLASS : CROSSES_CLASS;
  let computersClass = playerTwosTurn ? NOUGHTS_CLASS : CROSSES_CLASS;
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

  let win = true;
  opponent = opponent;
  let difficulty = "easy";

  // Clear board ready for game to start
  clearBoard();
  function clearBoard() {
    round++;
    cellElements.forEach((cell) => {
      cell.classList.remove(NOUGHTS_CLASS);
      cell.classList.remove(CROSSES_CLASS);
      gameBoard.classList.remove(NOUGHTS_CLASS);
      gameBoard.classList.remove(CROSSES_CLASS);
      leftPlayerSide.classList.remove(NOUGHTS_CLASS);
      leftPlayerSide.classList.remove(CROSSES_CLASS);
      rightPlayerSide.classList.remove(NOUGHTS_CLASS);
      rightPlayerSide.classList.remove(CROSSES_CLASS);
    });
    if (round % 2 !== 0) {
      leftPlayerSide.classList.add(CROSSES_CLASS);
      rightPlayerSide.classList.add(NOUGHTS_CLASS);
      gameBoard.classList.add(CROSSES_CLASS);
      playerTwosTurn = false;
    }
    if (round % 2 == 0) {
      rightPlayerSide.classList.add(CROSSES_CLASS);
      leftPlayerSide.classList.add(NOUGHTS_CLASS);
      gameBoard.classList.add(NOUGHTS_CLASS);
      playerTwosTurn = true;
    }
  }
  computersFirstMove();
  function computersFirstMove() {
    if (opponent === "computer" && playerTwosTurn == true) {
      computersTurn(computersClass);
    }
  }
  // Once: true means that you can't click on that cell after it's been clicked.
  cellElements.forEach((cell) => {
    cell.onclick = handleClick;
  });

  function handleClick(e) {
    const cell = e.target;
    currentClass = playerTwosTurn ? NOUGHTS_CLASS : CROSSES_CLASS;
    if (
      !cell.classList.contains(NOUGHTS_CLASS) &&
      !cell.classList.contains(CROSSES_CLASS)
    )
      placeMark(cell, currentClass, computersClass);
    if (checkForWin(currentClass)) {
      endGame(win, currentClass, opponent);
    } else if (checkForDraw()) {
      endGame(!win, currentClass, opponent);
    }
  }

  function placeMark(cell, currentClass, computersClass) {
    // If player vs player then add like normal
    if (opponent == "player") {
      cell.classList.add(currentClass);
      switchTurns();
    }
    // If computer then play player turn but not computers yet
    if (opponent == "computer") {
      cell.classList.add(currentClass);
      computersTurn(computersClass);
    }
  }

  function computersTurn(computersClass) {
    if (difficulty === "easy") {
      for (let i = 0; i < 9; i++) {
        if (
          !cellElements[i].classList.contains(NOUGHTS_CLASS) &&
          !cellElements[i].classList.contains(CROSSES_CLASS)
        ) {
          cellElements[i].classList.add(computersClass);
          break;
        }
      }
    }
    if (checkForWin(computersClass)) {
      endGame(win, computersClass, opponent);
    }
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
    playerTwosTurn = playerTwosTurn ? false : true;
    gameBoard.classList.toggle(CROSSES_CLASS);
    gameBoard.classList.toggle(NOUGHTS_CLASS);
  }
};

// Ends Game
const endGame = (result, winner, opponent) => {
  declareWinner(result, winner);

  function declareWinner(result, winner) {
    if (result) {
      if (winner == "x") {
        if (round % 2 !== 0) {
          playerLeftScore.textContent++;
          endOfGameMessageText.textContent = `${leftPlayer.textContent} Wins!`;
        }
      } else {
        playerRightScore.textContent++;
        endOfGameMessageText.textContent = `${rightPlayer.textContent} Wins!`;
      }
      if (winner === "o") {
        if (round % 2 == 0) {
          playerLeftScore.textContent++;
          endOfGameMessageText.textContent = `${leftPlayer.textContent} Wins!`;
        } else {
          playerRightScore.textContent++;
          endOfGameMessageText.textContent = `${rightPlayer.textContent} Wins!`;
        }
      }
      endOfGameMessage.style.display = "flex";
    } else {
      endOfGameMessageText.textContent = "Draw!";
      endOfGameMessage.style.display = "flex";
    }
  }

  //   console.log("switch opponent");
  //   playerLeftScore.textContent = 0;
  //   playerRightScore.textContent = 0;
  //   if (opponent == "computer") {
  //     changeModeBtn.textContent = "Play a Friend";
  //     opponent = "player";
  //   }
  //   if (opponent == "player") {
  //     changeModeBtn.textContent = "Play the Computer";
  //     opponent = "computer";
  //   }
  //   console.log(opponent);
  //   startGame(opponent);
  // };

  restartGameBtn.onclick = function () {
    endOfGameMessage.style.display = "none";
    startGame(opponent);
  };
};

window.addEventListener("load", startMenu);
