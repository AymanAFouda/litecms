package com.litecms.backend.entity;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue(value ="VIDEO")
public class Video extends Content{
   
    @Column(name = "video_url", length = 1000)
    private String videoUrl;

    public Video() {} 
    
    public Video(String videoUrl) {
        this.videoUrl = videoUrl;
    }
 
    public Video(Long contentId, String title, String publisherName, 
            String description, Integer likeCount, Integer viewCount,
            LocalDateTime createdAt, Status status, Category category,
            Set<Tag> tags, Media featuredImage, Set<Comment> comments,
            String videoUrl
        ) {
        super(contentId, title, publisherName, description, likeCount, viewCount, createdAt, status, category, tags, featuredImage,
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
