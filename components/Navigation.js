import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Button, Icon, Image } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import AuthService from '../utils/AuthService'

import './navigation.scss'

const WHO_IAM = gql`
	query {
		me {
			id
			username
			role
		}
	}
`

class Navigation extends React.Component {
	constructor(props) {
		super(props)
		this.auth = new AuthService()
		this.handleConnect = this.handleConnect.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.state = {
			username: 'anonymous',
		}
	}

	componentDidMount() {
		if (this.auth.loggedIn()) {
			console.log('loggedIn')
			this.setState({ username: this.auth.getProfile().username })
		} else {
			console.log('notloggedin')
		}
	}

	handleConnect(e) {
		e.preventDefault()
		const { url } = this.props
		url.replaceTo('/')
		auth
			.login()
			.then(res => {
				console.log(res)
			})
			.catch(error => console.log(error))
	}

	handleLogout(e) {
		e.preventDefault()
		this.auth.logout()
		Router.push({ pathname: '/' })
	}

	handleAddProduct(e) {
		e.preventDefault()
		Router.push({ pathname: '/player/add' })
	}

	displayConnectButton(fixed) {
		if (!this.auth.loggedIn()) {
			return (
				<div>
					<Button
						href="/signin"
						as="a"
						inverted={fixed}
						primary={!fixed}
						style={{ marginLeft: '0.5em' }}
					>
						<Icon name="futbol outline" size="large" />
						Se connecter
					</Button>
					<Button
						href="/register"
						as="a"
						inverted={fixed}
						primary={!fixed}
						style={{ marginLeft: '0.5em' }}
					>
						<Icon name="signup" size="large" />
						S'enreregistrer
					</Button>
				</div>
			)
		}
	}

	displayAddButton(data, fixed) {
		if (data.me.role === 'ADMIN') {
			return (
				<Button
					as="a"
					onClick={this.handleAddProduct}
					inverted={fixed}
					primary={!fixed}
					style={{ marginLeft: '0.5em' }}
				>
					Admin Features
				</Button>
			)
		}
	}

	displayMenuButton(fixed) {
		if (this.auth.loggedIn()) {
			return (
				<Query query={WHO_IAM}>
					{({ loading, error, data }) => {
						if (error) {
							this.auth.logout()
							Router.push({ pathname: '/' })
						} else if (loading) {
							return <div>Loading...</div>
						} else {
							return (
								<div>
									<Button
										as="a"
										href="/dashboard"
										inverted
										primary={!fixed}
										style={{ marginLeft: '0.5em' }}
									>
										<Icon name="heart" />
										{data.me.username}
									</Button>
									{this.displayAddButton(data, fixed)}
									<Button
										as="a"
										onClick={this.handleLogout}
										inverted={fixed}
										primary={!fixed}
										style={{ marginLeft: '0.5em' }}
									>
										logout
									</Button>
								</div>
							)
						}
					}}
				</Query>
			)
		}
	}

	render() {
		const fixed = false
		return (
			<Menu
				fixed={fixed ? 'top' : null}
				inverted={fixed}
				pointing={fixed}
				secondary={fixed}
				size="large"
				style={{ background: 'transparent' }}
			>
				<Menu.Menu position="left">
					<Menu.Item>
						<Image
							size="small"
							centered
							verticalAlign="middle"
							src="static/img/logo.png"
						/>
					</Menu.Item>
				</Menu.Menu>
				<Menu.Menu position="right">
					<Menu.Item>
						{this.displayConnectButton(fixed)}
						{this.displayMenuButton(fixed)}
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		)
	}
}

Navigation.propTypes = {
	url: PropTypes.func,
}

export default connect()(Navigation)
