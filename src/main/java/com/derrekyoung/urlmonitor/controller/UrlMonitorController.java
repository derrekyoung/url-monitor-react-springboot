package com.derrekyoung.urlmonitor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.derrekyoung.urlmonitor.domain.UrlMonitor;
import com.derrekyoung.urlmonitor.domain.UrlMonitorRestRepository;
import com.derrekyoung.urlmonitor.util.UrlMonitorUtil;

@RestController
public class UrlMonitorController {
	
	@Autowired
	private UrlMonitorUtil util;
	
	@Autowired
	private UrlMonitorRestRepository repo;
	
	@RequestMapping(value = {"/api/urlmonitor/add"}, method = RequestMethod.POST)
	public UrlMonitor addUrlMonitor(@RequestBody UrlMonitor urlMonitor) {
		return util.validateAndSave(urlMonitor);
	}
	
	@RequestMapping(value = {"/api/urlmonitor/update"}, method = RequestMethod.PUT)
	public UrlMonitor updateUrlMonitor(@RequestBody UrlMonitor urlMonitor) {
		return util.validateAndSave(urlMonitor);
	}
	
	@RequestMapping(value = {"/api/urlmonitor/delete"}, method = RequestMethod.DELETE)
	public boolean deleteUrlMonitor(@RequestBody UrlMonitor urlMonitor) {
		repo.delete(urlMonitor);
		
		return true;
	}
	
	@RequestMapping(value = {"/api/urlmonitor/allrecords"}, method = RequestMethod.GET)
	public Iterable<UrlMonitor> validateAllUrls() {
		return util.validateAndSaveAll();
	}
}
