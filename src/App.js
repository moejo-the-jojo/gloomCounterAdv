import './App.css'
import React from 'react'
import Create from './Create'
import Played from './Played'
import Probability from './Probability'
import Modificators from './Modificators'
import Navigation from './Navigation'

const storageKey = 'savedDeck'

const counterReducer = (state, action) => {
    switch (action.type) {
        case 'INCREASE/DECREASE':
            return {
                ...state,
                createCounter: state.createCounter.map((a) => {
                    let returnValue = { ...a }
                    if (a.name === action.name) {
                        returnValue['count'] =
                            returnValue['count'] + action.payload
                    }
                    return returnValue
                }),
            }
        case 'increasePlayed':
            return {
                ...state,
                playedCounter: state.playedCounter.map((a) => {
                    let returnValue = { ...a }
                    if (a.name === action.name) {
                        returnValue['count'] = returnValue['count'] - 1
                    }
                    return returnValue
                }),
            }
        case 'createPlayed':
            return { ...state, playedCounter: [...state.createCounter] }
        case 'showCreate':
        case 'showPlayed':
        case 'showProbability':
        case 'showModificators': {
            let testbar = { ...state.navbar }
            for (let object in testbar) {
                if (object === action.type) {
                    testbar[object] = true
                } else {
                    testbar[object] = false
                }
            }
            return { ...state, navbar: testbar }
        }
        case 'showReset':
            return { ...state, showReset: !state.showReset }
        case 'RESET':
            return structuredClone(initialState)
        default:
            return state
    }
}

const initialState = {
    createCounter: [
        {
            name: 'Counter Plus One',
            count: 0,
            position: 0,
            display: '+1',
            enoughDMG: false,
            color: 'darkgreen',
        },
        {
            name: 'Counter Plus Two',
            count: 0,
            position: 1,
            display: '+2',
            enoughDMG: false,
            color: 'limegreen',
        },
        {
            name: 'Counter Minus One',
            count: 0,
            position: 2,
            display: '-1',
            enoughDMG: false,
            color: 'darkred',
        },
        {
            name: 'Counter Minus Two',
            count: 0,
            position: 3,
            display: '-2',
            enoughDMG: false,
            color: 'red',
        },
        {
            name: 'Counter Negated',
            count: 0,
            position: 4,
            display: 'Negated',
            enoughDMG: false,
            color: 'orange',
        },
        {
            name: 'Counter Neutral',
            count: 0,
            position: 5,
            display: '+0',
            enoughDMG: false,
            color: 'tan',
        },
        {
            name: 'Counter Double',
            count: 0,
            position: 6,
            display: 'X2',
            enoughDMG: false,
            color: 'darkviolet',
        },
    ],
    showReset: false,
    playedCounter: [undefined],
    navbar: {
        showCreate: true,
        showPlayed: false,
        showProbability: false,
        showModificators: false,
    },
}

const App = () => {
    const [counter, dispatchCounter] = React.useReducer(
        counterReducer,
        JSON.parse(localStorage.getItem(storageKey)) || initialState
    )

    React.useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(counter))
    }, [counter])

    React.useEffect(() => {
        dispatchCounter({ type: 'createPlayed' })
    }, [counter.createCounter])

    React.useEffect(() => {
        document.title = 'Gloomcounter'
    }, [])

    return (
        <div className="appBody">
            <Navigation counter={counter} dispatchCounter={dispatchCounter} />

            {counter.navbar.showCreate && (
                <Create counter={counter} dispatchCounter={dispatchCounter} />
            )}

            {counter.navbar.showPlayed && (
                <Played counter={counter} dispatchCounter={dispatchCounter} />
            )}

            {counter.navbar.showProbability && (
                <Probability
                    counter={counter}
                    dispatchCounter={dispatchCounter}
                />
            )}

            {counter.navbar.showModificators && (
                <Modificators
                    counter={counter}
                    dispatchCounter={dispatchCounter}
                />
            )}
        </div>
    )
}

export default App
