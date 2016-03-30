// const _ = require('lodash')
const startsWith = require('lodash/startswith')
const isEmpty = require('lodash/isempty')

const ValidationUtil =  {
    validateUrl : function(url) {
    	let result = {
    		valid: false
    		,reason: '?'
    	}

    	if ( isEmpty(url) ) {
    		result.reason = 'URL is empty'

    		return result
    	}
    	else if ( !startsWith(url, 'http://') && !startsWith(url, 'https://')) {
    		result.reason = 'URL must start with http:// or https://'

    		return result
    	}
    	else {
	    	result.valid = true
	    	result.reason = 'valid'

	    	return result
	    }
	}
}

export default ValidationUtil;