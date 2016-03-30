package com.derrekyoung.urlmonitor.util;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.derrekyoung.urlmonitor.domain.UrlMonitor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MockServletContext.class)
public class UrlMonitorUtilTest {
//	@Autowired
	private UrlMonitorUtil urlUtil = new UrlMonitorUtil();
	
	private String url;
	private String responseCode;
	
	
//	@Test
//	public void testValidateUrlMonitor() {
//		UrlMonitor urlMonitor = new UrlMonitor("http://www.cnn.com");
//		
//		urlMonitor = urlUtil.validateUrlMonitor(urlMonitor);
//		
//		assertEquals("200", urlMonitor.getResponse());
//	}
	
//	@Test
//	public void getUrlStatus_Google() {
//		url = "http://www.google.com";
//		responseCode = "200";
//		assertEquals(responseCode, urlUtil.getHttpStatusCode(url));
//		
//		url = "https://www.google.com";
//		responseCode = "200";
//		assertEquals(responseCode, urlUtil.getHttpStatusCode(url));
//	}
	
//	@Test
//	public void getUrlStatus_AppDynamicsHTTP() {
//		url = "http://www.appdynamics.com";
//		responseCode = "200";
//		assertEquals(responseCode, urlUtil.getUrlStatus(url));
//	}
//	
//	@Test
//	public void getUrlStatus_AppDynamicsHTTPS() {
//		url = "https://www.appdynamics.com";
//		responseCode = "200";
//		assertEquals(responseCode, urlUtil.getUrlStatus(url));
//	}
//	
//	@Test
//	public void getUrlStatus_ControllerHTTP() {
//		url = "http://demo1.appdynamics.com";
//		responseCode = "200";
//		
//		assertEquals(responseCode, urlUtil.getHttpStatusCode(url));
//	}
//	
//	@Test
//	public void getUrlStatus_ControllerHTTPS() {
//		url = "https://demo1.appdynamics.com";
//		responseCode = "200";
//		
//		assertEquals(responseCode, urlUtil.getHttpStatusCode(url));
//	}
//	
//	@Test
//	public void getUrlStatus_EumCollectorHTTP() {
//		url = "http://col.eum-appdynamics.com/eumcollector/ping";
//		responseCode = "200";
//		
//		assertEquals(responseCode, urlUtil.getHttpStatusCode(url));
//		
//		assertTrue(urlUtil.validateContent(url, "ping"));
//	}
//	
//	@Test
//	public void getUrlStatus_EumCollectorHTTPS() {
//		url = "https://col.eum-appdynamics.com/eumcollector/ping";
//		responseCode = "200";
//		
//		assertEquals(responseCode, urlUtil.getHttpStatusCode(url));
//		
//		assertTrue(urlUtil.validateContent(url, "ping"));
//	}
//	
//	@Test
//	public void getUrlStatus_AnalyticsHTTPS() {
//		url = "https://analytics.api.appdynamics.com/_ping";
//		responseCode = "200";
//		
//		assertEquals(responseCode, urlUtil.getHttpStatusCode(url));
//	}
//	
//	@Test
//	public void validateContent_AnalyticsHTTPS() {
//		url = "https://analytics.api.appdynamics.com/_ping";
//		
//		assertTrue(urlUtil.validateContent(url, "_pong"));
//	}
//	
//	public void getContent_EumCollectorHTTP() {
//		url = "http://col.eum-appdynamics.com/eumcollector/ping";
//		String body = "ping";
//		
//		assertEquals(body, urlUtil.getHttpStatusCode(url));
//	}
}
