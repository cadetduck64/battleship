const ship = (shipName, length, hitCount, sunkStatus, coordinates) => {
    const newShip = {
        shipName,
        length,
        hitCount,
        sunkStatus,
        coordinates,
        hit: () => {
            newShip.hitCount++
        },
    }
    return newShip
}

const isSunk = (ship) => {
    if (ship.hitCount >= ship.length)
    {ship.sunkStatus = true
    return console.log(ship.shipName + ' is SUNK')} else
    {return console.log(ship.shipName + ' is Still intact')}
}

// const gameboardFunc = () => {

//     gameboard = {
//         xAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         yAxis: ['a','b','c','d','e','f','g','h','i','j'],
//         missed: [],
//         receiveAttack: () => {(ship, attempt) => {
//             console.log(attempt, ship.coordinates)
//             if (attempt.toString() === ship.coordinates.toString())
//             {return 'hit'}
//             }
//         },
//         placeShip: (length, shipName, xAxis, yAxis) => {
//             shipName = ship(length, 0, false, [xAxis, yAxis])
//             console.log(shipName)
//             return shipName
//         }
//     }
//     console.log(gameboard)
//     return  gameboard
// }
// const cruiser = gameboard.placeShip(3, 'cruiser', 3,'a')
// console.log(gameboard.receiveAttack())
// console.log(cruiser)

// const destroyer = gameboard.placeShip(4, 'destroyer', 4, 'b')

const gameboard = () => {
    const shipCoordinateList = []
    const xAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const yAxis = ['a','b','c','d','e','f','g','h','i','j']
    const missed = []
    const receiveAttack = (ship, attempt) => {
        console.log(shipCoordinateList)
        if (missed.toString().includes(attempt.toString()))
        {return console.log('invalid option; target has been hit already')}
        // console.log((attempt))
        // console.log((ship.coordinates))
        else if (ship.coordinates.toString().includes(attempt.toString()))
        {return ship.hitCount++, missed.push(attempt), isSunk(ship), 'hit'} else 
        {return missed.push(attempt), isSunk(ship), 'miss'}
    }
    
    const placeShip = (length, shipName, xAxisChoice, yAxisChoice, orientation) => {
        shipName = ship(shipName, length, 0, false, [], orientation)

        
        if (orientation === 'vertical')     {
                const yOrigin = yAxis.indexOf(yAxisChoice)
                let shipYCoordinateArr = (yAxis.slice(yOrigin, yOrigin + ship.length - 2))

                for (const element of shipYCoordinateArr) {
                    // if (shipCoordinateList.includes([xAxisChoice, element]))
                    //     {return console.log('invalid placement')}
                    
                    for (let i = 0; i < shipCoordinateList.length; i++)
                    {let choice = [xAxisChoice, element]
                        if(shipCoordinateList[i] == choice.toString())
                    {return console.log('invalid option')}}

                    shipName.coordinates.push([xAxisChoice, element])
                    shipCoordinateList.push([xAxisChoice, element])
                }

            } else if (orientation === 'horizontal')    {
                const xOrigin = xAxis.indexOf(xAxisChoice)
                let shipXCoordinateArr = (xAxis.slice(xOrigin, xOrigin + ship.length - 2))
                for (const element of shipXCoordinateArr) {
                    
                    for (let i = 0; i < shipCoordinateList.length; i++)
                    {let choice = [element, yAxisChoice]
                        if(shipCoordinateList[i] == choice.toString())
                    {return console.log('invalid option')}}
                    
                    shipName.coordinates.push([element, yAxisChoice])
                    shipCoordinateList.push([element, yAxisChoice])
                }
            }      
            console.log(shipCoordinateList)
        return shipName
    }
    const gameOverCheck = () => {
        if ('list' == shipCoordinateList)
        {return 'Game Over'}
    }
    gameOverCheck()
return {xAxis, yAxis, missed, receiveAttack, placeShip}
}

const player1Gameboard = gameboard()

const cruiser = player1Gameboard.placeShip(3, 'cruiser', 3, 'a', 'vertical')
const destroyer = player1Gameboard.placeShip(3, 'destroyer', 3, 'a', 'horizontal')

console.log(cruiser)
console.log(destroyer)


// player1Gameboard.receiveAttack(cruiser, [6, 'a'])
// player1Gameboard.receiveAttack(cruiser, [6, 'a'])
// player1Gameboard.receiveAttack(cruiser, [5, 'a'])
// player1Gameboard.receiveAttack(cruiser, [4, 'a'])
// player1Gameboard.receiveAttack(cruiser, [3, 'a'])

console.log('asdf')


//take the x and y coordinates, use that to determine ship position, write tests
// make player objects

// export {player1Gameboard}
// export {cruiser}

//added logic to prevent duplicate ship placements