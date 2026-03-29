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
import com.litecms.backend.service.InteractionsService;
import com.litecms.backend.service.PhotoGalleryService;
import com.litecms.backend.service.SearchService;

@RestController
@RequestMapping("/photoGalleries")
public class PhotoGalleryController {


    private final PhotoGalleryService photoGalleryService;
    private final SearchService searchService ;
    private final InteractionsService interactionsService;



    public PhotoGalleryController(PhotoGalleryService photoGalleryService, SearchService searchService, InteractionsService interactionsService) {
        this.photoGalleryService = photoGalleryService;
        this   .searchService = searchService;
        this.interactionsService = interactionsService;
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
        interactionsService.incrementView(id); // COUNT VIEW
        return photoGalleryService.findById(id);
    }

    // Like article
    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likeArticle(@PathVariable Long id) {
        interactionsService.incrementLike(id); // COUNT LIKE
        return ResponseEntity.ok().build();
    }

    // Unlike article
    @PostMapping("/{id}/unlike")
    public ResponseEntity<Void> unlikeArticle(@PathVariable Long id) {
        interactionsService.decrementLike(id); // COUNT UNLIKE
        return ResponseEntity.ok().build();
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        photoGalleryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    
}
