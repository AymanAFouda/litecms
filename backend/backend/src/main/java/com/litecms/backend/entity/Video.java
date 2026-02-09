package com.litecms.backend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue(value ="VIDEO")
public class Video extends Content{
   
 
    private String videoUrl;

    public Video(){
        
    } 
    
    public Video(String videoUrl) {
        this.videoUrl = videoUrl;
    }



    public Video(String title, String description, String tags, Category category, Status status, String videoUrl) {
        super(title, description, tags, category, status);
        this.videoUrl = videoUrl;
    }



    //#region Getters and Setters
    public String getVideoUrl() {
        return videoUrl;
    }
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    //#endregion
    
}
