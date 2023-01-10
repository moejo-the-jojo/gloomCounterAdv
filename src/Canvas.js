/* eslint-disable react/prop-types */
import { useRef } from 'react'
import React from 'react'
import { useEffect } from 'react'

const Canvas = ({ counter }) => {
    const canvasRef = useRef(null)
    const [hoverProb, setHoverProb] = React.useState('')

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const totalCards = counter.playedCounter.reduce(
            (a, b) => +a + +b.count,
            0
        )
        const diagramArray = counter.playedCounter.filter((a) => a.count > 0)
        let startRad = 0
        let endRad = 0
        let pathObj = {}

        for (let i = 0; i < diagramArray.length; i++) {
            endRad =
                startRad +
                (diagramArray[i].count / totalCards) * 100 * 0.062831853071796
            ctx.fillStyle = diagramArray[i].color
            pathObj[i] = new Path2D()
            pathObj[i].moveTo(centerX, centerY)
            pathObj[i].arc(centerX, centerY, centerY / 2, startRad, endRad)
            ctx.stroke(pathObj[i])
            ctx.fill(pathObj[i])
            ctx.font = '3vh PirataOne-Gloomhaven'
            ctx.textBaseline = 'middle'
            ctx.textAlign = 'center'
            ctx.fillStyle = 'black'
            const text = diagramArray[i].display
            ctx.fillText(
                text,
                centerX +
                    Math.cos(startRad + (endRad - startRad) / 2) *
                        (centerY / 3),
                centerY +
                    Math.sin(startRad + (endRad - startRad) / 2) * (centerY / 3)
            )
            startRad = endRad
        }

        for (let i = 0; i < Object.keys(pathObj).length; i++) {
            canvas.addEventListener('mousemove', (event) => {
                if (
                    ctx.isPointInPath(
                        pathObj[i],
                        event.offsetX,
                        event.offsetY + window.innerHeight / 34
                    )
                ) {
                    setHoverProb(
                        ((diagramArray[i].count / totalCards) * 100).toFixed(
                            2
                        ) + '%'
                    )
                }
            })
        }

        ctx.fillStyle = 'white'
        ctx.fillRect(centerX + centerY / 2, centerY - 40, 800, 60)
        ctx.fillStyle = 'black'
        ctx.fillText(hoverProb, centerX + centerY, centerY)
    }, [hoverProb])

    return (
        <canvas
            id="canvasStyle"
            height={window.innerHeight}
            width={window.innerWidth}
            ref={canvasRef}
        />
    )
}

export default Canvas
