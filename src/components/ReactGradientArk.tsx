import React, { useEffect } from 'react'

// base style
import './index.css'

export const GradientArk = (): JSX.Element => {
	useEffect(() => {
		const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement

		if (canvas.getContext) {
			const ctx = canvas.getContext('2d')

			const outline = {
				x: 90,
				y: 90,
				radius: 89,
				color: 'blue',
				draw: function () {
					if (ctx) {
						const gradient = ctx.createLinearGradient(0, 500, 0, 0)
						gradient.addColorStop(0, '#eea2a2')
						gradient.addColorStop(0.2, '#bbc1bf')
						gradient.addColorStop(0.45, '#57c6e1')
						gradient.addColorStop(0.8, ' #b49fda')
						gradient.addColorStop(1, '#7ac5d8')

						ctx.beginPath()
						ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
						ctx.lineWidth = 2
						ctx.lineCap = 'round'
						ctx.strokeStyle = gradient
						ctx.stroke()
					}
				},
			}

			const strokeline = {
				x: 90,
				y: 90,
				radius: 87,
				color: 'rgba(255, 255, 255, 0.1)',
				draw: function () {
					if (ctx) {
						ctx.beginPath()
						ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
						ctx.closePath()
						ctx.fillStyle = this.color
						ctx.stroke()
					}
				},
			}

			outline.draw()
			strokeline.draw()
		}
	}, [])

	return <canvas id="canvas" className="gradient-canvas" width="180" height="180" />
}
