import { useEffect } from 'react'

// base style
import './index.css'

export const GradientArk = (): JSX.Element => {
	useEffect(() => {
		const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
		const gradientLineCount = 9 // all gradient line count
		const baseSetTime = 20 // base time for setTimeout

		if (canvas.getContext) {
			const ctx = canvas.getContext('2d')

			if (ctx) {
				ctx.globalCompositeOperation = 'destination-over'

				const baseAngle = Math.PI / Math.PI // how far has it progressed overall - 1.57
				const baseMovement = 0
				const baseStartPosition = baseAngle + baseMovement
				const baseEndPosition = baseStartPosition + 0.083

				let angle = 0 // how far will it go

				// gradient line around the image
				const outline = {
					x: 90,
					y: 90,
					radius: 88,
					redraw: function (startPosition: number, endPosition: number) {
						// let doAnim = true

						// clearRectからrequestAnimationFlameが一つのライン
						// ctx.clearRect(0, 0, 180, 180)

						const gradient = ctx.createLinearGradient(0, 500, 0, 0)
						gradient.addColorStop(0, '#eea2a2')
						gradient.addColorStop(0.2, '#bbc1bf')
						gradient.addColorStop(0.45, '#57c6e1')
						gradient.addColorStop(0.8, ' #b49fda')
						gradient.addColorStop(1, '#7ac5d8')

						const start = startPosition
						const end = endPosition + angle

						ctx.beginPath()
						ctx.arc(90, 90, 88, start, end, false)
						ctx.lineWidth = 4
						ctx.lineCap = 'round'
						ctx.strokeStyle = gradient
						ctx.stroke()

						angle += 0.002

						window.requestAnimationFrame(() => {
							outline.redraw(startPosition, endPosition)
						})
					},
					draw: function (startPositoin: number, endPosition: number) {
						window.requestAnimationFrame(() => {
							outline.redraw(startPositoin, endPosition)
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

				let count = 0
				let baseTime = 0

				const main = () => {
					if (count > gradientLineCount) return

					console.log(baseStartPosition + count * 0.5, baseEndPosition + count * 0.5)

					// end -> 8.77
					outline.draw(baseStartPosition + count * 0.5, baseStartPosition + count * 0.5)

					count += 1
					baseTime += baseSetTime

					window.requestAnimationFrame(() => {
						setTimeout(main, baseTime)
					})
				}

				// start main stroke function
				main()

				// start white line stroke function
				strokeline.draw()
			}
		}
	}, [])

	return <canvas id="canvas" className="gradient-canvas" width="180" height="180" />
}
