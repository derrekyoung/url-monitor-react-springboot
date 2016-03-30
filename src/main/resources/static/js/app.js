'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

// Bootstrap
const Button = require('react-bootstrap').Button;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;
const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Input = require('react-bootstrap').Input;

// App specific
const css = require('../css/app.css');
const Utilities = require('./util/Utilities');

const AddButtonModal = require('./components/AddButtonModal');
const ExportButtonModal = require('./components/ExportButtonModal');
const ImportButtonModal = require('./components/ImportButtonModal');
const RefreshButton = require('./components/RefreshButton');
const CountdownTimer = require('./components/CountdownTimer');
const UrlMonitorList = require('./components/UrlMonitorList');


const App = React.createClass({
	getInitialState() {
    	return {
			urlmonitors: []
			,isSpinning: false
			,autoRefresh: false
			,autoRefreshMilliSeconds: 60000
			,lastUpdate: Utilities.getLastUpdated()
    	}
  	},

	componentDidMount() {
		var localStorageRef = localStorage.getItem('urlMonitors');

	    if(localStorageRef) {
	      // update our component state to reflect what is in localStorage
	      this.setState({
	        urlmonitors: JSON.parse(localStorageRef)
	      });
	    }

		this.refreshUrlMonitorsList();
	},

  	startSpinning() {
  		this.setState({ 
    		isSpinning: true 
    	});
  	},

  	stopSpinning() {
  		this.setState({ 
    		isSpinning: false 
    	});
  	},

	refreshUrlMonitorsList() {
		// console.log('refresh')

		// this.startSpinning()

		this.readAllUrlMonitors()
	},

	toggleAutoRefresh(event) {
		// console.log('toggleAutoRefresh')

		this.setState({ 
    		autoRefresh: this.refs.autoRefresh.getChecked() 
    	});
	},

	importUrls(urlMonitorsList) {
  		// console.log('importUrls')
  		// console.log(urls)

  		for (let urlMonitor of urlMonitorsList) {
  			this.handleAddUrlMonitor( urlMonitor )
  		}
	},

	updateUrlMonitors(urlMonitors) {
		urlMonitors = Utilities.sortUrlMonitors(urlMonitors)

		this.setState({ 
			urlmonitors: urlMonitors
			,lastUpdate: Utilities.getLastUpdated()
		});

		localStorage.setItem('urlMonitors', JSON.stringify(urlMonitors));
	},

	readAllUrlMonitors() {
		let _this = this;
		let ajax = $.ajax({
		    type: 'GET',
		    url: '/api/urlmonitor/allrecords',
		    beforeSend: _this.startSpinning
		})

		ajax.done(function (data) {
			_this.updateUrlMonitors(data)
		})

		ajax.fail(function (data) {
			_this.stopSpinning()
		})

		ajax.always(function (data) {
			_this.stopSpinning()
		})
	},

	handleAddUrlMonitor(urlMonitor) {
		// console.log('handleAddUrlMonitor');

		let _this = this;
		let ajax = $.ajax({
		    type: 'POST',
		    url: '/api/urlmonitor/add',
		    data: JSON.stringify(urlMonitor),
		    contentType: 'application/json',
		    dataType: 'json',
		    beforeSend: this.startSpinning
		})

		ajax.done(function (data) {
			let urlMonitorsList = Utilities.addUrlMonitor(_this.state.urlmonitors, data)
		    // console.log(urlMonitorsList)

		    _this.updateUrlMonitors(urlMonitorsList)
		})

		ajax.fail(function (data) {
			_this.stopSpinning()
		})

		ajax.always(function (data) {
			_this.stopSpinning()
		})
	},

	handleEditUrlMonitor(urlMonitor) {
		// console.log('handleEditUrlMonitor')
		// console.log(urlMonitor)

		let _this = this;
		let ajax = $.ajax({
		    type: 'PUT',
		    url: '/api/urlmonitor/update',
		    data: JSON.stringify(urlMonitor),
		    contentType: 'application/json',
		    dataType: 'json',
		    beforeSend: _this.startSpinning
		})

		ajax.done(function (data) {
			let urlMonitorsList = Utilities.updateUrlMonitor(_this.state.urlmonitors, data)
		    // console.log(urlMonitorsList)

		    _this.updateUrlMonitors(urlMonitorsList)
		})

		ajax.fail(function (data) {
			_this.stopSpinning()
		})

		ajax.always(function (data) {
			_this.stopSpinning()
		})
	},

	handleDeleteUrlMonitor(urlMonitor) {
		// console.log('handleDeleteUrlMonitor')

		let _this = this;
		let ajax = $.ajax({
		    type: 'DELETE',
		    url: '/api/urlmonitor/delete',
		    data: JSON.stringify(urlMonitor),
		    contentType: 'application/json',
		    dataType: 'json',
		    beforeSend: _this.startSpinning
		})

		ajax.done(function (data) {
            // console.log('delete data');
		   	let urlMonitorsList = Utilities.removeUrlMonitor(_this.state.urlmonitors, urlMonitor)
		    // console.log(urlMonitorsList)

		    _this.updateUrlMonitors(urlMonitorsList)
		})

		ajax.fail(function (data) {
			_this.stopSpinning()
		})

		ajax.always(function (data) {
			_this.stopSpinning()
		})
	},

	render() {
		return (
			<Grid>
				<Row>
					<Col sm={12}>
				  		<ButtonToolbar>
				  			<ButtonGroup>
					        	<AddButtonModal onSave={this.handleAddUrlMonitor} />
					        </ButtonGroup>
				  			<ButtonGroup>
					        	<ExportButtonModal data={this.state.urlmonitors} />
					        </ButtonGroup>
				  			<ButtonGroup>
					        	<ImportButtonModal import={this.importUrls} />
					        </ButtonGroup>
				  			<ButtonGroup>
					        	<RefreshButton spinning={this.state.isSpinning} onClick={this.refreshUrlMonitorsList} />
					        </ButtonGroup>

					        <ButtonGroup>
							    <span>
							    	<Input id="autoRefresh" type="checkbox" 
							    			label="Auto-refresh" 
							    			name="autoRefresh" ref="autoRefresh"
							        		onChange={this.toggleAutoRefresh} 
							        		defaultChecked={this.state.autoRefresh} /> 

							       	<CountdownTimer initialTimeRemaining={this.state.autoRefreshMilliSeconds} 
							    					completeCallback={this.refreshUrlMonitorsList}
							    					formatFunc={Utilities.formatRefreshTime}
							    					active={this.state.autoRefresh} />
							    </span>
						    </ButtonGroup>
				        </ButtonToolbar>
			        </Col>
				</Row>

		        <Row>
				    <Col sm={12}>
				    	Updated: {this.state.lastUpdate}
				    </Col>
			    </Row>

				<Row>
				    <Col sm={12}>
						<span>&nbsp;</span>
					</Col>
				</Row>

			    <UrlMonitorList urlMonitors={this.state.urlmonitors} deleteUrlMonitor={this.handleDeleteUrlMonitor} editUrlMonitor={this.handleEditUrlMonitor} />
				
				<Row>
				    <Col sm={12}>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
					</Col>
				</Row>
			</Grid>
		)
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
