const React = require('react');

const Modal = require('react-bootstrap').Modal;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Input = require('react-bootstrap').Input;

const trim = require('lodash/trim')

import ValidationUtil from '../util/ValidationUtil'

const AddButtonModal = React.createClass({
	propTypes : {
		onSave : React.PropTypes.func.isRequired
	},

	getInitialState() {
    	return { 
    		showModal: false 
    		,url: ''
    		,expectedContent: ''
    		,validation: null
    		,help: ''
    	};
  	},

  	open() {
    	this.setState({ showModal: true });
  	},

  	close() {
    	this.setState({ showModal: false });

    	this.reset()
  	},

  	reset() {
  		this.refs.urlMonitorForm.reset()
		this.setState({ 
    		url: ''
    		,expectedContent: ''
			,validation: null
    		,help: ''
		});
  	},

  	save(event) {
  		event.preventDefault()

  		const newUrl = this.refs.url.getValue()

  		let result = ValidationUtil.validateUrl(newUrl)
  		if ( !result.valid ) {
  			this.setState({ 
  				validation: 'error'
  				,help: result.reason 
  			});

    		return
    	}

  		let urlMonitor = {
			url: trim(newUrl)
			,expectedContent: trim(this.refs.expectedContent.getValue())
		}

  		this.props.onSave(urlMonitor)

	    this.close()
  	},

	render() {
		return (
			<span>
				<Button bsStyle="info" onClick={this.open}><Glyphicon glyph="plus" /> New</Button>

				<Modal show={this.state.showModal} onHide={this.close}>
				      <Modal.Header closeButton>
				        <Modal.Title>Add URL Monitor</Modal.Title>
				      </Modal.Header>
				      <Modal.Body>
						<form ref="urlMonitorForm" className="form-horizontal" onSubmit={this.save}>
						    <Input type="text" label="URL" 
						    	   	name="url" ref="url" 
						    	   	defaultValue={this.state.url}
						    		placeholder="http://www.example.com"
						    		help={this.state.help}
        							bsStyle={this.state.validation}
        							hasFeedback
						    		labelClassName="col-xs-2" wrapperClassName="col-xs-10"
						    		autofocus />

						    <Input type="text" 
						    		label="Expected Content" 
						    	   	name="expectedContent" ref="expectedContent" 
						    		help="Text you expect the response to contain"
        							hasFeedback
						    		labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
						</form>
				      </Modal.Body>
				      <Modal.Footer>
				        <Button bsStyle="primary" type="submit" onClick={this.save}>Save</Button>
				        <Button bsStyle="danger" onClick={this.close}><Glyphicon glyph="remove-sign" /> Close</Button>
				      </Modal.Footer>
				</Modal>
		    </span>
	    )
	}
});

module.exports = AddButtonModal;