/* eslint-disable react/prop-types */
import React from 'react'

const initialMods = {
    health: 0,
    shield: 0,
    baseDMG: 0,
    poison: false,
    otherMods: 0,
    calcRdy: false,
}

const modsReducer = (state, action) => {
    switch (action.type) {
        case 'healthChange':
            return { ...state, health: action.payload, calcRdy: false }
        case 'shieldChange':
            return { ...state, shield: action.payload, calcRdy: false }
        case 'DMGChange':
            return { ...state, baseDMG: action.payload, calcRdy: false }
        case 'poisonChange':
            return { ...state, poison: action.payload, calcRdy: false }
        case 'otherModsChange':
            return { ...state, otherMods: action.payload, calcRdy: false }
        case 'calcRdy': {
            let neededDMG = parseInt(state.health) + parseInt(state.shield)
            let enoughDMG = action.payload.playedCounter.map((a) => {
                switch (a.display) {
                    case 'X2':
                        return (a.enoughDMG =
                            (parseInt(state.baseDMG) + (state.poison ? 1 : 0)) *
                                2 +
                                parseInt(state.otherMods) >=
                            parseInt(neededDMG))
                    case 'Negated':
                        return (a.enoughDMG = false)
                    default:
                        return (a.enoughDMG =
                            parseInt(state.baseDMG) +
                                (state.poison ? 1 : 0) +
                                parseInt(a.display) +
                                parseInt(state.otherMods) >=
                            parseInt(neededDMG))
                }
            })
            return { ...state, calcRdy: true, playedCounter: enoughDMG }
        }
        case 'resetAll':
            return { ...initialMods }
        default:
            return state
    }
}

const Modificators = ({ counter }) => {
    const totalCards = counter.playedCounter.reduce((a, b) => +a + +b.count, 0)

    const [mods, dispatchMods] = React.useReducer(
        modsReducer,
        JSON.parse(localStorage.getItem('SaveTheMods')) || initialMods
    )

    React.useEffect(() => {
        localStorage.setItem('SaveTheMods', JSON.stringify(mods))
    }, [mods])

    const handleChange = (e) => {
        dispatchMods({ type: e.target.id + 'Change', payload: e.target.value })
    }

    const handlePoison = (e) => {
        dispatchMods({ type: 'poisonChange', payload: e.target.checked })
    }

    const calculateProb = () => {
        dispatchMods({ type: 'calcRdy', payload: counter })
    }

    return (
        <div>
            <div className="modificatorsInputContainer">
                <div>
                    <label>
                        Enter Health: <span />
                        <input
                            type="number"
                            id="health"
                            name="EnemyHealth"
                            onChange={handleChange}
                            value={mods.health}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Enter Amount of Shield: <span />
                        <input
                            type="number"
                            id="shield"
                            name="EnemyShield"
                            onChange={handleChange}
                            value={mods.shield}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Enter Base DMG: <span />
                        <input
                            type="number"
                            id="DMG"
                            name="baseDMG"
                            onChange={handleChange}
                            value={mods.baseDMG}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Poison?: <span />
                        <input
                            type="checkbox"
                            id="poison"
                            name="poison"
                            onChange={handlePoison}
                            checked={mods.poison}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Other modifiers: <span />
                        <input
                            type="number"
                            id="otherMods"
                            name="otherMods"
                            onChange={handleChange}
                            value={mods.otherMods}
                        />
                    </label>
                </div>
            </div>
            <div>
                <button
                    className="modificatorsInputCalculate"
                    onClick={calculateProb}
                >
                    Calculate
                </button>
                <button
                    className="modificatorsInputReset"
                    onClick={() => dispatchMods({ type: 'resetAll' })}
                >
                    Reset All
                </button>
            </div>

            {mods.calcRdy && (
                <div className="modificatorsResultsContainer">
                    <hr />
                    Probability:{' '}
                    <div className="modificatorsResultsPercent">
                        {(
                            (counter.playedCounter
                                .filter((a) => a.enoughDMG)
                                .reduce((a, b) => a + b.count, 0) /
                                totalCards) *
                            100
                        ).toFixed(2)}
                        %
                    </div>
                </div>
            )}
            {mods.calcRdy &&
                (counter.playedCounter.filter((a) => a.enoughDMG).length > 0 ? (
                    <div className="modificatorsResultsContainer">
                        <br />
                        Possible Cards:{' '}
                        {counter.playedCounter
                            .filter((a) => a.enoughDMG)
                            .map((item) => {
                                return (
                                    <li key={item.display + 'key'}>
                                        {item.display}
                                    </li>
                                )
                            })}
                    </div>
                ) : (
                    <div className="modificatorsResultsContainer">
                        <br />
                        Its not possible...
                    </div>
                ))}
        </div>
    )
}

export default Modificators
