export { player1Gameboard };
export { botGameboard };
export { ships };
export { referee };
export { botOperation };
export { resetGame };
export { isSunk };

const xAxisRef = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const yAxisRef = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

//function for creating new ships
const ship = (shipName, length, hitCount, sunkStatus, coordinates) => {
  const newShip = {
    shipName,
    length,
    hitCount,
    sunkStatus,
    coordinates,
    hit: () => {
      newShip.hitCount++;
    },
  };
  return newShip;
};

//checks if a ship is sunk by comparing length and hit count
const isSunk = (ship) => {
  if (ship.hitCount >= ship.length) {
    ship.sunkStatus = true;
    console.log(ship.shipName + " is SUNK");
    return true;
  } else {
    console.log(ship.shipName + " is Still intact");
    return false;
  }
};

const gameboard = () => {
  const shipCoordinateList = [];
  const xAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const yAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const previouslySelected = [];
  const activeShipList = [];
  //checks to see if both player's activeShipLists are empty and ends the game if either one's is
  const gameOverCheck = () => {
    console.log("GAMEOVER CHECK");
    //loops through all ship's sunk statuses to see if theyre sunk
    activeShipList.forEach((element) => {
      if (element.sunkStatus === true) {
        let newSunkShip = activeShipList.indexOf(element);
        activeShipList.splice(newSunkShip, 1);
      }
    });
    if (activeShipList.length === 0) {
      console.log("declaring winner");
      return true;
    }
  };

  //
  const receiveAttack = (attackAttempt) => {
    for (let i = 0; i < activeShipList.length; i++) {
      for (const iterator of activeShipList[i].coordinates) {
        if (iterator.toString() === attackAttempt.toString()) {
          console.log("hit");
          activeShipList[i].hit();
          isSunk(activeShipList[i]);
          // console.log(activeShipList[i]);
          return true;
        }
      }
    }
  };

  //function for putting coordinate data into ship objects
  const placeShip = (
    length,
    shipName,
    xAxisChoice,
    yAxisChoice,
    orientation
  ) => {
    shipName = ship(shipName, length, 0, false, [], orientation);
    if (orientation === "vertical") {
      const yOrigin = yAxis.indexOf(yAxisChoice);
      let shipYCoordinateArr = yAxis.slice(yOrigin, yOrigin + shipName.length);

      //checks if ship is out of bounds
      if (shipName.length + yOrigin > 10) {
        return;
      }

      //check if coordinates are occupied by another ship
      for (const element of shipYCoordinateArr) {
        for (let i = 0; i < shipCoordinateList.length; i++) {
          let choice = [xAxisChoice, element];
          if (shipCoordinateList[i] == choice.toString()) {
            return;
          }
        }
        shipName.coordinates.push([xAxisChoice, element]);
        shipCoordinateList.push([xAxisChoice, element]);
      }

      activeShipList.push(shipName);
    } else if (orientation === "horizontal") {
      const xOrigin = xAxis.indexOf(xAxisChoice);
      let shipXCoordinateArr = xAxis.slice(xOrigin, xOrigin + shipName.length);

      if (yAxisChoice === "a" && shipName.length + xOrigin > 10) {
        return;
      }

      //checks if ship clips through grid
      if (shipName.length + xAxisChoice > 11) {
        return;
      }

      //check if ship is out of bounds
      if (shipName.length + xOrigin > 12) {
        return;
      }

      //check if coordinates are occupied by another ship
      for (const element of shipXCoordinateArr) {
        for (let i = 0; i < shipCoordinateList.length; i++) {
          let choice = [element, yAxisChoice];
          if (shipCoordinateList[i] == choice.toString()) {
            return;
          }
        }

        shipName.coordinates.push([element, yAxisChoice]);
        shipCoordinateList.push([element, yAxisChoice]);
      }
      activeShipList.push(shipName);
    }
    return true;
  };

  return {
    xAxis,
    yAxis,
    isSunk,
    previouslySelected,
    receiveAttack,
    placeShip,
    activeShipList,
    gameOverCheck,
    shipCoordinateList,
  };
};

const botGameboard = gameboard();
const player1Gameboard = gameboard();

