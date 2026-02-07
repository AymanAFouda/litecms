package com.litecms.backend.service;

 import java.util.List;

 import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Video;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.VideoRepository;

@Service
public class VideoService {
    
        private final VideoRepository videoRepository;
        private final CategoryRepository categoryRepository;

    public VideoService(VideoRepository videoRepository, CategoryRepository categoryRepository) {

        this.videoRepository = videoRepository;
        this.categoryRepository = categoryRepository;

    }

      // Create content

public Video create(Video content) {

// Ensure category exists

        if (content.getCategory() != null) {

        Long categoryId = content.getCategory().getId();
        Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new RuntimeException("Category not found"));
        content.setCategory(category);
        }


        

        if (content instanceof Video video) {
        Video newVideo = new Video(
            content.getTitle(),
            content.getDescription(),
            content.getTags(),
            content.getCategory(),
            content.getStatus(),
            video.getVideoUrl()
        );
        return videoRepository.save(newVideo);
        }
        return videoRepository.save(content);
            }

// Update content

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

            return videoRepository.save(video);
    }

     // Get all content
    public List<Video> findAll() {
        return videoRepository.findAll();
    }

    // Get content by ID
    public Video findById(Long id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
    }
 
    // Delete content
    public void delete(Long id) {
        videoRepository.deleteById(id);

        
    }


}
