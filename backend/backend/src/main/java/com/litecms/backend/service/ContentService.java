package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Category;
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

    // Get by category
    public List<Content> getByCategory(Category category) {
        return contentRepository.findByCategory(category);
    }

    // Get content by tag IDs
    public List<Content> getByTags(List<Long> tagIds) {
        return contentRepository.findDistinctByTagIds(tagIds);
    }
}
