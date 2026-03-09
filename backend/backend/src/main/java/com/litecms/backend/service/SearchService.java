package com.litecms.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.litecms.backend.entity.Content;

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
                .uri("/my-index/_doc/"+data.getContentId().toString()) // "exchange-rates" is the index name
                .body(data)                  // RestClient converts the object to JSON
                .retrieve()
                .body(String.class);         // Elasticsearch returns a confirmation JSON
    }
}



 //#region
/*
 
package com.litecms.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.litecms.backend.entity.Content;

@Service
public class SearchService {
    @Value("${elasticsearch.url}")
    private String baseUrl; 
    private final RestClient restClient;

    public SearchService(RestClient.Builder builder) {
        // Set your Elasticsearch host and add basic auth if needed

        this.restClient = builder
                .baseUrl(baseUrl)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String indexContent(Content data) {

        return restClient.post()
                .uri("/content/_doc/"+data.getContentId().toString()) // "exchange-rates" is the index name
                .body(data)                  // RestClient converts the object to JSON
                .retrieve()
                .body(String.class);         // Elasticsearch returns a confirmation JSON
    }
}

*/
//#endregion