import { useEffect } from 'react'

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

				let angle = 0 // how far will it go
				let movement = 0

				// gradient line around the image
				const gradientLine = {
					angle: 0, // how far will it go
					movement: 0,
					draw: function (startPosition: number, baseStartEndPosition: number, endPosition: number, count: number) {
						const start = startPosition + angle
						const end = baseStartEndPosition + movement

						const gradient = ctx.createLinearGradient(0, 500, 0, 0)
						gradient.addColorStop(0, '#eea2a2')
						gradient.addColorStop(0.2, '#bbc1bf')
						gradient.addColorStop(0.45, '#57c6e1')
						gradient.addColorStop(0.8, ' #b49fda')
						gradient.addColorStop(1, '#7ac5d8')

						ctx.save()

						ctx.beginPath()
						ctx.arc(90, 90, 88, start, end, false)
						ctx.lineWidth = 2
						ctx.lineCap = 'round'
						ctx.strokeStyle = gradient
						ctx.stroke()

						ctx.restore()

						if (end < endPosition) {
							angle += 0.01
							movement += 0.015
						}

						requestAnimationFrame(() => {
							this.draw(startPosition, baseStartEndPosition, endPosition, count)
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
						ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
						ctx.lineWidth = 1
						ctx.strokeStyle = this.color
						ctx.stroke()
					},
				}

				let count = 0
				let baseStartPosition = Math.PI / Math.PI
				let baseStartEndPosition = baseStartPosition + 0.01
				let baseEndPosition = baseStartPosition + 0.05 + 0.01

				const main = () => {
					if (count > gradientLineCount) return

					window.requestAnimationFrame(() => {
						gradientLine.draw(baseStartPosition, baseStartEndPosition, baseEndPosition, count)
					})

					count += 1

					if (count > 1) {
						baseStartPosition = baseEndPosition + 0.05
						baseStartEndPosition = baseStartPosition + 0.01 * count
						baseEndPosition = baseStartPosition + 0.05 + 0.02 * count
					}

					setTimeout(main, 5 * count)
				}

				// start main stroke function
				main()

				// start white line stroke function
				strokeline.draw()
			}
		}

		return
	}, [])

	return <canvas id="canvas" className="gradient-canvas" width="180" height="180" />
}
