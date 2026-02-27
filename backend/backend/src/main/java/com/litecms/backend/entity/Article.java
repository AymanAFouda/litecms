package com.litecms.backend.entity;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue(value ="ARTICLE")
public class Article extends Content{

    @Column(name = "Article_Body")
    private String articleBody;

    public Article(){
        
    }



    public Article(String articleBody) {
        this.articleBody = articleBody;
    }


    
    public Article(Long contentId, String title, String description, Integer likeCount, Integer viewCount,
            LocalDateTime createdAt, Status status, Category category, Set<Tag> tags, String articleBody) {
        super(contentId, title, description, likeCount, viewCount, createdAt, status, category, tags);
        this.articleBody = articleBody;
    }


    //#region Getters and Setters
    public String getArticleBody() {
        return articleBody;
    }



    public void setArticleBody(String articleBody) {
        this.articleBody = articleBody;
    }
    //#endregion  
}
