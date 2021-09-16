import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import './gradientArk.css'

import { GradientArk } from '../components/ReactGradientArk'

export default {
	title: 'ReactGradientArk',
	component: GradientArk,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof GradientArk>

const GradientArkTemplate: ComponentStory<typeof GradientArk> = (args) => {
	return (
		<div className="gradient-container">
			<GradientArk {...args} />
			<span className="image-flame">
				<img src="/sample.jpg" alt="sample" className="image-file" />
			</span>
		</div>
	)
}

export const GradientArkWithImage = GradientArkTemplate.bind({})
