const React = require('react');

const Utilities = require('../util/Utilities');

const isempty = require('lodash/isempty')

const Modal = require('react-bootstrap').Modal;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Input = require('react-bootstrap').Input;

const ImportButtonModal = React.createClass({
	propTypes : {
		import : React.PropTypes.func.isRequired
	},

	getInitialState() {
    	return { showModal: false };
  	},

  	open() {
    	this.setState({ showModal: true });
  	},

  	close() {
    	this.setState({ showModal: false });
  	},

  	save(event) {
  		event.preventDefault();

  		let data = this.refs.import.getValue()
  		// console.log(data)

  		data = Utilities.csvToJson(data)
  		// console.log(data)

  		if (!isempty(data)) {
	  		this.props.import(data)

    		this.setState({ showModal: false })
	  	}
  	},

	render() {
		return (
			<span>
				<Button bsStyle="info" onClick={this.open}><Glyphicon glyph="import" /> Import</Button>

				<Modal show={this.state.showModal} onHide={this.close}>
			      <Modal.Header closeButton>
			        <Modal.Title>Import</Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
					<form ref="importForm" onSubmit={this.save}>
						<Input type="textarea" rows="10" name="import" ref="import"
							   label="Paste your URLs here, one on each line" placeholder="Paste the list of URLs here" />
					</form>
			      </Modal.Body>
			      <Modal.Footer>
			        <Button bsStyle="primary" type="submit" onClick={this.save}><Glyphicon glyph="import" /> Import</Button>
			        <Button bsStyle="danger" onClick={this.close}><Glyphicon glyph="remove-sign" /> Close</Button>
			      </Modal.Footer>
			    </Modal>
		    </span>
	    )
	}
});

module.exports = ImportButtonModal;