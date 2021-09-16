import React, { useEffect } from 'react'

// base style
import './index.css'

export const GradientArk = (): JSX.Element => {
	useEffect(() => {
		function init() {
			window.requestAnimationFrame(draw)
		}

		const time = new Date()

		function draw() {
			const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement

			if (canvas.getContext) {
				const ctx = canvas.getContext('2d')

				if (ctx) {
					const outline = {
						x: 90,
						y: 90,
						radius: 88,
						draw: function () {
							const gradient = ctx.createLinearGradient(0, 500, 0, 0)
							gradient.addColorStop(0, '#eea2a2')
							gradient.addColorStop(0.2, '#bbc1bf')
							gradient.addColorStop(0.45, '#57c6e1')
							gradient.addColorStop(0.8, ' #b49fda')
							gradient.addColorStop(1, '#7ac5d8')

							ctx.globalCompositeOperation = 'destination-over'
							ctx.clearRect(0, 0, 180, 180)

							let j = 0.005
							for (let i = 1.3; i <= 3.3; i) {
								const startAngle = i
								const endAngle = i + 0.02 + j

								ctx.beginPath()
								ctx.arc(this.x, this.y, this.radius, Math.PI * startAngle, Math.PI * endAngle, false)
								ctx.lineWidth = 4
								ctx.lineCap = 'round'
								ctx.strokeStyle = gradient
								ctx.stroke()

								i = i + 0.08
								j = j + 0.002
							}
						},
					}

					const strokeline = {
						x: 90,
						y: 90,
						radius: 87,
						color: 'rgba(0, 0, 0, 0.1)',
						draw: function () {
							ctx.beginPath()
							ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
							ctx.lineWidth = 2
							ctx.strokeStyle = this.color
							ctx.stroke()
						},
					}

					outline.draw()
					strokeline.draw()
				}
			}
		}

		init()
	}, [])

	return <canvas id="canvas" className="gradient-canvas" width="180" height="180" />
}
