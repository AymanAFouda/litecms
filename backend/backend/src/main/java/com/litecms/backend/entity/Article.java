package com.litecms.backend.entity;

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



    public Article(String title, String description, String tags, Category category, Status status,
            String articleBody) {
        super(title, description, tags, category, status);
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
