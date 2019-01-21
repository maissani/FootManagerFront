import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import { Segment, Responsive, Visibility } from 'semantic-ui-react'
import Navigation from '../components/Navigation'
import LoginForm from '../components/Login'
import 'semantic-ui-css/semantic.min.css'
import './index.scss'

class SignIn extends React.Component {
	render() {
		const { children } = this.props
		return (
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}
				>
					<Segment
						inverted
						textAlign="center"
						style={{ minHeight: 700, padding: '1em 0em' }}
						vertical
						className="showcase"
					>
						<Navigation />
						<LoginForm {...this.props} />
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		)
	}
}

export default connect()(SignIn)
