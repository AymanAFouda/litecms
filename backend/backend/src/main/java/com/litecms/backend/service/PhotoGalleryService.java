package com.litecms.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Media;
import com.litecms.backend.entity.PhotoGallery;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.PhotoGalleryRepository;

@Service
public class PhotoGalleryService {


    private final PhotoGalleryRepository photoGalleryRepository;
    private final CategoryRepository categoryRepository;
     private final MediaService mediaService;
    

    public PhotoGalleryService(PhotoGalleryRepository photoGalleryRepository, CategoryRepository categoryRepository, MediaService mediaService) {
        this.photoGalleryRepository = photoGalleryRepository;
        this.categoryRepository = categoryRepository;
        this.mediaService = mediaService;

    }

// Create PhotoGallery  
    public ResponseEntity<?> create(PhotoGallery gallery, MultipartFile[] files) {

// Ensure category exists

        if (gallery.getCategory() != null) {

            Long categoryId = gallery.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Category not found"));
            gallery.setCategory(category);
        } 

        PhotoGallery createdGallery = photoGalleryRepository.save(gallery);
        try {
            List<Map<String, Object>>  responseData = new ArrayList<>();

            for (MultipartFile file : files) {
                Media media = mediaService.saveFile(file, createdGallery);

                // Build response for each file
                Map<String, Object> fileResponse = new HashMap<>();
                fileResponse.put("mediaId", media.getId());
                fileResponse.put("fileUrl", media.getFileUrl());

                responseData.add(fileResponse);
            }
            
            Map<String, Object> galleryResponse = new HashMap<>();
            galleryResponse.put("gallery", createdGallery);

            responseData.add(galleryResponse);

            return ResponseEntity.ok(responseData);

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
        }
    }

  // Update PhotoGallery
    public PhotoGallery update(PhotoGallery photoGallery) {
            PhotoGallery originalPhotoGallery = photoGalleryRepository.findById(photoGallery.getContentId())
            .orElseThrow(() -> new RuntimeException("PhotoGallery not found"));

            photoGallery.setViewCount(originalPhotoGallery.getViewCount());
            photoGallery.setLikeCount(originalPhotoGallery.getLikeCount());

            if (photoGallery.getCategory() != null) {
                Long categoryId = photoGallery.getCategory().getId();
                categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            }

            return photoGalleryRepository.save(photoGallery);
    }

    // Get all PhotoGallery
    public List<PhotoGallery> findAll() {
        return photoGalleryRepository.findAll();
    }
    // Get PhotoGallery by ID
    public PhotoGallery findById(Long id) {
        return photoGalleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PhotoGallery not found"));
    }
    // Delete PhotoGallery
    public void delete(Long id) {
        photoGalleryRepository.deleteById(id); 
    }
}
