/* eslint-disable react/prop-types */
import Canvas from './Canvas'
import React from 'react'

const Probability = ({ counter }) => {
    return (
        <div className="canvasContainer">
            <Canvas counter={counter} />
        </div>
    )
}

export default Probability
