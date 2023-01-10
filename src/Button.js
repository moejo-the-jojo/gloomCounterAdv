/* eslint-disable react/prop-types */
import React from 'react'

const Button = ({
    disabled,
    children,
    actionType,
    counterPayload,
    actionName,
    dispatchCounter,
    className,
}) => {
    return (
        <button
            className={className}
            disabled={disabled}
            onClick={() =>
                dispatchCounter({
                    type: actionType,
                    payload: counterPayload,
                    name: actionName,
                })
            }
        >
            {children}
        </button>
    )
}

export default Button
