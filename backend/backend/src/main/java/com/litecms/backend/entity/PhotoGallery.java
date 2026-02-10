package com.litecms.backend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue(value ="PHOTOGALLERY")
public class PhotoGallery extends Content{
    
    public PhotoGallery() {
    }
    public PhotoGallery(String title, String description, String tags, Category category, Status status) {
        super(title, description, tags, category, status);
    }


}
