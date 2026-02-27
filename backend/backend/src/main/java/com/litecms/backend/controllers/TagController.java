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

import com.litecms.backend.entity.Tag;
import com.litecms.backend.service.TagService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/tags")
public class TagController {


 private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping
    public Tag create(@RequestBody Tag tag) {
        return tagService.create(tag);
    }


    @PutMapping("/{id}")
    public Tag update(@PathVariable Long id,
                           @RequestBody Tag tag) {
        return tagService.update(id, tag);
    }

    @GetMapping
    public List<Tag> getAllTags() {
        return tagService.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        tagService.delete(id);
        return ResponseEntity.noContent().build();
    }



}
