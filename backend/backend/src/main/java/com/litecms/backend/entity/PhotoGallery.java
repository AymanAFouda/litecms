package com.litecms.backend.entity;

import java.util.List;

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

    public PhotoGallery(String title, String description, String tags, Category category, Status status,
            List<Media> mediaList) {
        super(title, description, tags, category, status);
        this.mediaList = mediaList;
    }

    public List<Media> getMediaList() {
        return mediaList;
    }

    public void setMediaList(List<Media> mediaList) {
        this.mediaList = mediaList;
    }
}
