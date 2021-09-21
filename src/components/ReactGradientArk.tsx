import React, { useEffect } from 'react'

// base style
import './index.css'

export const GradientArk = (): JSX.Element => {
	useEffect(() => {
		const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
		const gradientLineCount = 40 // all gradient line count

		if (canvas.getContext) {
			const ctx = canvas.getContext('2d')

			if (ctx) {
				ctx.globalCompositeOperation = 'destination-over'

				const baseAngle = Math.PI / 2 // how far has it progressed overall
				const baseMovement = 0
				const baseStartPosition = baseAngle + baseMovement
				const baseEndPosition = baseStartPosition + 0.167

				let angle = 0 // how far will it go

				// gradient line
				const outline = {
					x: 90,
					y: 90,
					radius: 88,
					redraw: function (startPosition: number, endPosition: number) {
						let doAnim = true

						// clearRectからrequestAnimationFlameが一つのライン
						// ctx.clearRect(0, 0, 180, 180)

						const gradient = ctx.createLinearGradient(0, 500, 0, 0)
						gradient.addColorStop(0, '#eea2a2')
						gradient.addColorStop(0.2, '#bbc1bf')
						gradient.addColorStop(0.45, '#57c6e1')
						gradient.addColorStop(0.8, ' #b49fda')
						gradient.addColorStop(1, '#7ac5d8')

						const start = Number(startPosition)
						const end = endPosition + angle

						// animation stop position
						if (end > Number(endPosition)) {
							doAnim = false
						}

						ctx.beginPath()
						ctx.arc(90, 90, 88, start, end, false)
						ctx.lineWidth = 4
						ctx.lineCap = 'round'
						ctx.strokeStyle = gradient
						ctx.stroke()

						angle += 0.02

						if (!doAnim) return

						window.requestAnimationFrame(() => {
							outline.redraw(startPosition, endPosition)
						})
					},
					draw: function (a: number, b: number) {
						window.requestAnimationFrame(() => {
							outline.redraw(a, b)
						})
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

				let count = 1
				let baseTime = 0

				const main = () => {
					if (count > gradientLineCount) return

					outline.draw(baseStartPosition + count * 0.167, baseEndPosition + count * 0.167)
					// outline.draw(baseStartPosition + 0.167 + 0.15, baseEndPosition + 0.167 + 0.15)

					count += 1
					baseTime += 5

					setTimeout(main, baseTime)
				}

				main()

				strokeline.draw()
			}
		}
	}, [])

	return <canvas id="canvas" className="gradient-canvas" width="180" height="180" />
}
