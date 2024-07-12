//clean up UI

//Imports and Dependencies
import { player1Gameboard } from "/index.js";
import { botGameboard } from "/index.js";
import { ships } from "/index.js";
import { referee } from "/index.js";
import { botOperation } from "./index.js";
import { resetGame } from "./index.js";
import { isSunk } from "./index.js";

//player used variables
const messageBoard = document.querySelector("#messageBoard");
const resetButton = document.querySelector("#resetButton");
const playFieldContainer = document.querySelector("#playFieldContainer");
const playField = document.querySelector("#playField");
const xAxisDiv = document.querySelector("#xAxisDiv");
const yAxisDiv = document.querySelector("#yAxisDiv");
const shipListDiv = document.querySelector("#shipListDiv");
const placeShipModal = document.querySelector("#placeShipModal");
let mouseHoverVariable;
let mouseClickVariable;
let DOMorientation = "horizontal";
let currentShipLength;
let currentShipName;
let DOMCoordinates;

//Bot used variables
const botContainer = document.querySelector("#botContainer");
const botplayfieldcontainer = document.querySelector("#botplayfieldcontainer");
const botplayField = document.querySelector("#botplayField");
const botxAxisDiv = document.querySelector("#botxAxisDiv");
const botyAxisDiv = document.querySelector("#botyAxisDiv");
let botmouseHoverVariable;

//easy DOM reference for index code coordinates
const DOMxAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DOMyAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

