package com.derrekyoung.urlmonitor.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

@Entity
public class UrlMonitor {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

	private boolean valid;
	
	private String url;
	private boolean validUrl;
	
	private String response;
	private boolean validResponse;
	
	private String expectedContent;
	private boolean validContent;
	
	private Date updatedOn;
	
	public UrlMonitor() {
		super();
		valid = false;
		url = "";
		response = "?";
		validResponse = false;
		updatedOn = new Date();
		validContent = false;
	}
	
	public UrlMonitor(String url) {
		this();
		this.url = url;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}
	
	public String getExpectedContent() {
		return expectedContent;
	}

	public void setExpectedContent(String expectedContent) {
		this.expectedContent = expectedContent;
	}

	public boolean isValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}
	
	public boolean isValidResponse() {
		return validResponse;
	}

	public void setValidResponse(boolean validResponse) {
		this.validResponse = validResponse;
	}

	public boolean isValidContent() {
		return validContent;
	}

	public void setValidContent(boolean validContent) {
		this.validContent = validContent;
	}

	public boolean isValidUrl() {
		return validUrl;
	}

	public void setValidUrl(boolean urlValid) {
		this.validUrl = urlValid;
	}

	public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	@Override
	public String toString() {
	   return ReflectionToStringBuilder.toString(this);
	}

	@Override
	public boolean equals(Object obj) {
		boolean result = false;
        if (obj instanceof UrlMonitor) {
        	UrlMonitor that = (UrlMonitor) obj;
            return (this.getUrl().equals(that.getUrl()));
        }
        return result;
	}

	@Override
	public int hashCode() {
		return this.getUrl().hashCode();
	}
}
