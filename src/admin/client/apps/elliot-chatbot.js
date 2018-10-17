import React from 'react';
import api from 'lib/api';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import messages from 'lib/text';

export const Description = {
	key: 'elliot-chatbot',
	name: 'elliot Chatbot',
	coverUrl: '/admin-assets/images/apps/elliot-logo.png',
	description: `
    Servicio de chatbot automatizado:
    <ol>
      <li>Respuestas automáticas</li>
    </ol>
  `
};

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projectId: '',
			locale: 'es_CL'
		};
	}

	handleChange = event => {
		const newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	};

	fetchSettings = async () => {
		try {
			const { status, json } = await api.apps.settings.retrieve(
				'elliot-chatbot'
			);
			const { _id, ...settings } = json;
			this.setState({ ...settings });
		} catch (error) {
			console.log('Error fetching settings:', error.message);
		}
	};

	updateSettings = async () => {
		try {
			await api.apps.settings.update('elliot-chatbot', { ...this.state });
		} catch (error) {
			console.log('Error updating settings', error.message);
		}
	};

	componentDidMount() {
		this.fetchSettings();
	}

	render() {
		return (
			<div>
				<div>You can find Project ID using the DialogFlow Console.</div>
				<form onChange={this.handleChange}>
					<TextField
						type="text"
						id="projectId"
						fullWidth={true}
						value={this.state.projectId}
						floatingLabelText="Project ID"
					/>

					<TextField
						type="text"
						id="background"
						fullWidth={true}
						value={this.state.background}
						floatingLabelText="Chat window background color"
					/>

					<TextField
						type="text"
						id="fontFamily"
						fullWidth={true}
						value={this.state.fontFamily}
						floatingLabelText="Chat text font type"
					/>

					<TextField
						type="text"
						id="headerBgColor"
						fullWidth={true}
						value={this.state.headerBgColor}
						floatingLabelText="Headers background color"
					/>

					<TextField
						type="text"
						id="headerFontColor"
						fullWidth={true}
						value={this.state.headerFontColor}
						floatingLabelText="Header text color"
					/>

					<TextField
						type="text"
						id="headerFontSize"
						fullWidth={true}
						value={this.state.headerFontSize}
						floatingLabelText="Chat text size"
					/>

					<TextField
						type="text"
						id="botBubbleColor"
						fullWidth={true}
						value={this.state.botBubbleColor}
						floatingLabelText="Bot bubble color"
					/>

					<TextField
						type="text"
						id="botFontColor"
						fullWidth={true}
						value={this.state.botFontColor}
						floatingLabelText="Bot font color"
					/>

					<TextField
						type="text"
						id="userBubbleColor"
						fullWidth={true}
						value={this.state.userBubbleColor}
						floatingLabelText="User bubble color"
					/>

					<TextField
						type="text"
						id="userFontColor"
						fullWidth={true}
						value={this.state.userFontColor}
						floatingLabelText="Users font color"
					/>

					<TextField
						type="text"
						id="locale"
						fullWidth={true}
						value={this.state.locale}
						floatingLabelText="Locale"
						hintText="es_CL"
					/>

					<div style={{ textAlign: 'right' }}>
						<RaisedButton
							label={messages.save}
							primary
							disabled={false}
							onClick={this.updateSettings}
						/>
					</div>
				</form>
			</div>
		);
	}
}
