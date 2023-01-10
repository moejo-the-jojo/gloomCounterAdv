/* eslint-disable react/prop-types */
import Button from './Button'
import React from 'react'

const Navigation = ({ dispatchCounter, counter }) => {
    return (
        <div className="navButtonContainer">
            <Button
                className={
                    counter.navbar.showCreate
                        ? 'navButtonActive'
                        : 'navButtonInactive'
                }
                actionType={'showCreate'}
                dispatchCounter={dispatchCounter}
            >
                Create
            </Button>
            <Button
                className={
                    counter.navbar.showPlayed
                        ? 'navButtonActive'
                        : 'navButtonInactive'
                }
                actionType={'showPlayed'}
                dispatchCounter={dispatchCounter}
            >
                Played
            </Button>
            <Button
                className={
                    counter.navbar.showProbability
                        ? 'navButtonActive'
                        : 'navButtonInactive'
                }
                actionType={'showProbability'}
                dispatchCounter={dispatchCounter}
            >
                Probability
            </Button>
            <Button
                className={
                    counter.navbar.showModificators
                        ? 'navButtonActive'
                        : 'navButtonInactive'
                }
                actionType={'showModificators'}
                dispatchCounter={dispatchCounter}
            >
                Modificators
            </Button>
        </div>
    )
}

export default Navigation
