import React from 'react'
import { connect } from 'react-redux'
import { Button, Container, Form, Segment } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import AuthService from '../utils/AuthService'
import ErrorMessage from './Error'

const ADD_PLAYER = gql`
	mutation($name: String!, $description: String!) {
		createPlayer(name: $name, description: $description) {
			id
			name
			description
		}
	}
`

const INITIAL_STATE = {
	name: '',
	description: '',
}

class AddPlayer extends React.Component {
	state = { ...INITIAL_STATE }

	componentDidMount() {}

	onChange = event => {
		const { name, value } = event.target
		const expectedValue = value
		this.setState({ [name]: expectedValue })
	}

	onSubmit = (event, addPlayer) => {
		addPlayer().then(async () => {
			this.setState({ ...INITIAL_STATE })
			await Router.push({ pathname: '/dashboard' })
		})

		event.preventDefault()
	}

	render() {
		const { name, description } = this.state
		const isInvalid = name === '' || description === ''
		return (
			<Container>
				<Mutation mutation={ADD_PLAYER} variables={{ name, description }}>
					{(addPlayer, { loading, error }) => (
						<Form
							size="large"
							autoComplete="on"
							onSubmit={event => this.onSubmit(event, addPlayer)}
						>
							<Segment stacked>
								<Form.Input
									fluid
									icon="user"
									iconPosition="left"
									placeholder="name"
									name="name"
									value={name}
									onChange={this.onChange}
									type="text"
								/>
								<Form.Input
									fluid
									icon="user"
									iconPosition="left"
									placeholder="description"
									name="description"
									value={description}
									onChange={this.onChange}
									type="text"
								/>
								<Button
									disabled={isInvalid || loading}
									color="teal"
									fluid
									size="large"
									type="sumbit"
								>
									Add a Player
								</Button>
							</Segment>
							{error && <ErrorMessage error={error} />}
						</Form>
					)}
				</Mutation>
			</Container>
		)
	}
}

export default connect()(AddPlayer)
