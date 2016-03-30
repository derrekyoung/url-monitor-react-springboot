const React = require('react');

const Button = require('react-bootstrap').Button;

const RefreshButton = React.createClass({
	propTypes : {
		spinning : React.PropTypes.bool.isRequired
		,onClick : React.PropTypes.func.isRequired
	},

	render() {
		return (
			<Button bsStyle="info" onClick={this.props.onClick} disabled={this.props.spinning}>
	    		<RefreshSpinner spinning={this.props.spinning} /> Refresh
	    	</Button>
	    )
	}
});

const RefreshSpinner = React.createClass({
	propTypes : {
		spinning : React.PropTypes.bool.isRequired
	},

	render() {
		if (this.props.spinning) {
			return (
				<span className="glyphicon glyphicon-refresh glyphicon-spin"></span>
		    )
		} else {
			return (
				<span className="glyphicon glyphicon-refresh"></span>
			)
		}
	}
});

module.exports = RefreshButton;