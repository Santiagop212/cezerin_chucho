import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import ChatComponent from './Chat';
import api from '../api';

export default class Bot extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		enabled: false,
		steps: [
			{
				id: 'welcome',
				message: '¡Hola! Me llamo Ubot. ¿En qué puedo ayudarte?',
				trigger: 'question'
			},
			{
				id: 'question',
				user: true,
				trigger: 'answer'
			},
			{
				id: 'answer',
				component: <ChatComponent />,
				asMessage: true,
				trigger: 'question'
			}
		],
		theme: {}
	};

	async componentDidMount() {
		try {
			const { status, json } = await api.ajax.chatbot.getSettings();
			if (status === 200 && json.theme) {
				this.setState({ theme: { ...json.theme }, enabled: true });
			}
		} catch (error) {
			console.log('Error getting Chatbot Settings:', error.message);
		}
	}

	render() {
		if (this.state.enabled) {
			return (
				<ThemeProvider theme={this.state.theme}>
					<ChatBot floating steps={this.state.steps} />
				</ThemeProvider>
			);
		} else {
			return <div />;
		}
	}
}
