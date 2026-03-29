package com.litecms.backend.service;

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

    public JsonNode search(String term) {

        String json = restClient.post()
                    .uri("/my-index/_search?q="+term) 
                    //.body(term)                  // RestClient converts the object to JSON
                    .retrieve()
                    .body(String.class);         // Elasticsearch returns a confirmation JSON

                    ObjectMapper mapper = new ObjectMapper();
                    return mapper.readTree(json);
    }



}


