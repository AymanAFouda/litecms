package com.litecms.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.entity.Content;
import com.litecms.backend.service.ContentService;

@RestController
@RequestMapping("/api")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    //get Published Contents
    @GetMapping("/contents")
    public List<Content> getPublishedContents() {
        return contentService.getPublishedContents();
    }

    //get Latest Three Published Contents
    @GetMapping("/contents/latest-three")
    public List<Content> getLatestThreePublishedContents() {
        return contentService.getLatestThreePublished();
    }

    //get Published Contents By Category
    @GetMapping("/contents/category/{name}")
    public List<Content> getPublishedContentsByCategory(@PathVariable String name) {
        return contentService.getPublishedContentsByCategory(name);
    }

    //get Published Contents By Tag
    @GetMapping("/contents/tag/{name}")
    public List<Content> getPublishedContentsByTag(@PathVariable String name) {
        return contentService.getPublishedContentsByTag(name);
    }

    //get Published Content By Id
    @GetMapping("/contents/{id}")
    public Content getPublishedContentById(@PathVariable Long id) {
        return contentService.getPublishedById(id);
         
    }

    //like Content
    @PutMapping("/contents/like/{id}")
    public void likeContent(@PathVariable Long id) {
        contentService.likeContent(id);
    }

    //unlike Content
    @PutMapping("/contents/unlike/{id}")
    public void unlikeContent(@PathVariable Long id) {
        contentService.unlikeContent(id);
    }

    //view Content
    @PutMapping("/contents/view/{id}")
    public void viewContent(@PathVariable Long id) {
        contentService.viewContent(id);
    }

    // Get all content
    @GetMapping("/publisher/contents")
    public List<Content> getAllContents() {
        return contentService.getAll();
    }

    // Get content by ID
    @GetMapping("/publisher/contents/{id}")
    public Content getContentById(@PathVariable Long id) {
        return contentService.getById(id);
    }

    // Get latest 10 created contents
    @GetMapping("/publisher/contents/latest-ten")
    public List<Content> getLatestTenContents() {
        return contentService.getLatestTenContents();
    }
}