package com.litecms.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.service.SearchService;

import tools.jackson.databind.JsonNode;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService  searchService;

    public SearchController(SearchService  searchService){
        this.searchService = searchService;
    }
 
    @GetMapping("/")
    public JsonNode search(@RequestParam String term) {
        return searchService.search(term);
    }


}
