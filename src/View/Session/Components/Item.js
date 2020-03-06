import React from 'react'
import { ToggleButton, MessageButton, TimerButton, ButtonGroup } from 'jarvis9940-components'

const Item = props => {
	const { colorMode, item, layoutVal, handleGroup, handleMessage, handleTimer, handleToggle } = props

	if (item.type === 'group') {
		return (
			<React.Fragment>
				<ButtonGroup
					orientation={item.direction}
					colorMode={colorMode}
					alignment={item.alignment}
					buttons={item.buttons}
					active={layoutVal[item.id] || ''}
					click={handleGroup(item.id)}
				/>
			</React.Fragment>
		)
	}

	if (item.type === 'message') {
		return (
			<React.Fragment>
				<MessageButton
					colorMode={colorMode}
					alignment={item.alignment}
					onClick={() => {
						handleMessage(item.message)
					}}
				>
					{item.text}
				</MessageButton>
			</React.Fragment>
		)
	}

	if (item.type === 'timer') {
		return (
			<React.Fragment>
				<TimerButton
					colorMode={colorMode}
					alignment={item.alignment}
					onClick={() => {
						handleTimer([{ message: item.message, time: item.time, showTime: item.showTime ?? false }])
					}}
				>
					{item.text}
				</TimerButton>
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
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
		</React.Fragment>
	)
}

export default Item
