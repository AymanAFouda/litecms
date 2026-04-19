package com.litecms.backend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Media;
import com.litecms.backend.entity.PhotoGallery;
import com.litecms.backend.entity.Status;
import com.litecms.backend.entity.Tag;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.PhotoGalleryRepository;
import com.litecms.backend.repositories.TagRepository;

import jakarta.transaction.Transactional;

@Service
public class PhotoGalleryService {

    private final PhotoGalleryRepository photoGalleryRepository;
    private final CategoryRepository categoryRepository;
    private final MediaService mediaService;
    private final TagRepository tagRepository;
    private final SearchService searchService;
    private final String uploadDir = "uploads";

    public PhotoGalleryService(PhotoGalleryRepository photoGalleryRepository, 
            CategoryRepository categoryRepository, MediaService mediaService,
            TagRepository tagRepository, SearchService searchService
        ) {
        this.photoGalleryRepository = photoGalleryRepository;
        this.categoryRepository = categoryRepository;
        this.mediaService = mediaService;
        this.tagRepository = tagRepository;
        this.searchService = searchService;
    }

    //find Published Galleries
    public List<PhotoGallery> findPublishedGalleries() {
        return photoGalleryRepository.findByStatusOrderByCreatedAtDesc(Status.PUBLISHED);
    }

    //get Published By Category
    public List<PhotoGallery> getPublishedByCategory(String categoryName) {
        return photoGalleryRepository.findByCategoryNameAndStatusOrderByCreatedAtDesc(categoryName, Status.PUBLISHED);
    }

    //get Published By Tag
    public List<PhotoGallery> getPublishedByTag(String tagName) {
        return photoGalleryRepository.findByTagNameAndStatus(tagName, Status.PUBLISHED);
    }

    // Get all 
    public List<PhotoGallery> findAll() {
        return photoGalleryRepository.findAll();
    }
    
    // Get  by ID
    public PhotoGallery findById(Long id) {
        return photoGalleryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("PhotoGallery not found"));
    }

    public List<PhotoGallery> getByCategory(String categoryName) {
        return photoGalleryRepository.findByCategoryName(categoryName);
    }

    public List<PhotoGallery> getByTag(String tagName) {
        return photoGalleryRepository.findDistinctByTagName(tagName);
    }

    // Create PhotoGallery
    @Transactional
    public PhotoGallery create(PhotoGallery gallery, MultipartFile[] files,  MultipartFile featuredImage) throws IOException {

        // Ensure category exists
        if (gallery.getCategory() != null) {

            Long categoryId = gallery.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            gallery.setCategory(category);
        } 

        if (gallery.getTags() != null) {
            Set<Tag> processedTags = gallery.getTags().stream()
                .map((Tag tag) -> tagRepository.findByTagName(tag.getTagName())
                    .orElseGet(() -> tagRepository.save(tag)))
                .collect(Collectors.toSet());

            gallery.setTags(processedTags);
        }

        if (featuredImage != null ){
            Media savedFeaturedImage = mediaService.saveFeaturedImage(featuredImage);
            gallery.setFeaturedImage(savedFeaturedImage);
        }

        PhotoGallery createdGallery = photoGalleryRepository.save(gallery);

        for (MultipartFile file : files) {
            mediaService.saveFile(file, createdGallery);
        }

        searchService.indexContent(createdGallery);
        return createdGallery;
    }

    // Update PhotoGallery
    @Transactional
    public PhotoGallery update(PhotoGallery gallery, MultipartFile[] files, MultipartFile newFeaturedImage) throws IOException {

        PhotoGallery original = photoGalleryRepository.findById(gallery.getContentId())
        .orElseThrow(() -> new RuntimeException("PhotoGallery not found"));

        // Keep view and like counts
        original.setViewCount(gallery.getViewCount());
        original.setLikeCount(gallery.getLikeCount());

        // Handle Category
        if (gallery.getCategory() != null) {
            Long categoryId = gallery.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            original.setCategory(category);
        }

        // Handle Tags
        if (gallery.getTags() != null) {
            Set<Tag> processedTags = gallery.getTags().stream()
                .map(tag -> tagRepository.findByTagName(tag.getTagName())
                    .orElseGet(() -> {
                        Tag newTag = new Tag();
                        newTag.setTagName(tag.getTagName());
                        return tagRepository.save(newTag);
                    }))
                .collect(Collectors.toSet());

            original.setTags(processedTags);
        }

        // Delete old media safely
        for (Media media : new ArrayList<>(original.getMediaList())) {
            mediaService.deleteFile(media); // deletes file + DB record
        }
        original.getMediaList().clear(); // remove references from managed entity

        // Add new media files
        if (files != null && files.length > 0) {
            for (MultipartFile file : files) {
                Media newMedia = mediaService.saveFile(file, original);
                original.getMediaList().add(newMedia);
            }
        }

        // Handle featured image
        if (newFeaturedImage != null && !newFeaturedImage.isEmpty()) {
            if (original.getFeaturedImage() != null) {
                mediaService.deleteFile(original.getFeaturedImage());
            }
            Media savedImage = mediaService.saveFeaturedImage(newFeaturedImage);
            original.setFeaturedImage(savedImage);
        }

        PhotoGallery updatedGallery = photoGalleryRepository.save(gallery);
        searchService.indexContent(updatedGallery);
        return updatedGallery;
    }

    @Transactional
    // Delete 
    public void delete(Long id) {
        PhotoGallery photoGallery = photoGalleryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("PhotoGallery not found")); 

        List<Media> mediaList = new ArrayList<>(photoGallery.getMediaList());
        
        for (Media media : mediaList) {
            mediaService.deleteFile(media);
        }

        photoGallery.getTags().clear();

        if(photoGallery.getFeaturedImage() != null) {
            mediaService.deleteFile(photoGallery.getFeaturedImage());
        }
        
        searchService.deleteContentFromIndex(id);
        photoGalleryRepository.delete(photoGallery);
    }
}
