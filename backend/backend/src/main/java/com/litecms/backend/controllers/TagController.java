package com.litecms.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.entity.Tag;
import com.litecms.backend.service.TagService;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("/popular")
    public List<Tag> getPopularTags() {
        return tagService.getPopularTags();
    } 

    @GetMapping
    public List<Tag> getAllTags() {
        return tagService.findAll();
    }
}