//player 1 functions
//creates div box for the xAxis and yAxis; not interactive
const gameboardPlayer1Dom = () => {
  const renderxAxis = () => {
    for (let i = 0; i < 10; i++) {
      const xAxisSquare = document.createElement("div");
      xAxisSquare.classList.add("xAxisSquare");
      xAxisSquare.textContent = DOMxAxis[i];
      xAxisDiv.appendChild(xAxisSquare);
      playFieldContainer.appendChild(xAxisDiv);
    }
  };

  const renderyAxis = () => {
    for (let i = 0; i < 10; i++) {
      const yAxisSquare = document.createElement("div");
      yAxisSquare.classList.add("yAxisSquare");
      yAxisSquare.textContent = DOMyAxis[i];
      yAxisDiv.appendChild(yAxisSquare);
      playFieldContainer.appendChild(yAxisDiv);
    }
  };

  //loads UI elements for the player
  const renderPlayfield = () => {
    //highlights interactive tiles while hovering over them
    const previewEngine = (previewEngineLength) => {
      // const previewEngineSquare = document.getElementById(mouseClickVariable+previewEngineLength)
      if (DOMorientation === "horizontal") {
        // console.log((Number(mouseHoverVariable.id) + previewEngineLength - 1))
        for (let i = 1; i < previewEngineLength; i++) {
          document
            .getElementById(
              Number(mouseHoverVariable.id) + previewEngineLength - i
            )
            .classList.add("battlefieldSquareHighlight");
        }
      } else if (DOMorientation === "vertical")
        for (let i = 1; i < previewEngineLength; i++)
          if (
            document.getElementById(Number(mouseHoverVariable.id) + 10 * i) ===
            null
          ) {
            return;
          } else {
            document
              .getElementById(Number(mouseHoverVariable.id) + 10 * i)
              .classList.add("battlefieldSquareHighlight");
          }
    };

    //function for clearing squares when not hover over them
    const clearSquares = () => {
      let a = document.querySelectorAll(".battlefieldSquareHighlight");
      let b = document.querySelectorAll(".battlefieldSquareSelect");
      b.forEach((element) => {
        element.classList.remove("battlefieldSquareSelect");
      });

      a.forEach((element) => {
        element.classList.remove("battlefieldSquareHighlight");
      });
    };

    //loads the 100 squares to make up the interactive area
    for (let i = 0; i < 100; i++) {
      const battlefieldSquare = document.createElement("div");
      battlefieldSquare.classList.add(`battlefieldSquare`);
      battlefieldSquare.setAttribute("id", i);

      //activates the hover highlighing function
      battlefieldSquare.addEventListener("mouseover", () => {
        (mouseHoverVariable = battlefieldSquare),
          battlefieldSquare.classList.add("battlefieldSquareSelect"),
          previewEngine(currentShipLength);
      });
      //clears highlighted square when leaving a box
      battlefieldSquare.addEventListener("mouseleave", () => {
        clearSquares();
      });

      //what happens when a player clicks on their own square
      battlefieldSquare.addEventListener("click", () => {
        //if the player has deployed all their ships, dont let them fire on them
        //if they are not all deployed and theres no ship selected
        //tell the player the pick a ship and place them all
        if (player1Gameboard.activeShipList.length === ships.length) {
          return (messageBoard.textContent =
            "You cant fire on your own ships!");
        } else if (currentShipName === undefined) {
          return (messageBoard.textContent = "Pick a ship first, Commander");
        }

        //checks valid placement
        if (mouseHoverVariable.id[1] === undefined) {
          if (
            player1Gameboard.placeShip(
              currentShipLength,
              currentShipName,
              DOMxAxis[mouseHoverVariable.id[0]],
              DOMyAxis[0],
              DOMorientation
            ) === undefined
          ) {
            return;
          }
        } else if (
          player1Gameboard.placeShip(
            currentShipLength,
            currentShipName,
            DOMxAxis[mouseHoverVariable.id[1]],
            DOMyAxis[mouseHoverVariable.id[0]],
            DOMorientation
          ) === undefined
        ) {
          messageBoard.textContent =
            "Units are interfering, deploy to a different spot, Commander";
          return;
        }

        if (mouseHoverVariable.id[1] === undefined) {
          // console.log(mouseHoverVariable.id[1]);
          // console.log(DOMxAxis[mouseHoverVariable.id[0]], DOMyAxis[0])
          player1Gameboard.placeShip(
            currentShipLength,
            currentShipName,
            DOMxAxis[mouseHoverVariable.id[0]],
            DOMyAxis[0],
            DOMorientation
          );
        } else {
          player1Gameboard.placeShip(
            currentShipLength,
            currentShipName,
            DOMxAxis[mouseHoverVariable.id[1]],
            DOMyAxis[mouseHoverVariable.id[0]],
            DOMorientation
          );
        }

        //reflects the ship placement on the players DOM board
        if (DOMorientation === "horizontal") {
          for (let i = 1; i < currentShipLength; i++)
            document
              .getElementById(
                Number(mouseHoverVariable.id) + currentShipLength - i
              )
              .classList.add("deployedShip");
          mouseHoverVariable.classList.add("deployedShip");
        } else if (DOMorientation === "vertical") {
          for (let i = 1; i < currentShipLength; i++)
            document
              .getElementById(Number(mouseHoverVariable.id) + 10 * i)
              .classList.add("deployedShip");
          mouseHoverVariable.classList.add("deployedShip");
        }

        //removes the selected ship that was just placed
        const clear = document.querySelector("#shipSummaryHighlight");
        clear.remove();
        currentShipName = undefined;
        currentShipLength = undefined;
        // console.log(player1Gameboard.activeShipList);
      });

      //changes the orientation of the ship preview and placement mode
      battlefieldSquare.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (DOMorientation === "horizontal") {
          clearSquares();
          DOMorientation = "vertical";
          previewEngine(currentShipLength);
        } else if (DOMorientation === "vertical") {
          clearSquares();
          DOMorientation = "horizontal";
          previewEngine(currentShipLength);
        }
      });

      //adds a number to a square, and appends the board to the main div
      // battlefieldSquare.textContent = i;
      playField.appendChild(battlefieldSquare);
      playFieldContainer.appendChild(playField);
    }
  };

  //calls all the function to render the player field
  renderxAxis();
  renderyAxis();
  renderPlayfield();
};

gameboardPlayer1Dom();

//function that lets players select ships to place
const placeShipDom = () => {
  const shipSummaryFactory = (length, shipName) => {
    //takes the ships array, creates a selectable div thats used to place the ship on the board
    const shipSummary = document.createElement("div");
    shipSummary.textContent = shipName + " || length: " + length;
    shipSummary.classList.add("shipSummary");
    shipSummary.setAttribute("id", shipName);

    shipSummary.addEventListener("click", () => {
      currentShipLength = length;
      currentShipName = shipName;
      // console.log("currentShipLength " + currentShipLength);
      // console.log("currentShipName " + currentShipName);

      const removehightlight = document.getElementById("shipSummaryHighlight");
      if (removehightlight != undefined || removehightlight != null) {
        removehightlight.removeAttribute("id");
      }
      shipSummary.setAttribute("id", "shipSummaryHighlight");
    });
    shipListDiv.appendChild(shipSummary);
  };

  //activates the above function for as many ships are playable
  ships.forEach((element) => {
    shipSummaryFactory(element.shipObjectLength, element.shipObjectName);
  });
};

