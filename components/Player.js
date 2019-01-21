import React from 'react'
import { connect } from 'react-redux'
import { Menu, Button, Container, List, Segment } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import AuthService from '../utils/AuthService'

const DELETE_PLAYER = gql`
	mutation($id: ID!) {
		deletePlayer(id: $id)
	}
`

const PLAYER_LIST = gql`
	query {
		me {
			id
			role
		}
		players {
			edges {
				id
				name
				description
				user {
					id
					username
				}
			}
			pageInfo {
				hasNextPage
			}
		}
	}
`

class Player extends React.Component {
	componentDidMount() {}

	onClick(event, deletePlayer) {
		deletePlayer().then(async () => {
			await this.forceUpdate()
		})
		event.preventDefault()
	}

	displayAdminButton(player, data) {
		const { id } = player
		console.log(player)
		if (data.me.role === 'ADMIN') {
			return (
				<div>
					<Mutation mutation={DELETE_PLAYER} variables={{ id }}>
						{(deletePlayer, { data, loading, error }) => (
							<List.Content>
								<Button onClick={event => this.onClick(event, deletePlayer)}>
									Delete
								</Button>
							</List.Content>
						)}
					</Mutation>
				</div>
			)
		}
	}

	render() {
		return (
			<Container>
				<List divided verticalAlign="middle">
					<Query query={PLAYER_LIST}>
						{({ loading, error, data }) => {
							if (data.me === null) {
								auth.logout()
								Router.push({ pathname: '/' })
							}
							if (loading) return 'Loading...'
							return data.players.edges.map(player => {
								return (
									<List.Item key={player.id}>
										<List.Content floated="right">
											{this.displayAdminButton(player, data)}
										</List.Content>
										<List.Content>{player.name}</List.Content>
										<List.Content>{player.description}</List.Content>
										<List.Content>
											Created by: {player.user.username}
										</List.Content>
									</List.Item>
								)
							})
						}}
					</Query>
				</List>
			</Container>
		)
	}
}

export default connect()(Player)
