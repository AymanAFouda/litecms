package com.litecms.backend.dto;

public class StatsDTO {

    private int totalContent;
    private int contentThisWeek;
    private int publishedContent;
    private int totalViews;
    private int totalLikes;
    private int totalComments;

    
    public StatsDTO(){}


    public StatsDTO(int totalContent, int contentThisWeek, int publishedContent, int totalViews, int totalLikes,
            int totalComments) {
        this.totalContent = totalContent;
        this.contentThisWeek = contentThisWeek;
        this.publishedContent = publishedContent;
        this.totalViews = totalViews;
        this.totalLikes = totalLikes;
        this.totalComments = totalComments;
    }


    public int getTotalContent() {
        return totalContent;
    }


    public void setTotalContent(int totalContent) {
        this.totalContent = totalContent;
    }


    public int getContentThisWeek() {
        return contentThisWeek;
    }


    public void setContentThisWeek(int contentThisWeek) {
        this.contentThisWeek = contentThisWeek;
    }


    public int getPublishedContent() {
        return publishedContent;
    }


    public void setPublishedContent(int publishedContent) {
        this.publishedContent = publishedContent;
    }


    public int getTotalViews() {
        return totalViews;
    }


    public void setTotalViews(int totalViews) {
        this.totalViews = totalViews;
    }


    public int getTotalLikes() {
        return totalLikes;
    }


    public void setTotalLikes(int totalLikes) {
        this.totalLikes = totalLikes;
    }


    public int getTotalComments() {
        return totalComments;
    }


    public void setTotalComments(int totalComments) {
        this.totalComments = totalComments;
    }

    

}