//DEBUG: ship data
// const carrier = player1Gameboard.placeShip(5, 'carrier')
// const battleship = player1Gameboard.placeShip(4, 'battleship')
// const cruiser = player1Gameboard.placeShip(3, 'cruiser', 3, 'a', 'vertical')
// const submarine = player1Gameboard.placeShip(3,'submarine', 5, 'd', 'vertical')
// const destroyer = player1Gameboard.placeShip(2, 'destroyer', 6, 'c', 'horizontal')
// const ssConflict = player1Gameboard.placeShip(7, 'ssConflict', 3, 'a', 'vertical')

const carrier = { shipObjectLength: 5, shipObjectName: "carrier" };
const battleship = { shipObjectLength: 4, shipObjectName: "battleship" };
const cruiser = { shipObjectLength: 3, shipObjectName: "cruiser" };
const submarine = { shipObjectLength: 3, shipObjectName: "submarine" };
const destroyer = { shipObjectLength: 2, shipObjectName: "destroyer" };
// const ssConflict = (7, "ssConflict");

//list of playable ships
const ships = [battleship, carrier, cruiser, destroyer, submarine];

//calls game over check function and declares a winner
const referee = () => {
  if (player1Gameboard.gameOverCheck()) {
    console.log("player loses" + player1Gameboard.activeShipList);
    return "bot";
  }
  if (botGameboard.gameOverCheck()) {
    console.log("CPU loses" + botGameboard.activeShipList);
    return "playerwin";
  }
};

//logic and parameters used by the bot for placing ships
const botPlacementFunction = () => {
  //creates a list of coordinate options the bot can use to attack
  const botAvailableAttacks = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      botAvailableAttacks.push([xAxisRef[i], yAxisRef[j]]);
    }
  }

  const botRandomAttack = () => {
    //picks a random plot to attack
    const randomAttack =
      botAvailableAttacks[
        Math.floor(Math.random() * botAvailableAttacks.length)
      ];
    //takes random plot chosen out of the list of attack options
    botAvailableAttacks.splice(botAvailableAttacks.indexOf(randomAttack), 1);
    //spits out the coordinates to attack
    return randomAttack;
  };

  //individual xAxis option (redundant)
  const botRandomChoiceX = () => {
    const botChoiceX = Math.floor(Math.random() * 9);
    return botChoiceX;
  };

  //individual yAxis option (redundant)
  const botRandomChoiceY = () => {
    const botChoiceY = Math.floor(Math.random() * 9);
    return botChoiceY;
  };

  //engine for calculating ship placements
  const botChoice = (count) => {
    let xAxisPlacement = botRandomChoiceX();
    let yAxisPlacement = botRandomChoiceY();
    let botChoiceOrientation;

    const randomPlacementRule = Math.floor(
      Math.random() * (9 - ships[count].shipObjectLength)
    );

    // if (count % 2 == 1)
    //   {botChoiceOrientation = 'horizontal'}
    // else if (count % 2 == 0)
    // {botChoiceOrientation = 'vertical'}

    botGameboard.placeShip(
      ships[count].shipObjectLength,
      ships[count].shipObjectName,
      botGameboard.xAxis[count * 2],
      botGameboard.yAxis[randomPlacementRule],
      "vertical"
    );

    //DEBUG: places ships at specific locations
    // botGameboard.placeShip(
    //   ships[count].shipObjectLength,
    //   ships[count].shipObjectName,
    //   botGameboard.xAxis[count + 1],
    //   botGameboard.yAxis[count],
    //   "vertical"
    // );

    //potential rules: only vertical in spaces 4 - 7, horizontal in spaces 1-3 and 8-10
  };

  //function that actually places ships
  const botChoiceFunction = () => {
    for (let i = 0; i < ships.length; i++) {
      botChoice(i);
    }
  };

  return {
    botRandomChoiceX,
    botRandomChoiceY,
    botChoiceFunction,
    botChoice,
    botAvailableAttacks,
    botRandomAttack,
  };
};

//easier object access to bot functions
const botOperation = botPlacementFunction();

//calls the function to place ships
botOperation.botChoiceFunction();

//resets game data and information
const resetGame = () => {
  console.log(botGameboard);
  botGameboard.activeShipList.length = 0;
  botGameboard.shipCoordinateList.length = 0;
  player1Gameboard.activeShipList.length = 0;
  player1Gameboard.shipCoordinateList.length = 0;
  botOperation.botChoiceFunction();
  console.log("Game reset");
};
