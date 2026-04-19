package com.litecms.backend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
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

@RestController
@RequestMapping("/api")
public class PhotoGalleryController {

    private final PhotoGalleryService photoGalleryService;
    private final InteractionsService interactionsService;

    public PhotoGalleryController(PhotoGalleryService photoGalleryService, InteractionsService interactionsService) {
        this.photoGalleryService = photoGalleryService;
        this.interactionsService = interactionsService;
    }

    //get Published Galleries
    @GetMapping("/galleries")
    public List<PhotoGallery> getPublishedGalleries() {
        return photoGalleryService.findPublishedGalleries();
    }
    
    //get Published Galleries By Category
    @GetMapping("/galleries/category/{name}")
    public List<PhotoGallery> getPublishedGalleriesByCategory(@PathVariable String name) {
        return photoGalleryService.getPublishedByCategory(name);
    }

    //get Published Galleries By Tag
    @GetMapping("/galleries/tag/{name}")
    public List<PhotoGallery> getPublishedGalleriesByTag(@PathVariable String name) {
        return photoGalleryService.getPublishedByTag(name);
    }

    // Get all PhotoGallery
    @GetMapping("/publisher/galleries")
    public List<PhotoGallery> getAllContents() {
        return photoGalleryService.findAll();
    }

    // Get PhotoGallery by ID
    @GetMapping("/publisher/galleries/{id}")
    public PhotoGallery getContentById(@PathVariable Long id) {
        interactionsService.incrementView(id); // COUNT VIEW
        return photoGalleryService.findById(id);
    }

    //Create PhotoGallery
    @PostMapping(value = "/publisher/galleries",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public PhotoGallery createPhotoGallery(
            @RequestPart("files") MultipartFile[] files,
            @RequestPart("gallery") PhotoGallery photoGallery,
            @RequestPart(value = "featuredImage", required = false) MultipartFile featuredImage
        )throws IOException {
 
        return photoGalleryService.create(photoGallery, files, featuredImage);
    }

    //Update PhotoGallery
    @PutMapping(value = "/publisher/galleries/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoGallery updatePhotoGallery(
            @PathVariable Long id,
            @RequestPart("files") MultipartFile[] files,
            @RequestPart("gallery") PhotoGallery photoGallery,
            @RequestPart(value = "featuredImage", required = false) MultipartFile featuredImage
        ) throws IOException {
        photoGallery.setContentId(id);
        return photoGalleryService.update(photoGallery, files, featuredImage);
    }

    @DeleteMapping("/publisher/galleries/{id}")
    public void deleteContent(@PathVariable Long id) {
        photoGalleryService.delete(id);
    } 
}