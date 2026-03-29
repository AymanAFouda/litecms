package com.litecms.backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import com.litecms.backend.entity.ExchangeRateResponse;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/search")
public class SearchController {

    @GetMapping
    public ExchangeRateResponse getAllContents() {
        RestClient restClient = RestClient.create();

        return restClient.get()
        .uri("https://api.frankfurter.dev/v1/latest")
        .accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .body(ExchangeRateResponse.class);
    }
}
