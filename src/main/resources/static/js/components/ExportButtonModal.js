const React = require('react');

const Utilities = require('../util/Utilities');

const Modal = require('react-bootstrap').Modal;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Input = require('react-bootstrap').Input;

const ExportButtonModal = React.createClass({
	propTypes : {
		data : React.PropTypes.array.isRequired
	},

	getInitialState() {
    	return { 
    		showModal: false
    		,data: ''
    	};
  	},

  	open() {
  		// let exportData = [];

  		// for (let urlMonitor of this.props.data) {
  		// 	exportData.push(urlMonitor);
  		// }

    	this.setState({ 
    		showModal: true
    		,data: Utilities.jsonToCsv(this.props.data)
    	});
  	},

  	close() {
    	this.setState({ showModal: false });
  	},

	render() {
		return (
			<span>
				<Button bsStyle="info" onClick={this.open}><Glyphicon glyph="export" /> Export</Button>

				<Modal show={this.state.showModal} onHide={this.close}>
			      <Modal.Header closeButton>
			        <Modal.Title>Export</Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
						<Input type="textarea" rows="10"
							   label="Copy this text. Save it somewhere" defaultValue={this.state.data} placeholder="No URLs defined" />
			      </Modal.Body>
			      <Modal.Footer>
			        <Button bsStyle="danger" onClick={this.close}><Glyphicon glyph="remove-sign" /> Close</Button>
			      </Modal.Footer>
			    </Modal>
		    </span>
	    )
	}
});

module.exports = ExportButtonModal;