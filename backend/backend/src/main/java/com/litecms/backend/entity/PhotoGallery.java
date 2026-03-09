package com.litecms.backend.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue(value ="PHOTOGALLERY")
public class PhotoGallery extends Content{
    
    @OneToMany(mappedBy="photoGallery", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Media> mediaList;

    public PhotoGallery() {
    }
 

    public PhotoGallery(List<Media> mediaList) {
        this.mediaList = mediaList;
    }

    public PhotoGallery(Long contentId, String title, String description, Integer likeCount, Integer viewCount,
            LocalDateTime createdAt, Status status, Category category, Set<Tag> tags, Media featuredImage,
            List<Media> mediaList) {
        super(contentId, title, description, likeCount, viewCount, createdAt, status, category, tags, featuredImage);
        this.mediaList = mediaList;
    }



    public List<Media> getMediaList() {
        return mediaList;
    }

    public void setMediaList(List<Media> mediaList) {
        this.mediaList = mediaList;
    }

   
}




