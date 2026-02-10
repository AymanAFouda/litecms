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

import com.litecms.backend.entity.PhotoGallery;
import com.litecms.backend.service.PhotoGalleryService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/photoGalleries")
public class PhotoGalleryController {


    private final PhotoGalleryService photoGalleryService;

    public PhotoGalleryController(PhotoGalleryService photoGalleryService) {
        this.photoGalleryService = photoGalleryService;
    }

     @PostMapping
    public PhotoGallery create(@RequestBody PhotoGallery photoGallery) {
        return photoGalleryService.create(photoGallery);
    }

    
    @PutMapping("/{id}")
    public PhotoGallery update(@PathVariable Long id,
    @RequestBody PhotoGallery photoGallery) {
        photoGallery.setContentId(id);
        return photoGalleryService.update(photoGallery);
    }

      // Get all Article
    @GetMapping
    public List<PhotoGallery> getAllContents() {
        return photoGalleryService.findAll();
    }

    // Get Article by ID
    @GetMapping("/{id}")
    public PhotoGallery getContentById(@PathVariable Long id) {
        return photoGalleryService.findById(id);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        photoGalleryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    
}
