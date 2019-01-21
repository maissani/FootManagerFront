import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import { Segment, Responsive, Visibility } from 'semantic-ui-react'
import Navigation from '../components/Navigation'
import RegisterForm from '../components/Register'
import 'semantic-ui-css/semantic.min.css'
import './index.scss'

class Register extends React.Component {
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
						<RegisterForm {...this.props} />
					</Segment>
				</Visibility>
				{children}
			</Responsive>
		)
	}
}

export default connect()(Register)
