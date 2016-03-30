package com.derrekyoung.urlmonitor.util;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.derrekyoung.urlmonitor.domain.UrlMonitor;
import com.derrekyoung.urlmonitor.util.UrlMonitorValidator.Result;
import com.ning.http.client.Response;

@Component
public class UrlMonitorValidator {
	public enum Result {
		SUCCESS("success"), 
		ISNULL("object is null"), 
		ISBLANK("data is empty"),
		HTTP("URL must start with http:// or https://");
		
		private String message;
		private Result(String message) {
			this.message = message;
		}
		
		public boolean isSuccess() {
			return message.equals("success");
		}
		
		public String getMessage() {
			return this.message;
		}
	}

	public void validateUrlFormat(UrlMonitor urlMonitor) {
		Result result = isValidUrl(urlMonitor);
		
		// If not a valid URL, set response and exit out
		if (!result.isSuccess()) {
			urlMonitor.setResponse(result.getMessage());
			urlMonitor.setValid(false);
			urlMonitor.setValidUrl(false);
		}
	}
	
	private Result isValidUrl(UrlMonitor urlMonitor) {
		if (urlMonitor == null) {
			return Result.ISNULL;
		}
		
		String url = urlMonitor.getUrl();
		
		if ( StringUtils.isBlank(url) ) {
			return Result.ISBLANK;
		}
		else if ( !url.startsWith("http://") && !url.startsWith("https://") ) {
			return Result.HTTP;
		}
		
		return Result.SUCCESS;
	}

	public void validateResponseCode(Response response, UrlMonitor urlMonitor) {
		String statusCode = String.valueOf( response.getStatusCode() );
		boolean isValid = response.getStatusCode() == 200;

		urlMonitor.setValid(isValid);
		urlMonitor.setResponse(statusCode);
		urlMonitor.setValidResponse(isValid);
	}

	public void validateExpectedContent(Response response, UrlMonitor urlMonitor) throws IOException {
		String expected = urlMonitor.getExpectedContent();
		String actual = response.getResponseBody();
		
		if (!StringUtils.isBlank(expected) && !actual.contains(expected)) {
			urlMonitor.setValidContent(false);
			urlMonitor.setValid(false);
		}
	}
}
