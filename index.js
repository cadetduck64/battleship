console.log('asdf')

const ship = (length, hitCount, sunkStatus) => {
    const newShip = {
        length,
        hitCount,
        sunkStatus,
        hit: () => {
            newShip.hit++
        },
    }
    return newShip
}

const isSunk = (ship) => {
    if (ship.hitCount == ship.length)
    {ship.sunkStatus = true
    console.log(ship + 'IS SUNK')} else
    {console.log(ship + ' is Still intact')}
}


const gameboard = () => {
    const x = []
    const y = []
    for (let i = 0; i <= 16; i++)
    {x.push('x'+i), y.push('y'+i)}
     
    const cruiser  = ship(3, 0, false, )
    return x, y
}

//take the x and y coordinates, use that to determind ship position, write tests
// make player objects

gameboard()