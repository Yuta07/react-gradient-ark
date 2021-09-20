import React, { useEffect } from 'react'

// base style
import './index.css'

export const GradientArk = (): JSX.Element => {
	useEffect(() => {
		const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement

		if (canvas.getContext) {
			const ctx = canvas.getContext('2d')

			if (ctx) {
				ctx.globalCompositeOperation = 'destination-over'

				const gradientLineCount = 40 // all gradient line count

				const baseAngle = Math.PI / 2 // how far has it progressed overall
				const baseMovement = 0
				const basePosition = baseAngle + baseMovement

				let angle = 0 // how far will it go
				let movement = 0

				// gradient line
				const outline = {
					x: 90,
					y: 90,
					radius: 88,
					redraw: function (startPosition?: number, endPosition?: number) {
						let doAnim = true

						// clearRectからrequestAnimationFlameが一つのライン
						ctx.clearRect(0, 0, 180, 180)

						const gradient = ctx.createLinearGradient(0, 500, 0, 0)
						gradient.addColorStop(0, '#eea2a2')
						gradient.addColorStop(0.2, '#bbc1bf')
						gradient.addColorStop(0.45, '#57c6e1')
						gradient.addColorStop(0.8, ' #b49fda')
						gradient.addColorStop(1, '#7ac5d8')

						const start = basePosition + movement
						const end = Math.PI / 2 + angle

						angle += 0.1

						// animation stop position
						if (end > 2) {
							doAnim = false
						}

						ctx.beginPath()
						ctx.arc(90, 90, 88, start, end, false)
						ctx.lineWidth = 4
						ctx.lineCap = 'round'
						ctx.strokeStyle = gradient
						ctx.stroke()

						movement += Math.PI / 200

						if (!doAnim) return

						window.requestAnimationFrame(outline.redraw)
					},
					draw: function () {
						// for (let i = 0; i < 40; i++) {
						// baseAngle += Math.PI / 80
						// baseMovement += Math.PI / 240
						// basePosition = baseAngle + baseMovement + 0.05
						outline.redraw(1, 1)
						// }

						let count = 1
						const intervalID = setInterval(() => {
							if (count > gradientLineCount) clearInterval(intervalID)

							outline.redraw(1, 1)

							count++
						}, 100)
					},
				}

				// white line around the image
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

				window.requestAnimationFrame(outline.draw)
				strokeline.draw()
			}
		}
	}, [])

	return <canvas id="canvas" className="gradient-canvas" width="180" height="180" />
}
