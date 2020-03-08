import React from 'react'
import { ToggleButton, MessageButton, TimerButton, ButtonGroup } from 'jarvis9940-components'

const Item = props => {
	const { colorMode, item, layoutVal, handleGroup, handleMessage, handleTimer, handleToggle } = props

	if (item.type === 'group') {
		return (
			<ButtonGroup
				orientation={item.direction}
				colorMode={colorMode}
				alignment={item.alignment}
				buttons={item.buttons}
				active={layoutVal[item.id] || ''}
				click={handleGroup(item.id)}
			/>
		)
	}

	if (item.type === 'message') {
		return (
			<MessageButton
				colorMode={colorMode}
				alignment={item.alignment}
				onClick={() => {
					handleMessage(item.message)
				}}
			>
				{item.text}
			</MessageButton>
		)
	}

	if (item.type === 'timer') {
		return (
			<TimerButton
				colorMode={colorMode}
				alignment={item.alignment}
				onClick={() => {
					handleTimer(item.messages)
				}}
			>
				{item.text}
			</TimerButton>
		)
	}

	return (
		<ToggleButton
			id={item.id}
			active={layoutVal[item.id]}
			colorMode={colorMode}
			alignment={item.alignment}
			onClick={() => {
				handleToggle(item.id)
			}}
		>
			{item.text}
		</ToggleButton>
	)
}

export default Item
