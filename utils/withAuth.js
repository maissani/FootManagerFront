// utils/withAuth.js - a HOC for protected pages
import React, { Component } from 'react'
import cookies from 'next-cookies'
import Router from 'next/router'
import AuthService from './AuthService'

export default function withAuth(AuthComponent) {
	return class Authenticated extends Component {
		constructor(props) {
			super(props)
			this.state = {
				isLoading: true,
				token: null,
				user: null,
			}
		}

		componentDidMount() {
			const auth = new AuthService()
      if (auth.loggedIn()) {
        this.setState({ isLoading: false })
      } else {
        Router.push({ pathname: '/signin' })
      }
		}

		render() {
			const { isLoading } = this.state
			return (
				<div>
					{isLoading ? (
						<div>LOADING....</div>
					) : (
						<AuthComponent {...this.props} auth={AuthService} />
					)}
				</div>
			)
		}
	}
}
