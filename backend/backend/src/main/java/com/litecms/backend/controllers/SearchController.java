package com.litecms.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
 
    @GetMapping("/qery")
    public JsonNode search(@RequestParam String qery) {
        return searchService.search(qery);
    }

    @GetMapping("/filtered")
    public JsonNode filteredSearch(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String contentType,
            @RequestParam(required = false) String categoryName,
            @RequestParam(required = false) String tagName) {
        return searchService.filteredSearch(query, contentType, categoryName, tagName);
    }

    @GetMapping("/related/{id}")
    public JsonNode relatedContent(@PathVariable("id") Long id) {
        return searchService.getRelatedContent(id);
    }
}
