const React = require('react');

const Modal = require('react-bootstrap').Modal;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Input = require('react-bootstrap').Input;

const trim = require('lodash/trim')

import ValidationUtil from '../util/ValidationUtil'

const EditButtonModal = React.createClass({
	propTypes : {
		onSave : React.PropTypes.func.isRequired
		,obj : React.PropTypes.object.isRequired
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
    	this.setState({ showModal: true })
  	},

  	close() {
    	this.setState({ showModal: false })

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

  		const url = this.refs.url.getValue()

  		let result = ValidationUtil.validateUrl(url)
  		if ( !result.valid ) {
  			this.setState({ 
  				validation: 'error'
  				,help: result.reason 
  			});

    		return
    	}

    	this.props.obj.url = trim(url)
    	this.props.obj.expectedContent = trim(this.refs.expectedContent.getValue())

  		this.props.onSave(this.props.obj.url)

	    this.close()
  	},

	render() {
		return (
			<span>
				<Button bsSize="small" onClick={this.open}><Glyphicon glyph="pencil" /> Edit</Button>

				<Modal show={this.state.showModal} onHide={this.close}>
				      <Modal.Header closeButton>
				        <Modal.Title>Edit URL Monitor</Modal.Title>
				      </Modal.Header>
				      <Modal.Body>
						<form ref="urlMonitorForm" className="form-horizontal" onSubmit={this.save}>
						    <Input type="text" label="URL" 
						    	   	name="url" ref="url" 
						    	   	defaultValue={this.props.obj.url}
						    		placeholder="http://www.example.com"
						    		help={this.state.help}
        							bsStyle={this.state.validation}
        							hasFeedback
						    		labelClassName="col-xs-2" wrapperClassName="col-xs-10" />

						    <Input type="text" 
						    		label="Expected Content" 
						    	   	name="expectedContent" ref="expectedContent" 
						    	   	defaultValue={this.props.obj.expectedContent}
						    		help="Text you expect this URL to contain"
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

module.exports = EditButtonModal;