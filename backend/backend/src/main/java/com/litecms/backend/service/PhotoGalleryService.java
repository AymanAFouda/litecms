package com.litecms.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import com.litecms.backend.repositories.MediaRepository;
import com.litecms.backend.repositories.PhotoGalleryRepository;
import com.litecms.backend.repositories.TagRepository;

import jakarta.transaction.Transactional;

@Service
public class PhotoGalleryService {


    private final PhotoGalleryRepository photoGalleryRepository;

    private final CategoryRepository categoryRepository;

    private final MediaService mediaService;

    private final MediaRepository mediaRepository;

    private final TagRepository tagRepository;


    private final String uploadDir = "uploads";

    public PhotoGalleryService(PhotoGalleryRepository photoGalleryRepository, CategoryRepository categoryRepository, MediaService mediaService ,MediaRepository mediaRepository,  TagRepository tagRepository) {
        this.photoGalleryRepository = photoGalleryRepository;
        this.categoryRepository = categoryRepository;
        this.mediaService = mediaService;
        this.mediaRepository = mediaRepository;
        this.tagRepository = tagRepository;

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

    // Create PhotoGallery  
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
            Media media = mediaService.saveFile(file, createdGallery);
        }

        return createdGallery;
    }

    @Transactional
    // Update PhotoGallery
    public PhotoGallery update(PhotoGallery photoGallery, MultipartFile[] files, MultipartFile newFeaturedImage) throws IOException {

        PhotoGallery original = photoGalleryRepository.findById(photoGallery.getContentId())
        .orElseThrow(() -> new RuntimeException("PhotoGallery not found"));

        // Keep view and like counts
        original.setViewCount(photoGallery.getViewCount());
        original.setLikeCount(photoGallery.getLikeCount());

        // Handle Category
        if (photoGallery.getCategory() != null) {
            Long categoryId = photoGallery.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            original.setCategory(category);
        }

        // Handle Tags
        if (photoGallery.getTags() != null) {
            Set<Tag> processedTags = photoGallery.getTags().stream()
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

        return photoGalleryRepository.save(original);
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

    // Delete 
    public void delete(Long id) {
        PhotoGallery photoGallery = photoGalleryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("PhotoGallery not found")); 

        List<Media> mediaList = new ArrayList<>(photoGallery.getMediaList());
        
        for (Media media : mediaList) {
            mediaService.deleteFile(media);
        }

        //Clear the links to tags  
        photoGallery.getTags().clear();
        
        photoGalleryRepository.delete(photoGallery);
    }

    public void deleteFeaturedImage(Media featuredImage) {
        try {   
            String storedFileName = Paths.get(featuredImage.getFileUrl()).getFileName().toString();

            Path filePath = Paths.get(uploadDir)
                .resolve(storedFileName)
                .normalize();

            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + featuredImage, e);
        }
        mediaRepository.delete(featuredImage);
    }
}
