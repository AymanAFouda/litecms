package com.litecms.backend.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Content;
import com.litecms.backend.service.ContentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/contents")
public class ContentController {


    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    // Get all content
    @GetMapping
    public List<Content> getAllContents() {
        return contentService.getAll();
    }

    // Get content by ID
    @GetMapping("/{id}")
    public ResponseEntity<Content> getContentById(@PathVariable Long id) {
        return ResponseEntity.ok(contentService.getById(id));
    }

    // Get content by category
    @GetMapping("/category/{categoryId}")
    public List<Content> getByCategory(@PathVariable Long categoryId) {
        Category category = new Category();
        category.setId(categoryId);
        return contentService.getByCategory(category);
    }

   @GetMapping("/tags")
    public List<Content> getByTags(@RequestParam String tagIds) {
        List<Long> ids = Arrays.stream(tagIds.split(","))
                            .map(Long::parseLong)
                            .toList();
        return contentService.getByTags(ids);
    }

}
