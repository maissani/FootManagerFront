const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const WorkboxPlugin = require('workbox-webpack-plugin')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withSass(
	withCss({
		// eslint-disable-next-line no-unused-vars
		webpack: (config, { buildId, dev }) => {
			const oldEntry = config.entry

			config.entry = () =>
				oldEntry().then(entry => {
					// eslint-disable-next-line no-unused-expressions
					entry['main.js'] &&
						entry['main.js'].push(path.resolve('./utils/offline'))
					return entry
				})

			config.module.rules.push({
				test: /\.(png|jpg|jpeg|gif|svg|eot|otf|ttf|woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 100000,
						publicPath: './',
						outputPath: 'static/',
						name: '[name].[ext]',
					},
				},
			})

			/* Enable only in Production */
			if (!dev) {
				// Service Worker

				config.plugins.push(
					new WorkboxPlugin.InjectManifest({
						swSrc: path.join(__dirname, 'utils', 'sw.js'),
						swDest: path.join(__dirname, '.next', 'sw.js'),
						globDirectory: __dirname,
						globPatterns: [
							'static/**/*.{png,jpg,ico}', // Precache all static assets by default
						],
					})
				)
				config.module.rules.push({
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						// eslint options (if necessary)
					},
				})
			}

			return config
		},
	})
)
