package com.litecms.backend.service;

 import java.util.List;
import java.util.Set;
 import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Tag;
import com.litecms.backend.entity.Video;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.TagRepository;
import com.litecms.backend.repositories.VideoRepository;

import jakarta.transaction.Transactional;

@Service
public class VideoService {
        @Autowired
        private final VideoRepository videoRepository;
        @Autowired
        private final CategoryRepository categoryRepository;
        @Autowired
        private final TagRepository tagRepository;

    public VideoService(VideoRepository videoRepository, CategoryRepository categoryRepository,TagRepository tagRepository) {

        this.videoRepository = videoRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository=tagRepository;

    }

      // Create Video
    @Transactional
    public Video create(Video content) {


        
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
            
            //Save Article 
            if (content instanceof Video video) {
                
                return videoRepository.save(content);
            }
          return videoRepository.save(content);
            }

// Update Video
    @Transactional
    public Video update(Video video) {
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


}







/*
 create
// Ensure category exists

        if (content.getCategory() != null) {

        Long categoryId = content.getCategory().getId();
        Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new RuntimeException("Category not found"));
        content.setCategory(category);
        }


        

        if (content instanceof Video video) {
        Video newVideo = new Video(
            null,
            content.getTitle(),
            content.getDescription(),
            0,
            0,
            java.time.LocalDateTime.now(),
            content.getStatus(),
            content.getCategory(),
            content.getTags(),
            video.getVideoUrl()
        );
        return videoRepository.save(newVideo);
        }
        return videoRepository.save(content);


update
  Video originalVideo = videoRepository.findById(video.getContentId())
            .orElseThrow(() -> new RuntimeException("Video not found"));
            video.setViewCount(originalVideo.getViewCount());
            video.setLikeCount(originalVideo.getLikeCount());

            if (video.getCategory() != null) {
                Long categoryId = video.getCategory().getId();
                categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            }





*/