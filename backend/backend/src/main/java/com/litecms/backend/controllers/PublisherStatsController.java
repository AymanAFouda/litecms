package com.litecms.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.dto.StatsDTO;
import com.litecms.backend.service.PublisherStatsService;

@RestController
@RequestMapping("/api/publisher")
public class PublisherStatsController {

    private final PublisherStatsService statsService;

    public PublisherStatsController(PublisherStatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/stats")
    public StatsDTO getStats() {
        // The service aggregates data from Content and Comment repositories
        StatsDTO stats = statsService.getStats();
        
        return stats;
    }
}
