package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Content;
import com.litecms.backend.repositories.ContentRepository;

@Service
 public class ContentService {


    private final ContentRepository contentRepository;


 
    public ContentService(ContentRepository contentRepository){
        this.contentRepository =  contentRepository;
    }

    // Get all content
    public List<Content> getAll() {
        return contentRepository.findAll();
    }

    // Get by ID
    public Content getById(Long id) {
        return contentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Content not found with ID: " + id));
    }

    // Get by category name
    public List<Content> getByCategory(String name) {
        return contentRepository.findByCategory_name(name);
    }

    // Get content by tag name
    public List<Content> getByTag(String tagName) {
        return contentRepository.findDistinctByTagName(tagName);
    }
}