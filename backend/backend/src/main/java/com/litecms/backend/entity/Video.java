package com.litecms.backend.entity;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue(value ="VIDEO")
public class Video extends Content{
   
    private String videoUrl;

    public Video() {} 
    
    public Video(String videoUrl) {
        this.videoUrl = videoUrl;
    }
 
    public Video(Long contentId, String title, String description, Integer likeCount, Integer viewCount,
            LocalDateTime createdAt, Status status, Category category, Set<Tag> tags, Media featuredImage,
            Set<Comment> comments, String videoUrl) {
        super(contentId, title, description, likeCount, viewCount, createdAt, status, category, tags, featuredImage,
                comments);
        this.videoUrl = videoUrl;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
