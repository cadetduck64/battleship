import {player1Gameboard} from "/index.js"
import {botGameboard } from "/index.js"
import {ships} from "/index.js"
import { referee } from "/index.js"

console.log(ships)


//player used variables
const playFieldContainer = document.querySelector('#playFieldContainer')
const playField = document.querySelector('#playField')
const xAxisDiv = document.querySelector('#xAxisDiv')
const yAxisDiv = document.querySelector('#yAxisDiv')
const shipListDiv = document.querySelector('#shipListDiv')
const placeShipModal = document.querySelector('#placeShipModal')
let mouseHoverVariable
let mouseClickVariable
let DOMorientation = 'horizontal'
let currentShipLength
let currentShipName
let DOMCoordinates

//Bot used variables
const botContainer = document.querySelector('#botContainer')
const botplayfieldcontainer = document.querySelector('#botplayfieldcontainer')
const botplayField = document.querySelector('#botplayField')
const botxAxisDiv = document.querySelector('#botxAxisDiv')
const botyAxisDiv = document.querySelector('#botyAxisDiv')
let botmouseHoverVariable

//easy DOM reference for index code coordinates
const DOMxAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const DOMyAxis = ['a','b','c','d','e','f','g','h','i','j']
//player 1 functions
const gameboardPlayer1Dom = () => {

    const renderxAxis = () => {
        for (let i = 0; i < 10; i ++)
        {const xAxisSquare = document.createElement('div')
        xAxisSquare.classList.add('xAxisSquare')
        xAxisSquare.textContent = DOMxAxis[i]
        xAxisDiv.appendChild(xAxisSquare)
        playFieldContainer.appendChild(xAxisDiv)
        }
    }

    const renderyAxis = () => {
        for (let i = 0; i < 10; i ++)
        {const yAxisSquare = document.createElement('div')
        yAxisSquare.classList.add('yAxisSquare')
        yAxisSquare.textContent = DOMyAxis[i]
        yAxisDiv.appendChild(yAxisSquare)
        playFieldContainer.appendChild(yAxisDiv)
        }
    }


    const renderPlayfield = () => {
        const previewEngine = (previewEngineLength) => {
                // const previewEngineSquare = document.getElementById(mouseClickVariable+previewEngineLength)
                if(DOMorientation === 'horizontal')
                {   // console.log((Number(mouseHoverVariable.id) + previewEngineLength - 1))
                    for(let i = 1; i < previewEngineLength; i++)
                    {document.getElementById(Number(mouseHoverVariable.id) + previewEngineLength - i).classList.add('battlefieldSquareHighlight')}
                    
                } else if(DOMorientation === 'vertical')
                    for(let i = 1; i < previewEngineLength ; i++)
                    if (document.getElementById(Number(mouseHoverVariable.id) + 10 * i) === null) {return} else
                    {document.getElementById(Number(mouseHoverVariable.id) + 10 * i).classList.add('battlefieldSquareHighlight')}
            }

            const clearSquares = () => {
                let a = document.querySelectorAll('.battlefieldSquareHighlight')
                let b = document.querySelectorAll('.battlefieldSquareSelect')
                b.forEach(element => {
                    element.classList.remove('battlefieldSquareSelect')
                });

                a.forEach(element => {
                    element.classList.remove('battlefieldSquareHighlight')
                });
            }

            for (let i = 0; i < 100; i ++)
            {
                const battlefieldSquare = document.createElement('div')
                battlefieldSquare.classList.add(`battlefieldSquare`)
                battlefieldSquare.setAttribute('id', i)
                
                battlefieldSquare.addEventListener('mouseover', () => {
                    mouseHoverVariable = battlefieldSquare, battlefieldSquare.classList.add('battlefieldSquareSelect'),
                    previewEngine(currentShipLength)})
                    
                battlefieldSquare.addEventListener('mouseleave', () => {
                    clearSquares()
                })
                
                // battlefieldSquare.addEventListener('mouseover', () => {console.log(Number(mousePoint.id))})
                battlefieldSquare.addEventListener('click', () => {
                    // console.log(player1Gameboard.activeShipList.length === ships.length)
                    if(player1Gameboard.activeShipList.length === ships.length)
                    {return console.log('you cant fire on your own ships')}
                    else if(currentShipName === undefined)
                    {return console.log('Pick a ship first, Commander')}

                    // console.log(Number(mouseHoverVariable.id))
                    // mouseClickVariable = Number(mouseHoverVariable.id)

                    //checks valid placement
                    if (mouseHoverVariable.id[1] === undefined)
                    {if (player1Gameboard.placeShip(currentShipLength, currentShipName, DOMxAxis[mouseHoverVariable.id[0]], DOMyAxis[0], DOMorientation) === undefined)
                        {return}}
                    else if (player1Gameboard.placeShip(currentShipLength, currentShipName, DOMxAxis[mouseHoverVariable.id[1]], DOMyAxis[mouseHoverVariable.id[0]], DOMorientation) === undefined)
                    {return}
 
                    // fix bug where a line can clip to second row
                    if (mouseHoverVariable.id[1] === undefined) {
                        console.log(mouseHoverVariable.id[1])
                        // console.log(DOMxAxis[mouseHoverVariable.id[0]], DOMyAxis[0])
                        player1Gameboard.placeShip(currentShipLength, currentShipName, DOMxAxis[mouseHoverVariable.id[0]], DOMyAxis[0], DOMorientation)
                    } else {
                        player1Gameboard.placeShip(currentShipLength, currentShipName, DOMxAxis[mouseHoverVariable.id[1]], DOMyAxis[mouseHoverVariable.id[0]], DOMorientation)
                    }

                    if(DOMorientation === 'horizontal')
                    {  
                        for(let i = 1; i < currentShipLength; i++)
                        document.getElementById(Number(mouseHoverVariable.id) + currentShipLength - i).classList.add('deployedShip')
                        mouseHoverVariable.classList.add('deployedShip')
                    } else if (DOMorientation === 'vertical') { 
                        for(let i = 1; i < currentShipLength ; i++)
                        document.getElementById(Number(mouseHoverVariable.id) + 10 * i).classList.add('deployedShip')
                        mouseHoverVariable.classList.add('deployedShip')
                    }
                    
                    const clear = document.querySelector('#shipSummaryHighlight')
                    clear.remove()
                    currentShipName = undefined
                    currentShipLength = undefined

                    console.log(player1Gameboard.activeShipList)
                })

                battlefieldSquare.addEventListener('contextmenu', (e) => {e.preventDefault()
                    if(DOMorientation === 'horizontal')
                    {  
                        clearSquares()
                        DOMorientation = 'vertical'
                        previewEngine(currentShipLength)
                    } else if (DOMorientation === 'vertical') { 
                        clearSquares()  
                        DOMorientation = 'horizontal'
                        previewEngine(currentShipLength)}
                })

            battlefieldSquare.textContent = i
            playField.appendChild(battlefieldSquare)
            playFieldContainer.appendChild(playField)
        }
    }

    const placeShipDom = () => {
        const renderShipSummaries =() => {
            const shipSummaryFactory = (length, shipName) => {

                const shipSummary = document.createElement('div')
                shipSummary.textContent = shipName + ' || length: ' + length
                shipSummary.classList.add('shipSummary')
                shipSummary.setAttribute('id', shipName)


                // shipSummary.addEventListener('contextmenu', (e) => {e.preventDefault(), console.log('right')})

                shipSummary.addEventListener('click', () => {
                    currentShipLength = length
                    currentShipName = shipName
                    console.log('currentShipLength ' +currentShipLength)
                    console.log('currentShipName '+currentShipName)

                    const removehightlight = document.getElementById('shipSummaryHighlight')
                    if(removehightlight != undefined || removehightlight != null)
                    {removehightlight.removeAttribute('id')}
                    shipSummary.setAttribute('id', 'shipSummaryHighlight')
                    
                })
                shipListDiv.appendChild(shipSummary)
            }
            
            ships.forEach(element => {
                shipSummaryFactory(element.shipObjectLength, element.shipObjectName)
            });
            // const cruiserSummary = shipSummaryFactory(3, 'cruiser')
            // const battleshipSummary = shipSummaryFactory(4, 'battleship')
            // const carrier = shipSummaryFactory(5, 'carrier')

        }
        renderShipSummaries()
}

    placeShipDom()
    renderxAxis()
    renderyAxis()
    renderPlayfield()
}

