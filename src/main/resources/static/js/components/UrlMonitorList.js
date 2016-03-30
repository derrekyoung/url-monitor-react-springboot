const React = require('react')

// Utilities
const isempty = require('lodash/isempty')

// Bootstrap
const Grid = require('react-bootstrap').Grid
const Row = require('react-bootstrap').Row
const Col = require('react-bootstrap').Col

// App specific
const UrlMonitorPane = require('./UrlMonitorPane');



const UrlMonitorList = React.createClass({
	propTypes : {
		urlMonitors : React.PropTypes.array.isRequired
	},

	render() {
		let urlMonitorContainers

		if (!isempty(this.props.urlMonitors)) {
			let i = 0;
			urlMonitorContainers = this.props.urlMonitors.map(urlMonitor =>
					<UrlMonitorPane key={urlMonitor.id} 
									urlMonitor={urlMonitor} 
									deleteUrlMonitor={this.props.deleteUrlMonitor} 
									editUrlMonitor={this.props.editUrlMonitor} />
			)
		} else {
			urlMonitorContainers = <Col md={6}>No URLs added yet</Col>
		}

		return (
			<Row>
				
					{urlMonitorContainers}
				
			</Row>
		)
	}
});

module.exports = UrlMonitorList;