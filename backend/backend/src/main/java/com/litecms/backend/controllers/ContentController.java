package com.litecms.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.entity.Content;
import com.litecms.backend.service.ContentService;
 
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/content")

public class ContentController {

    
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping
    public Content create(@RequestBody Content content) {
        return contentService.create(content);
    }

    @PutMapping("/{id}")
    public Content update(@PathVariable Long id, @RequestBody Content content) {
        return contentService.update(id, content);
    }

    @GetMapping
    public List<Content> getAll() {
        return contentService.findAll();
    }

    @GetMapping("/{id}")
    public Content getById(@PathVariable Long id) {
        return contentService.findById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contentService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
