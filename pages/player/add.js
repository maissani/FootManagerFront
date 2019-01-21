import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import { Responsive, Segment, Visibility } from 'semantic-ui-react'
import Navigation from '../../components/Navigation'
import AddPlayer from '../../components/AddPlayer'
import 'semantic-ui-css/semantic.min.css'

class PlayerAdd extends React.Component {
	render() {
		const { children } = this.props
		return (
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}
				>
					<Segment style={{ minHeight: 700, padding: '0em 0em' }}>
						<Navigation />
						<AddPlayer />
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		)
	}
}

export default connect()(PlayerAdd)
