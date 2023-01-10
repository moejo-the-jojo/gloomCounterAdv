/* eslint-disable react/prop-types */
import doubleD from './Pictures/doubleD.png'
import neutral from './Pictures/neutral.png'
import minusOne from './Pictures/minusOne.png'
import minusTwo from './Pictures/minusTwo.png'
import noDMG from './Pictures/noDMG.png'
import plusOne from './Pictures/plusOne.png'
import plusTwo from './Pictures/plusTwo.png'
import Button from './Button'
import React from 'react'

const picturesArray = [
    plusOne,
    plusTwo,
    minusOne,
    minusTwo,
    noDMG,
    neutral,
    doubleD,
]

const Played = ({ counter, dispatchCounter }) => {
    const cardcounterDisplay = counter.playedCounter.filter((a) => a.count > 0)

    return (
        <div>
            <div className="playedButtonsContainer">
                {counter.playedCounter.reduce((a, b) => +a + +b.count, 0) ===
                    0 && <h1>Enter your cards first</h1>}
                {counter.playedCounter.map((item) => {
                    return (
                        item.count > 0 && (
                            <img
                                className="playedButtonsButtons"
                                id={item.name + 'ID'}
                                key={item.name + 'Played'}
                                src={picturesArray[item.position]}
                                onClick={() => {
                                    dispatchCounter({
                                        type: 'increasePlayed',
                                        name: item.name,
                                        id: item.name + 'ID',
                                    })
                                    let spinButton = document.getElementById(
                                        item.name + 'ID'
                                    )
                                    spinButton.classList.add('spinMove')
                                    setTimeout(() => {
                                        spinButton.classList.remove('spinMove')
                                    }, 1000)
                                }}
                                alt={'Button to indicate played ' + item.name}
                            ></img>
                        )
                    )
                })}
            </div>
            <div className="playedCardcounterContainer">
                {cardcounterDisplay.map((a) => (
                    <div
                        className="playedCardcounterDisplay"
                        key={'playedCardcounter' + a.name}
                    >
                        {a.display}: {a.count}
                    </div>
                ))}
                <Button
                    className="simpleButton playedCardcounterShuffleButton"
                    dispatchCounter={dispatchCounter}
                    actionType={'createPlayed'}
                >
                    Shuffle
                </Button>
            </div>
        </div>
    )
}

export default Played
