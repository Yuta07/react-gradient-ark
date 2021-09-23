import { useEffect } from 'react'

// base style
import './index.css'

export const GradientArk = (): JSX.Element => {
	useEffect(() => {
		const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
		const gradientLineCount = 5 // all gradient line count
		const baseSetTime = 5 // all gradient line count

		if (canvas.getContext) {
			const ctx = canvas.getContext('2d')

			if (ctx) {
				ctx.globalCompositeOperation = 'destination-over'

				let baseStartPosition = Math.PI / Math.PI
				let baseEndPosition = baseStartPosition + 0.05

				let angle = 0 // how far will it go
				let movement = 0

				// gradient line around the image
				const draw = (startPosition: number, endPosition: number, count: number) => {
					const start = startPosition + angle
					const end = startPosition + angle + movement

					if (end < endPosition) ctx.clearRect(0, 0, 180, 180)

					const gradient = ctx.createLinearGradient(0, 500, 0, 0)
					gradient.addColorStop(0, '#eea2a2')
					gradient.addColorStop(0.2, '#bbc1bf')
					gradient.addColorStop(0.45, '#57c6e1')
					gradient.addColorStop(0.8, ' #b49fda')
					gradient.addColorStop(1, '#7ac5d8')

					ctx.save()

					ctx.beginPath()
					ctx.arc(90, 90, 88, start, end, false)
					ctx.lineWidth = 4
					ctx.lineCap = 'round'
					ctx.strokeStyle = gradient
					ctx.stroke()

					angle += 0.005
					movement += 0.004

					ctx.restore()

					window.requestAnimationFrame(() => {
						draw(startPosition, endPosition, count)
					})
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
						ctx.lineWidth = 2
						ctx.strokeStyle = this.color
						ctx.stroke()
					},
				}

				let count = 0
				let baseTime = 5

				const main = () => {
					if (count > gradientLineCount) return

					draw(baseStartPosition, baseEndPosition, count)

					count += 1
					baseTime += baseSetTime
					baseStartPosition = baseEndPosition + 0.05
					baseEndPosition = baseStartPosition + 0.05 * count

					setTimeout(main, baseTime)
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
