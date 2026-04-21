package com.litecms.backend.service;

 import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Media;
import com.litecms.backend.entity.Status;
import com.litecms.backend.entity.Tag;
import com.litecms.backend.entity.Video;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.TagRepository;
import com.litecms.backend.repositories.VideoRepository;

import jakarta.transaction.Transactional;

@Service
public class VideoService {
        
    private final VideoRepository videoRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final MediaService mediaService;
    private final SearchService searchService;

    public VideoService(VideoRepository videoRepository, CategoryRepository categoryRepository,
            TagRepository tagRepository, MediaService mediaService, SearchService searchService
        ) {
        this.videoRepository = videoRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.mediaService = mediaService;
        this.searchService = searchService;
    }

    //get published Video
    public List<Video> getPublishedVideos() {
        return videoRepository.findByStatusOrderByCreatedAtDesc(Status.PUBLISHED);
    }

    //get Published Videos By Category
    public List<Video> getPublishedVideosByCategory(String categoryName) {
        return videoRepository.findByCategoryNameAndStatusOrderByCreatedAtDesc(categoryName, Status.PUBLISHED);
    }

    //get Published Videos By Tag
    public List<Video> getPublishedVideosByTag(String tagName) {
        return videoRepository.findByTagNameAndStatus(tagName, Status.PUBLISHED);
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

    // Create Video
    @Transactional
    public Video create(Video video, MultipartFile featuredImage) throws IOException {

        // Ensure category exists
        if (video.getCategory() != null) {

            Long categoryId = video.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            video.setCategory(category);
        }

        //Handle Tags 
        if (video.getTags() != null) {
            Set<Tag> processedTags = video.getTags().stream()
                .map(tag -> tagRepository.findByName(tag.getName())
                    .orElseGet(() -> tagRepository.save(tag))) 
                .collect(Collectors.toSet()); // Change .toList() to this
            
            video.setTags(processedTags);
        }

        //Handle Featured Image
        if (featuredImage != null ){
            Media savedFeaturedImage = mediaService.saveFeaturedImage(featuredImage);
            video.setFeaturedImage(savedFeaturedImage);
        }
            
        Video createdVideo = videoRepository.save(video);
        searchService.indexContent(createdVideo);
        return createdVideo;
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
                .map(tag -> tagRepository.findByName(tag.getName())
                .orElseGet(() -> {
                    // Important: If it's a new tag, we must save it first
                    Tag newTag = new Tag();
                    newTag.setName(tag.getName());
                    return tagRepository.save(newTag);
                }))
                .collect(Collectors.toSet());

            video.setTags(processedTags);
        }

        // Handle Featured Image Update
        if (newFeaturedImage != null && !newFeaturedImage.isEmpty()) {

            // Delete old image if exists
            if (originalVideo.getFeaturedImage() != null) {
                mediaService.deleteFile(originalVideo.getFeaturedImage());
            }

            // Save new image
            Media savedImage = mediaService.saveFeaturedImage(newFeaturedImage);
            video.setFeaturedImage(savedImage);
        } else {
            // Keep old image if no new image uploaded
            video.setFeaturedImage(originalVideo.getFeaturedImage());
        }

        Video updatedVideo = videoRepository.save(video);
        searchService.indexContent(updatedVideo);
        return updatedVideo;
    }

    // Delete Video
    @Transactional
    public void delete(Long id) {
        Video video = videoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article not found"));

        video.getTags().clear();

        if(video.getFeaturedImage() != null) {
            mediaService.deleteFile(video.getFeaturedImage());
        }
        
        searchService.deleteContentFromIndex(id);
        videoRepository.delete(video);
    }
}