placeShipDom();

//renders CPU/player 2 gameboard
const DOMbotGameboard = () => {
  //easy to access, in function axis references
  const botDOMxAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const botDOMyAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  const botrenderxAxis = () => {
    for (let i = 0; i < 10; i++) {
      const botxAxisSquare = document.createElement("div");
      botxAxisSquare.classList.add("botxAxisSquare");
      botxAxisSquare.textContent = botDOMxAxis[i];
      botxAxisDiv.appendChild(botxAxisSquare);
    }
  };

  const botrenderyAxis = () => {
    for (let i = 0; i < 10; i++) {
      const botyAxisSquare = document.createElement("div");
      botyAxisSquare.classList.add("botyAxisSquare");
      botyAxisSquare.textContent = botDOMyAxis[i];
      botyAxisDiv.appendChild(botyAxisSquare);
    }
  };

  const botrenderplayField = () => {
    //shows a single square where the player is hovering
    const previewEngine = (previewEngineLength) => {
      if (DOMorientation === "horizontal") {
        for (let i = 1; i < previewEngineLength; i++) {
          document
            .getElementById(
              Number(mouseHoverVariable.id) + previewEngineLength - i
            )
            .classList.add("battlefieldSquareHighlight");
        }
      } else if (DOMorientation === "vertical")
        for (let i = 1; i < previewEngineLength; i++)
          if (
            document.getElementById(Number(mouseHoverVariable.id) + 10 * i) ===
            null
          ) {
            return;
          } else {
            document
              .getElementById(Number(mouseHoverVariable.id) + 10 * i)
              .classList.add("battlefieldSquareHighlight");
          }
    };

    //clears square color when leaving
    const botclearSquares = () => {
      let a = document.querySelectorAll(".botbattlefieldSquareHighlight");
      let b = document.querySelectorAll(".botbattlefieldSquareSelect");
      b.forEach((element) => {
        element.classList.remove("botbattlefieldSquareSelect");
      });

      a.forEach((element) => {
        element.classList.remove("botbattlefieldSquareHighlight");
      });
    };

    //creates the interactive bot squares
    for (let i = 0; i < 100; i++) {
      const botbattlefieldSquare = document.createElement("div");
      botbattlefieldSquare.classList.add(`botbattlefieldSquare`);
      botbattlefieldSquare.setAttribute("id", i);

      botbattlefieldSquare.addEventListener("mouseover", () => {
        (mouseHoverVariable = botbattlefieldSquare),
          botbattlefieldSquare.classList.add("botbattlefieldSquareSelect"),
          previewEngine(currentShipLength);
      });

      //calls the function that clears squares when leaving
      botbattlefieldSquare.addEventListener("mouseleave", () => {
        let a = document.querySelectorAll(".battlefieldSquareHighlight");
        let b = document.querySelectorAll(".battlefieldSquareSelect");
        b.forEach((element) => {
          element.classList.remove("battlefieldSquareSelect");
        });

        a.forEach((element) => {
          element.classList.remove("battlefieldSquareHighlight");
        });
        botclearSquares();
      });

      botbattlefieldSquare.addEventListener("click", () => {
        //DEBUG: uncomment this to prevent bot from not attacking
        //checks if the plaer has placed all availabe ships
        if (document.querySelector("#shipListDiv").children.length > 0) {
          return console.log(
            "Place all ships before launching attacks, Commander",
            (messageBoard.textContent =
              "Place all ships before launching attacks, Commander")
          );
        }

        //varibale corresponding to the desired coordinate eg. [1, 'a']
        let playerAttackAttempt = [
          botDOMxAxis[mouseHoverVariable.id[1]],
          botDOMyAxis[mouseHoverVariable.id[0]],
        ];

        //checks to see if the space has already been interacted with and if so, stops the function
        if (
          botbattlefieldSquare.classList.contains(
            "botbattlefieldSquareMissedShip"
          ) ||
          botbattlefieldSquare.classList.contains("botbattlefieldSquareHitShip")
        ) {
          messageBoard.textContent =
            "Those coordinates have been fired at already, we have to fire somewhere else";
          console.log("space already hit");
          return;
        }

        //checks to see if game is over, if so, stop the function
        if (referee() === "botwin") {
          messageBoard.textContent =
            "Naval Command says we have taken too many losses, we must retreat";
          return;
        } else if (referee() === "playerwin") {
          messageBoard.textContent =
            "Another successful operation, Commander, lets prepare for the next one";
          return;
        }

        //DEBUG: manual coordinate input
        // let botAttackAttempt = [1, "j"];

        //gets random coordinates to use for an attack
        let botAttackAttempt = botOperation.botRandomAttack();

        //bot redundency: makes a choice if nothing is originally returned
        if (botAttackAttempt === undefined) {
          botAttackAttempt = [
            botOperation.botRandomChoiceX,
            botOperation.botRandomChoiceY,
          ];
        }

        //formatting so player attacks responds to first column
        if (playerAttackAttempt[0] === undefined) {
          playerAttackAttempt = [botDOMxAxis[mouseHoverVariable.id[0]], "a"];
        }
        //if the player hits or misses a bot square, reflect it in the DOM,
        if (botGameboard.receiveAttack(playerAttackAttempt) === true) {
          mouseHoverVariable.classList.add("botbattlefieldSquareHitShip");
          messageBoard.textContent = "We hit a ship, great work Commander";
        }
        // else if () {}
        else {
          {
            mouseHoverVariable.classList.add("botbattlefieldSquareMissedShip");
            messageBoard.textContent =
              "No targets hit Commander, lets aim somewhere else";
          }
        }

        //format code so the bot can properly hit targets in the first column
        let botAttackParameter =
          `${botDOMyAxis.indexOf(botAttackAttempt[1])}` +
          `${botDOMxAxis.indexOf(botAttackAttempt[0])}`;
        if (botAttackAttempt[1] === "a") {
          botAttackParameter = botAttackAttempt[0] - 1;
        } else if (botAttackAttempt[0] === 0) {
          botAttackParameter =
            `${botDOMyAxis.indexOf(botAttackAttempt[0])}` + `0`;
        }

        //if the bot hits a player square, reflect it in the DOM by turning square red
        if (player1Gameboard.receiveAttack(botAttackAttempt) === true) {
          document
            .getElementById(botAttackParameter)
            .classList.add("botbattlefieldSquareHitShip");
        }
        // if the bot misses turn it green
        else {
          {
            document
              .getElementById(botAttackParameter)
              .classList.add("botbattlefieldSquareMissedShip");
          }
        }
      });

      //makes right click not do anything
      botbattlefieldSquare.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });

      //adds unique number to all squares and appends to the DOM
      // botbattlefieldSquare.textContent = i;
      botplayField.appendChild(botbattlefieldSquare);
    }
  };
  botrenderxAxis();
  botrenderyAxis();
  botrenderplayField();
};

