import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import {
	Responsive,
	Segment,
	Visibility,
	Header,
	Container,
} from 'semantic-ui-react'
import withAuth from '../utils/withAuth'
import Navigation from '../components/Navigation'
import Player from '../components/Player'

import 'semantic-ui-css/semantic.min.css'

class Dashboard extends React.Component {
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
						style={{ minHeight: 700, padding: '0em 0em' }}
						vertical
					>
						<Navigation />
						<Player />
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		)
	}
}

export default connect()(withAuth(Dashboard))
