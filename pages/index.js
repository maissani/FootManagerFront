import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import {
	Container,
	Header,
	Responsive,
	Segment,
	Visibility,
} from 'semantic-ui-react'
import Navigation from '../components/Navigation'

import 'semantic-ui-css/semantic.min.css'
import './index.scss'

import AuthService from '../utils/AuthService'

const HomepageHeading = ({ mobile }) => (
	<Container text>
		<Header
			as="h1"
			content="FM2019"
			inverted
			style={{
				fontSize: mobile ? '2em' : '4em',
				lineHeight: "0.1em'",
				fontWeight: 'normal',
				marginBottom: 0,
			}}
		/>
		<Header
			as="h6"
			inverted
			style={{
				fontSize: mobile ? '1em' : '2em',
				fontWeight: 'normal',
				marginBottom: 0,
			}}
		>
			Manage & Improve Your Club
		</Header>
	</Container>
)

const Auth = new AuthService('http://localhost:8000')

class Index extends React.Component {
	static async getInitialProps(ctx) {
		const { req, query, params } = ctx
		const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
		return { userAgent }
	}

	componentDidMount() {
		this.setState({ isLoading: false })
	}

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
						className="showcase"
					>
						<Navigation />
						<HomepageHeading {...this.props} />
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		)
	}
}

export default connect()(Index)