DOMbotGameboard();

//function that resets game data and game state
let confirm = 0; // confirmation variable
resetButton.addEventListener("click", () => {
  //adds to the confirmation variable counter, and text confirms restart
  confirm++;
  if (confirm === 1) {
    resetGame((resetButton.textContent = "Are you sure?"));
    console.log(confirm);
    //if nothing happens after 3 seconds set counter to 0 and default text
    setTimeout(() => {
      confirm = 0;
      resetButton.textContent = "Reset Game";
    }, 3000);
    return;
  }

  //resets board squares and player description
  const shipSummaries = document.querySelectorAll(".shipSummary");
  for (let index = 0; index < shipSummaries.length; index++) {
    shipSummaries[index].remove();
  }
  const missedSquares = document.querySelectorAll(
    ".botbattlefieldSquareMissedShip"
  );
  const hitSquares = document.querySelectorAll(".botbattlefieldSquareHitShip");
  const placedShips = document.querySelectorAll(".deployedShip");

  for (let i = 0; i < missedSquares.length; i++) {
    missedSquares[i].classList.remove("botbattlefieldSquareMissedShip");
  }
  for (let i = 0; i < hitSquares.length; i++) {
    hitSquares[i].classList.remove("botbattlefieldSquareHitShip");
  }
  for (let i = 0; i < placedShips.length; i++) {
    placedShips[i].classList.remove("deployedShip");
  }

  //replaces list of selectable ships
  placeShipDom();

  messageBoard.textContent =
    "Welcome back Commander, we have an operation. Deploy your units by clicking the ship name and clicking the deployment coordinates";

  resetButton.textContent = "Reset Game";

  confirm = 0;
});

//algorithm for finding coordinates: using the index of Y and X to find the corresponding class for the grid
//  Example: if you want to hit g, 7
// y[6] = G; x[6] = 7
// this would correspond to the 67th tile
