package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.litecms.backend.entity.Content;
import com.litecms.backend.entity.Status;
import com.litecms.backend.repositories.ContentRepository;
@Service
 public class ContentService {


    private final ContentRepository contentRepository;


 
    public ContentService(ContentRepository contentRepository){
        this.contentRepository =  contentRepository;
    }
    //get Published Contents
    public List<Content> getPublishedContents() {
        return contentRepository.findByStatusOrderByCreatedAtDesc(Status.PUBLISHED);
    }

    //get Latest Three Published
    public List<Content> getLatestThreePublished() {
        return contentRepository.findTop3ByStatusOrderByCreatedAtDesc(Status.PUBLISHED);
    }

    //get Published Contents By Category
    public List<Content> getPublishedContentsByCategory(String categoryName) {
    return contentRepository.findByStatusAndCategory_NameOrderByCreatedAtDesc(Status.PUBLISHED, categoryName);
    }

    //get Published Contents By Tag
    public List<Content> getPublishedContentsByTag(String tagName) {
    return contentRepository.findByStatusAndTags_TagNameOrderByCreatedAtDesc(
        Status.PUBLISHED,tagName);
    }

    //get Published Contents By Id
    public Content getPublishedById(Long id) {
    return contentRepository.findByContentIdAndStatus(id, Status.PUBLISHED)
        .orElseThrow(() -> new RuntimeException("Published content not found with ID: " + id));
    }

    //like Content
    @Transactional
    public void likeContent(Long id) {
        // Optional: Check if content exists first to throw a specific error
        if (!contentRepository.existsById(id)) {
            throw new RuntimeException("Content not found with ID: " + id);
        }
        contentRepository.incrementLike(id);
    }

    //unlike Content
    @Transactional
    public void unlikeContent(Long id) {
        if (!contentRepository.existsById(id)) {
            throw new RuntimeException("Content not found with ID: " + id);
        }
        contentRepository.decrementLike(id);
    }

    //view Content
    @Transactional
    public void viewContent(Long id) {
        if (!contentRepository.existsById(id)) {
            throw new RuntimeException("Content not found with ID: " + id);
        }
        contentRepository.incrementView(id);
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