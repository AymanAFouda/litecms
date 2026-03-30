package com.litecms.backend.service;

 import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;
 import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Media;
import com.litecms.backend.entity.Tag;
import com.litecms.backend.entity.Video;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.MediaRepository;
import com.litecms.backend.repositories.TagRepository;
import com.litecms.backend.repositories.VideoRepository;

import jakarta.transaction.Transactional;

@Service
public class VideoService {
        
        private final VideoRepository videoRepository;

        private final CategoryRepository categoryRepository;

        private final TagRepository tagRepository;

        private final MediaService mediaService;

        private final MediaRepository mediaRepository;

        private final String uploadDir = "uploads";


    public VideoService(VideoRepository videoRepository, CategoryRepository categoryRepository,TagRepository tagRepository,
         MediaService mediaService, MediaRepository mediaRepository) {

        this.videoRepository = videoRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.mediaService = mediaService;
        this.mediaRepository = mediaRepository;

    }

      // Create Video
    @Transactional
    public Video create(Video content, MultipartFile featuredImage) throws IOException {


        
            // Ensure category exists
            if (content.getCategory() != null) {

            Long categoryId = content.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Category not found"));
            content.setCategory(category);
            }


            //Handle Tags 
            if (content.getTags() != null) {
                Set<Tag> processedTags = content.getTags().stream()
                    .map(tag -> tagRepository.findByTagName(tag.getTagName())
                        .orElseGet(() -> tagRepository.save(tag))) 
                    .collect(Collectors.toSet()); // Change .toList() to this
                
                content.setTags(processedTags);
            }

             //Handle Featured Image
        if (featuredImage != null ){
            Media savedFeaturedImage = mediaService.saveFeaturedImage(featuredImage);
            content.setFeaturedImage(savedFeaturedImage);
        }
            
            //Save Article 
            if (content instanceof Video video) {
                
                return videoRepository.save(content);
            }
          return videoRepository.save(content);
            }

// Update Video
    @Transactional
    public Video update(Video video, MultipartFile newFeaturedImage)throws IOException {
            Video originalVideo = videoRepository.findById(video.getContentId())
            .orElseThrow(() -> new RuntimeException("Video not found"));

            video.setViewCount(originalVideo.getViewCount());
            video.setLikeCount(originalVideo.getLikeCount());

            if (video.getCategory() != null) {
                Long categoryId = video.getCategory().getId();
                categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            }

             // Handle Tags 
             if (video.getTags() != null) {
            Set<Tag> processedTags = video.getTags().stream()
                .map(tag -> tagRepository.findByTagName(tag.getTagName())
                    .orElseGet(() -> {
                        // Important: If it's a new tag, we must save it first
                        Tag newTag = new Tag();
                        newTag.setTagName(tag.getTagName());
                        return tagRepository.save(newTag);
                    }))
                .collect(Collectors.toSet());
        
                 // This replaces the old set with the new set of managed tags
                video.setTags(processedTags);
    }
    // Handle Featured Image Update
    if (newFeaturedImage != null && !newFeaturedImage.isEmpty()) {

        // Delete old image if exists
        if (originalVideo.getFeaturedImage() != null) {
            deleteFeaturedImage(originalVideo.getFeaturedImage());
        }

        // Save new image
        Media savedImage = mediaService.saveFeaturedImage(newFeaturedImage);
        video.setFeaturedImage(savedImage);
    } else {
        // Keep old image if no new image uploaded
        video.setFeaturedImage(originalVideo.getFeaturedImage());
    }


        return videoRepository.save(video);
    }

     // Get all Video
    public List<Video> findAll() {
        return videoRepository.findAll();
    }

    // Get Video by ID
    public Video findById(Long id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
    }

    // Get videos by category name
    public List<Video> getByCategory(String categoryName) {
        return videoRepository.findByCategoryName(categoryName);
    }

    // Get videos by tag name
    public List<Video> getByTag(String tagName) {
        return videoRepository.findDistinctByTagName(tagName);
    }

     @Transactional
    // Delete Video
    public void delete(Long id) {
  // 1. Fetch the Video first
    Video video = videoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article not found"));

    // 2. Clear the links to tags  
    video.getTags().clear();

    // 3. Delete the Video  
    videoRepository.delete(video);
    
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






