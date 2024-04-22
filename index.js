const messageBoard = document.getElementById("messageBoard");

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

const isSunk = (ship) => {
  if (ship.hitCount >= ship.length) {
    ship.sunkStatus = true;
    return console.log(ship.shipName + " is SUNK");
  } else {
    return console.log(ship.shipName + " is Still intact");
  }
};

const gameboard = () => {
  const shipCoordinateList = [];
  const xAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const yAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const missed = [];
  const activeShipList = [];
  const gameOverCheck = () => {
    console.log('GAMEOVER CHECK')
    console.log(botGameboard.activeShipList)
    console.log(activeShipList.length)

    if (activeShipList.length === 0) {
        return console.log("Game Over, You Lose");
      }
    activeShipList.forEach((element) => {

        if (element.sunkStatus === true) {
        let newSunkShip = activeShipList.indexOf(element);
        activeShipList.splice(newSunkShip, 1);
      }
    });
  };

//   const receiveAttack = (ship, attempt) => {
//     console.log(ship)
//     console.log(attempt)
//     if (missed.toString().includes(attempt.toString())) {
//       return "invalid option; target has been hit already";
//     }
//     // console.log((attempt))
//     // console.log((ship.coordinates))
//     else if (ship.coordinates.toString().includes
//     (attempt.toString())) {
//       return ship.hitCount++, missed.push(attempt), isSunk(ship), "hit";
//     } else {
//       return missed.push(attempt), isSunk(ship), "miss";
//     }
//   };

const receiveAttack = (ship, attempt) => {
    console.log(ship)
    console.log(attempt)
    
    if (ship === undefined && (missed.toString().includes(attempt.toString())) === false) {        
        return missed.push(attempt), console.log(missed)}
    else if (missed.toString().includes(attempt.toString())) {
        console.log("invalid option; target has been hit already")
      return;
    }
    else if (ship.coordinates.toString().includes(attempt.toString())) {
        console.log(ship.shipName + ' has been hit')
      return ship.hitCount++, missed.push(attempt), isSunk(ship);
    }
  };
// rewrite code to accomodate hits

  const placeShip = (
    length,
    shipName,
    xAxisChoice,
    yAxisChoice,
    orientation
  ) => {
    shipName = ship(shipName, length, 0, false, [], orientation);

    // console.log(shipName.length)
    // console.log(yAxisChoice)

    //checks if ship clips is within the grid
    // console.log(yAxisChoice);

    if (orientation === "vertical") {
      const yOrigin = yAxis.indexOf(yAxisChoice);
      let shipYCoordinateArr = yAxis.slice(yOrigin, yOrigin + shipName.length);

      //checks if ship is out of bounds
      if (shipName.length + yOrigin > 10) {
        return;
      }

      // if  (shipName.length + yAxisChoice > 10)
      // {return console.log('out of grid')}

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

      // console.log(shipName.length + xOrigin)
      // console.log(yAxisChoice)

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
    return shipName
    // console.log(shipCoordinateList)
  };

  return {
    xAxis,
    yAxis,
    missed,
    receiveAttack,
    placeShip,
    activeShipList,
    gameOverCheck,
    shipCoordinateList,
  };
};

const botGameboard = gameboard();
const player1Gameboard = gameboard();

// const carrier = player1Gameboard.placeShip(5, 'carrier')
// const battleship = player1Gameboard.placeShip(4, 'battleship')
// const cruiser = player1Gameboard.placeShip(3, 'cruiser', 3, 'a', 'vertical')
// const submarine = player1Gameboard.placeShip(3,'submarine', 5, 'd', 'vertical')
// const destroyer = player1Gameboard.placeShip(2, 'destroyer', 6, 'c', 'horizontal')
// const ssConflict = player1Gameboard.placeShip(3, 'ssConflict', 3, 'a', 'vertical')

const carrier = { shipObjectLength: 5, shipObjectName: "carrier" };
const battleship = { shipObjectLength: 4, shipObjectName: "battleship" };
const cruiser = { shipObjectLength: 3, shipObjectName: "cruiser" };
const submarine = { shipObjectLength: 3, shipObjectName: "submarine" };
const destroyer = { shipObjectLength: 2, shipObjectName: "destroyer" };
const ssConflict = (3, "ssConflict");

const ships = [battleship, carrier, cruiser, destroyer, submarine];

const referee = () => {
  player1Gameboard.gameOverCheck();
  return player1Gameboard, botGameboard;
};

const botFunction = () => {

            const botRandomChoiceX = () => {
                return Math.floor(Math.random() * 9)
            }

            const botRandomChoiceY = () => {
                return Math.floor(Math.random() * 9)
            }

            const botRandomOrientation = () => {
                if (Math.floor(Math.random() * 2) === 1) 
                {return ('horizonatal')}
                else if (Math.floor(Math.random() * 2) === 0) 
                {return ('vertical') }
                else {return 'vertical'}
            }



            // const botChoice = (count) => {
            //     botGameboard.placeShip(
            //         ships[count].shipObjectLength,
            //         ships[count].shipObjectName, 
            //         (botGameboard.xAxis[count]),
            //         (botGameboard.yAxis[count]),
            //         'vertical')
            // }

            const botChoice = (count) => {
                botGameboard.placeShip(
                    ships[count].shipObjectLength,
                    ships[count].shipObjectName, 
                    (botGameboard.xAxis[count + 1]),
                    (botGameboard.yAxis[count]),
                    'vertical')
                }
                
                
                
                const botChoiceFunction = () => {
                    for (let i = 0; i < 5; i++)    
                    {botChoice(i)}
                }
                botChoiceFunction()
                
                // if(botGameboard.activeShipList.length !== 5) {botChoiceFunction()}
                
                // console.log(botGameboard.activeShipList)
                // console.log(botGameboard.shipCoordinateList)

            
        }

botFunction()

referee();

export { player1Gameboard };
export { botGameboard };
export { ships };
export {referee};
