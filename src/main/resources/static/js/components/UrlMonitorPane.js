const React = require('react')

const isempty = require('lodash/isempty')

const Button = require('react-bootstrap').Button;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;
const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Label = require('react-bootstrap').Label;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;


const EditButtonModal = require('./EditButtonModal');



const UrlMonitorPane = React.createClass({
	propTypes : {
		urlMonitor : React.PropTypes.object.isRequired
		,editUrlMonitor : React.PropTypes.func.isRequired
		,deleteUrlMonitor : React.PropTypes.func.isRequired
	},

	getInitialState() {
    	return { 
    		expanded: false
    		,icon: 'chevron-up'
    	};
  	},

  	handleToggle(){
    	this.setState({
    		expanded: !this.state.expanded
    		,icon: (this.state.expanded ? 'chevron-up' : 'chevron-down')
    	});
  	},

	handleEdit(urlMonitor) {
		// console.log('handleEdit');
		// console.log(urlMonitor)
		// console.log(this.props.urlMonitor)

		this.props.editUrlMonitor(this.props.urlMonitor)
	},

	handleDelete(urlMonitor, event) {
		// console.log('inner handleDelete: '+urlMonitor._links.self.href)
		event.preventDefault();

		this.props.deleteUrlMonitor(urlMonitor)
	},

	renderHeader() {
		let urlMon = this.props.urlMonitor;

		return (
			<span>
				{urlMon.url}
				<span className="pull-right">
					<Glyphicon glyph={this.state.icon} bsSize="xsmall" />
				</span>
			</span>
		)
	},

	renderUrl() {
		let urlMon = this.props.urlMonitor
		let isValid = (urlMon.validUrl ? 'success' : 'danger')
		let icon = (urlMon.validUrl ? 'ok' : 'remove')

		return (
			<ListGroupItem>
				<Label bsStyle={isValid}><Glyphicon glyph={icon} /></Label>
				&nbsp;
				<strong>URL:</strong> <a href={urlMon.url}>{urlMon.url}</a>
			</ListGroupItem>
		)
	},

	renderResponse() {
		let urlMon = this.props.urlMonitor;
		let isValid = (urlMon.validResponse ? 'success' : 'danger')
		let icon = (urlMon.validResponse ? 'ok' : 'remove')

		return (
			<ListGroupItem>
				<Label bsStyle={isValid}><Glyphicon glyph={icon} /></Label>
				&nbsp;
				<strong>Response:</strong> {urlMon.response}
			</ListGroupItem>
		)
	},

	renderExpectedContent() {
		let urlMon = this.props.urlMonitor;
		let isValid = (urlMon.validContent ? 'success' : 'danger')
		let icon = (urlMon.validContent ? 'ok' : 'remove')
		let msg = (!urlMon.validContent ? '[Actual response does not contain expected content]' : '')
		
		if ( !isempty(urlMon.expectedContent) ) {
			return (
				<ListGroupItem>
					<Label bsStyle={isValid}><Glyphicon glyph={icon} /></Label>
					&nbsp;
					<strong>Expected Content:</strong> {urlMon.expectedContent} {msg}
				</ListGroupItem>
			)
		}
	},

	renderButtons() {
		let urlMon = this.props.urlMonitor;
		return (
			<ListGroupItem>
				<ButtonToolbar>
					<ButtonGroup>
						<EditButtonModal onSave={this.handleEdit} obj={urlMon} />
					</ButtonGroup>
					<ButtonGroup>
						<Button bsSize="small" onClick={this.handleDelete.bind(this, urlMon)}><Glyphicon glyph="trash" /> Delete</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</ListGroupItem>
		)
	},

	render() {
		// console.log(this.props.urlMonitor)
		let isValid = (this.props.urlMonitor.valid ? 'success' : 'danger')

		return (
			<Col md={6}>
				<Panel header={ this.renderHeader() } 
						bsStyle={isValid} 
						onClick={this.handleToggle} 
						collapsible expanded={this.state.expanded}>

					<ListGroup fill>
						{ this.renderUrl() }

						{ this.renderResponse() }

						{ this.renderExpectedContent() }

						{ this.renderButtons() }
					</ListGroup>
			    </Panel>
		    </Col>
		)
	}
});

module.exports = UrlMonitorPane;