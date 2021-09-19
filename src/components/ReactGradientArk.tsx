import React, { useEffect } from 'react'

// base style
import './index.css'

export const GradientArk = (): JSX.Element => {
	useEffect(() => {
		const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement

		const time = new Date()

		if (canvas.getContext) {
			const ctx = canvas.getContext('2d')

			if (ctx) {
				ctx.globalCompositeOperation = 'destination-over'

				let angle = 0
				let movement = 0
				const startPosition = Math.PI / -1.6
				const gradientLine = 40

				const outline = {
					x: 90,
					y: 90,
					radius: 88,
					draw: function (i: number) {
						ctx.clearRect(0, 0, 180, 180)

						const gradient = ctx.createLinearGradient(0, 500, 0, 0)
						gradient.addColorStop(0, '#eea2a2')
						gradient.addColorStop(0.2, '#bbc1bf')
						gradient.addColorStop(0.45, '#57c6e1')
						gradient.addColorStop(0.8, ' #b49fda')
						gradient.addColorStop(1, '#7ac5d8')

						angle += Math.PI / 40 // how far will it go
						if (angle < 0 || angle > Math.PI * 2) {
							angle = 0 // return after one lap
						}

						const start = startPosition + movement
						const end = angle - Math.PI / 2

						ctx.beginPath()
						ctx.arc(90, 90, 88, start, end, false)
						ctx.lineWidth = 4
						ctx.lineCap = 'round'
						ctx.strokeStyle = gradient
						ctx.stroke()

						movement += Math.PI / 240

						window.requestAnimationFrame(outline.draw)
					},
				}

				const strokeline = {
					x: 90,
					y: 90,
					radius: 87,
					color: 'rgba(255, 255, 255, 0.1)',
					draw: function () {
						ctx.beginPath()
						ctx.arc(90, 90, 87, 0, Math.PI * 2, true)
						ctx.lineWidth = 2
						ctx.strokeStyle = this.color
						ctx.stroke()
					},
				}

				for (let i = 0; i < 1; i++) {
					outline.draw(i)
				}
				strokeline.draw()
			}
		}
	}, [])

	return <canvas id="canvas" className="gradient-canvas" width="180" height="180" />
}
