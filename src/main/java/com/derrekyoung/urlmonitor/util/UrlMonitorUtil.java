package com.derrekyoung.urlmonitor.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.codehaus.groovy.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.derrekyoung.urlmonitor.domain.UrlMonitor;
import com.derrekyoung.urlmonitor.domain.UrlMonitorRestRepository;
import com.ning.http.client.AsyncHttpClient;
import com.ning.http.client.AsyncHttpClientConfig;
import com.ning.http.client.AsyncHttpClientConfig.Builder;

import com.ning.http.client.Response;

@Component
public class UrlMonitorUtil {
	
	private final Logger log = LoggerFactory.getLogger(this.getClass());
	
	private AsyncHttpClient asyncHttpClient;
	
	@Autowired
	private UrlMonitorRestRepository repo;
	
	@Autowired UrlMonitorValidator validator;

	public UrlMonitorUtil() {
		System.setProperty("jsse.enableSNIExtension", "false");
		
		Builder builder = new AsyncHttpClientConfig.Builder();
		
		builder
//			.setMaxConnections(100)
//			.setMaxConnectionsPerHost(5)
//			.setConnectionTTL(10000)
			.setAllowPoolingConnections(true)
			.setAllowPoolingSslConnections(true)
			.setFollowRedirect(true)
			.setAcceptAnyCertificate(true)
			.setEnabledProtocols(new String[] {"TLSv1.2", "TLSv1.1", "TLSv1", "SSLv3", "SSLv2Hello"});
		
		asyncHttpClient = new AsyncHttpClient(builder.build());
	}
	
	public Iterable<UrlMonitor> validateAndSaveAll() {
		Collection<UrlMonitor> urlMonitorList = new ArrayList<UrlMonitor>();
		
		for (UrlMonitor urlMonitor : repo.findAll()) {
			urlMonitorList.add( this.validateAndSave(urlMonitor) );
		}
		
		return urlMonitorList;
	}
	
	public UrlMonitor validateAndSave(UrlMonitor urlMonitor) {
		urlMonitor.setUpdatedOn(new Date());
		
		try {
			urlMonitor = this.validateUrlMonitor(urlMonitor);
			
			urlMonitor = repo.save(urlMonitor);
		} catch (Exception ex) {
			urlMonitor.setResponse(ex.getClass().getSimpleName()+": "+ex.getMessage());
			urlMonitor.setValid(false);
			urlMonitor.setValidContent(false);
			urlMonitor.setValidResponse(false);
			
			urlMonitor = repo.save(urlMonitor);
		}
		
		return urlMonitor;
	}
	
	public UrlMonitor validateUrlMonitor(UrlMonitor urlMonitor) 
	throws InterruptedException, ExecutionException, IOException {
		urlMonitor.setValid(true);
		urlMonitor.setValidUrl(true);
		urlMonitor.setValidResponse(true);
		urlMonitor.setValidContent(true);
		
		this.validator.validateUrlFormat(urlMonitor);
		
		// If not a valid URL, exit out
		if (!urlMonitor.isValid()) {
			return urlMonitor;
		}
		
		// Get the response, will be inspected
		Response response = this.getResponse( urlMonitor.getUrl() );
		
		// Validate the HTTP response code, modify the object
		this.validator.validateResponseCode(response, urlMonitor);
		
		// Validate the content is as expected, modify the object
		this.validator.validateExpectedContent(response, urlMonitor);
		
		if (log.isDebugEnabled())
			log.debug("Validated URL Monitor: "+urlMonitor.toString());
		
		return urlMonitor;
	}
	
	public Response getResponse(String url) throws InterruptedException, ExecutionException {
		return asyncHttpClient.prepareGet(url).execute().get();
	}
	
//	public String getUrlStatus(String url) {
//		try {
//			Response r = asyncHttpClient.prepareGet(url).execute().get();
//			
//			return String.valueOf( r.getStatusCode() );
//		} catch (Exception e) {
//			log.error("Error checking the URL", e);
//			return e.getMessage();
//		} 
//	}
	
//	public String getContent(String url) {
//		try {
//			Future<Response> f = asyncHttpClient.prepareGet(url).execute();
//			return f.get().getResponseBody();
//		} catch (Exception e) {
//			log.error("Error checking the URL", e);
//			return e.getMessage();
//		}
//	}
//	
//	public boolean validateContent(String url, String expectedString) {
//		try {
//			String body = this.getContent(url);
//			
//			return body.contains(expectedString);
//		} catch (Exception e) {
//			log.error("Error validating the conent", e);
//			return false;
//		}
//	}
	
//	public static boolean pingURL(String url, int timeout) {
//	    url = url.replaceFirst("^https", "http");
//
//	    try {
//	        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
//	        connection.setConnectTimeout(timeout);
//	        connection.setReadTimeout(timeout);
//	        connection.setRequestMethod("HEAD");
//	        int responseCode = connection.getResponseCode();
//	        return (200 <= responseCode && responseCode <= 399);
//	    } catch (IOException exception) {
//	        return false;
//	    }
//	}

//	public UrlMonitorValidator getValidator() {
//		return validator;
//	}
//
//	public void setValidator(UrlMonitorValidator validator) {
//		this.validator = validator;
//	}
}