gameboardPlayer1Dom()

//renders CPU/player 2 gameboard

const DOMbotGameboard = () => {

    const botDOMxAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const botDOMyAxis = ['a','b','c','d','e','f','g','h','i','j']

    const botrenderxAxis = () => {
        for (let i = 0; i < 10; i ++)
        {const botxAxisSquare = document.createElement('div')
        botxAxisSquare.classList.add('botxAxisSquare')
        botxAxisSquare.textContent = botDOMxAxis[i]
        botxAxisDiv.appendChild(botxAxisSquare)
        // botplayfieldcontainer.appendChild(botxAxisDiv)
        }
    }

    const botrenderyAxis = () => {
        for (let i = 0; i < 10; i ++)
        {const botyAxisSquare = document.createElement('div')
        botyAxisSquare.classList.add('botyAxisSquare')
        botyAxisSquare.textContent = botDOMyAxis[i]
        botyAxisDiv.appendChild(botyAxisSquare)
        // botplayfieldcontainer.appendChild(botyAxisDiv)
        }
    }


    const botrenderplayField = () => {
        const previewEngine = (previewEngineLength) => {
            // const previewEngineSquare = document.getElementById(mouseClickVariable+previewEngineLength)
            if(DOMorientation === 'horizontal')
            {   // console.log((Number(mouseHoverVariable.id) + previewEngineLength - 1))
                for(let i = 1; i < previewEngineLength; i++)
                {document.getElementById(Number(mouseHoverVariable.id) + previewEngineLength - i).classList.add('battlefieldSquareHighlight')}
                
            } else if(DOMorientation === 'vertical')
                for(let i = 1; i < previewEngineLength ; i++)
                if (document.getElementById(Number(mouseHoverVariable.id) + 10 * i) === null) {return} else
                {document.getElementById(Number(mouseHoverVariable.id) + 10 * i).classList.add('battlefieldSquareHighlight')}
        }


        const botclearSquares = () => {
            let a = document.querySelectorAll('.botbattlefieldSquareHighlight')
            let b = document.querySelectorAll('.botbattlefieldSquareSelect')
            b.forEach(element => {
                element.classList.remove('botbattlefieldSquareSelect')
            });

            a.forEach(element => {
                element.classList.remove('botbattlefieldSquareHighlight')
            });
        }

            for (let i = 0; i < 100; i ++)  {
                const botbattlefieldSquare = document.createElement('div')
                botbattlefieldSquare.classList.add(`botbattlefieldSquare`)
                botbattlefieldSquare.setAttribute('id', i)
                
                botbattlefieldSquare.addEventListener('mouseover', () => {
                    mouseHoverVariable = botbattlefieldSquare, botbattlefieldSquare.classList.add('botbattlefieldSquareSelect'),
                    previewEngine(currentShipLength)})
                
                botbattlefieldSquare.addEventListener('mouseleave', () => {
                    let a = document.querySelectorAll('.battlefieldSquareHighlight')
                    let b = document.querySelectorAll('.battlefieldSquareSelect')
                    b.forEach(element => {
                        element.classList.remove('battlefieldSquareSelect')
                    });
    
                    a.forEach(element => {
                        element.classList.remove('battlefieldSquareHighlight')
                    });
                    botclearSquares()
                })
                
                botbattlefieldSquare.addEventListener('click', () => {           
                    // if (player1Gameboard.activeShipList.length < ships.length)
                    // {return console.log('Place all ships before launching attacks, Commander')}

                    (Number(mouseHoverVariable.id[1])) 

                    let botHitAttempt = [botDOMxAxis[mouseHoverVariable.id[1]], botDOMyAxis[mouseHoverVariable.id[0]]]
                    if (botHitAttempt[0] === undefined) {botHitAttempt = [botDOMxAxis[mouseHoverVariable.id[0]], 'a']}
                               
                    //function that finds coordinates corresponding to ship hit
                    for (let i = 0; i < botGameboard.activeShipList.length; i++)    
                    {
                        let shipCheck = botGameboard.activeShipList[i]
                        for (let i = 0; i < shipCheck.coordinates.length; i++)
                        {   if (shipCheck.coordinates[i].toString().includes(botHitAttempt, 0)) 
                            {
                            mouseHoverVariable.classList.add('botbattlefieldSquareHitShip')
                            return (botGameboard.receiveAttack(shipCheck, botHitAttempt), botGameboard.gameOverCheck())
                            } 
                            // else {return botGameboard.receiveAttack(shipCheck, botHitAttempt), mouseHoverVariable.classList.add('botbattlefieldSquareMissedShip')}
                        }
                    }
                    botGameboard.receiveAttack(undefined, botHitAttempt)
                    botGameboard.gameOverCheck()
                    
                    if (mouseHoverVariable.classList.contains('.botbattlefieldSquareHitShip') === false)
                    {mouseHoverVariable.classList.add('botbattlefieldSquareMissedShip')}
                    
                    
                })

                botbattlefieldSquare.addEventListener('contextmenu', (e) => {e.preventDefault()
                })

                botbattlefieldSquare.textContent = i
                botplayField.appendChild(botbattlefieldSquare)

                
            }


            }
            botrenderxAxis()
            botrenderyAxis()
            botrenderplayField()
        
    }
    
    DOMbotGameboard()
    
    // console.log(botGameboard)
    // console.log((botGameboard.activeShipList[0], [2, 'a']))

    // //function that finds coordinates corresponding to ship hit
    // for (let i = 0; i < botGameboard.activeShipList.length; i++)    
    // {
    //     let shipCheck = botGameboard.activeShipList[i]
    //     for (let i = 0; i < shipCheck.coordinates.length; i++)
    //     {if (shipCheck.coordinates[i].includes(2, 'a')) {console.log(shipCheck.shipName)}}
    // }



//algorithm for finding coordinates: using the index of Y and X to find the corresponding class for the grid
//  Example: if you want to hit g, 7
// y[6] = G; x[6] = 7
// this would correspond to the 67th tile

// shipCheck.coordinates.forEach(element => {
//     if (element.includes(2, 'a')) {return console.log(shipCheck.shipName)}
// })