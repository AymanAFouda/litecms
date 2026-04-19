package com.litecms.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.litecms.backend.entity.Content;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class SearchService {

     private final RestClient restClient;

     public SearchService(
            RestClient.Builder builder,
            @Value("${elasticsearch.url}") String baseUrl) {

        // Set your Elasticsearch host and add basic auth if needed

        this.restClient = builder
                .baseUrl(baseUrl)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String indexContent(Content data) {

        return restClient.post()
                .uri("/my-index/_doc/"+data.getContentId().toString()) 
                .body(data)                  // RestClient converts the object to JSON
                .retrieve()
                .body(String.class);         // Elasticsearch returns a confirmation JSON
    }

    public JsonNode search(String qery) {

        String json = restClient.post()
                    .uri("/my-index/_search?q="+qery) 
                    //.body(qery)                  // RestClient converts the object to JSON
                    .retrieve()
                    .body(String.class);         // Elasticsearch returns a confirmation JSON

                    ObjectMapper mapper = new ObjectMapper();
                    return mapper.readTree(json);
    }

    //filtered Search
    public JsonNode filteredSearch(String query, String contentType, String categoryName, String tagName) {
        // 1. Build the Elasticsearch Query DSL structure
        Map<String, Object> bool = new HashMap<>();
        List<Map<String, Object>> must = new ArrayList<>();
        List<Map<String, Object>> filter = new ArrayList<>();

        // Full-text search on title/description
        if (query != null && !query.isEmpty()) {
            must.add(Map.of("multi_match", Map.of(
                "query", query,
                "fields", List.of("title", "description")
            )));
        }

        // Exact match filters
        if (contentType != null) {
            filter.add(Map.of("term", Map.of("Type", contentType)));
        }
        if (categoryName != null) {
            filter.add(Map.of("term", Map.of("category.name", categoryName)));
        }
        if (tagName != null) {
            filter.add(Map.of("term", Map.of("tags.tagName", tagName)));
        }

        Map<String, Object> queryBody = Map.of("query", Map.of("bool", 
            Map.of("must", must, "filter", filter)));

        // 2. Execute the POST request
        try {
            String responseJson = restClient.post()
                    .uri("/my-index/_search")
                    .body(queryBody)
                    .retrieve()
                    .body(String.class);

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readTree(responseJson);
        } catch (Exception e) {
            // Handle exceptions or return an empty JsonNode
            throw new RuntimeException("Elasticsearch query failed", e);
        }

    }

    //get Related Content
    public JsonNode getRelatedContent(Long contentId) {
        // Construct the More Like This query
        // This looks for documents similar to the one with the provided ID
        Map<String, Object> mltParams = new HashMap<>();
        mltParams.put("fields", List.of("title", "description")); // Fields to compare
        mltParams.put("like", List.of(
            Map.of("_index", "my-index", "_id", contentId.toString())
        ));
        mltParams.put("min_term_freq", 1);
        mltParams.put("max_query_terms", 12);

        Map<String, Object> queryBody = Map.of(
            "size", 3, // Return up to three related contents
            "query", Map.of("more_like_this", mltParams)
        );

        try {
            String responseJson = restClient.post()
                    .uri("/my-index/_search")
                    .body(queryBody)
                    .retrieve()
                    .body(String.class);

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readTree(responseJson);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch related content from Elasticsearch", e);
        }
    }
}


