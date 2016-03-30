package com.derrekyoung.urlmonitor.domain;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;

@RestResource(path = "urlmonitors", rel = "urlmonitors")
public interface UrlMonitorRestRepository extends PagingAndSortingRepository<UrlMonitor, Long> {
}
