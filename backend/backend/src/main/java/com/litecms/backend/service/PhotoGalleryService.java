package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.PhotoGallery;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.PhotoGalleryRepository;

@Service
public class PhotoGalleryService {


    private final PhotoGalleryRepository photoGalleryRepository;
    private final CategoryRepository categoryRepository;

public PhotoGalleryService(PhotoGalleryRepository photoGalleryRepository, CategoryRepository categoryRepository) {

    this.photoGalleryRepository = photoGalleryRepository;
    this.categoryRepository = categoryRepository;
    }

// Create PhotoGallery  
 public PhotoGallery create(PhotoGallery content) {

// Ensure category exists

        if (content.getCategory() != null) {

        Long categoryId = content.getCategory().getId();
        Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new RuntimeException("Category not found"));
        content.setCategory(category);
        }
        if (content instanceof PhotoGallery photoGallery) {
        PhotoGallery newPhotoGallery = new PhotoGallery(
            content.getTitle(),
            content.getDescription(),
            content.getTags(),
            content.getCategory(),
            content.getStatus()
         );
        return photoGalleryRepository.save(newPhotoGallery);
                  }
        return photoGalleryRepository.save(content);
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
