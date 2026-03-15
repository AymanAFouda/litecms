package com.litecms.backend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.PhotoGallery;
import com.litecms.backend.service.PhotoGalleryService;
import com.litecms.backend.service.SearchService;

@RestController
@RequestMapping("/photoGalleries")
public class PhotoGalleryController {


    private final PhotoGalleryService photoGalleryService;
    private final SearchService searchService ;


    public PhotoGalleryController(PhotoGalleryService photoGalleryService, SearchService searchService) {
        this.photoGalleryService = photoGalleryService;
        this    .searchService = searchService;
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> create(
        @RequestPart("files") MultipartFile[] files,
        @RequestPart("gallery") PhotoGallery photoGallery,
        @RequestPart(value = "featuredImage", required = false)
        MultipartFile featuredImage)throws IOException {
 
            PhotoGallery savedPhotoGallery = photoGalleryService.create(photoGallery, files, featuredImage);
            searchService.indexContent(savedPhotoGallery);
            return ResponseEntity.status(201).body(savedPhotoGallery);
    }
        
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PhotoGallery> update(
        @PathVariable Long id,
        @RequestPart("files") MultipartFile[] files,
        @RequestPart("gallery") PhotoGallery photoGallery,
        @RequestPart(value = "featuredImage", required = false) MultipartFile featuredImage
        ) throws IOException {

            photoGallery.setContentId(id);
            PhotoGallery updatedPhotoGallery = photoGalleryService.update(photoGallery, files, featuredImage);
            searchService.indexContent(updatedPhotoGallery);

            return ResponseEntity.ok(updatedPhotoGallery);
    }

      // Get all PhotoGallery
    @GetMapping
    public List<PhotoGallery> getAllContents() {
        return photoGalleryService.findAll();
    }

    // Get PhotoGallery by ID
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
