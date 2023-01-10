/* eslint-disable react/prop-types */
import Button from './Button'
import React from 'react'

const Create = ({ counter, dispatchCounter }) => {
    return (
        <div>
            {counter.createCounter.map((item) => {
                return (
                    <div key={item.name}>
                        <h2 className="createHeaders">
                            {item.name}: {item.count}
                        </h2>
                        <div className="createButtonsContainer">
                            <Button
                                className="createButtonsIncrease"
                                counter={item.count}
                                actionType={'INCREASE/DECREASE'}
                                counterPayload={1}
                                actionName={item.name}
                                dispatchCounter={dispatchCounter}
                            >
                                Increase
                            </Button>
                            <Button
                                className="createButtonsDecrease"
                                counter={item.count}
                                disabled={!item.count}
                                actionType={'INCREASE/DECREASE'}
                                counterPayload={-1}
                                actionName={item.name}
                                dispatchCounter={dispatchCounter}
                            >
                                Decrease
                            </Button>
                        </div>
                    </div>
                )
            })}

            <Button
                className="simpleButton showResetButton"
                dispatchCounter={dispatchCounter}
                actionType={'showReset'}
            >
                Reset
            </Button>
            {counter.showReset && (
                <div>
                    <Button
                        className="simpleButton acceptButton"
                        dispatchCounter={dispatchCounter}
                        actionType={'RESET'}
                    >
                        Confirm
                    </Button>
                    <Button
                        className="simpleButton cancelButton"
                        dispatchCounter={dispatchCounter}
                        actionType={'showReset'}
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Create
