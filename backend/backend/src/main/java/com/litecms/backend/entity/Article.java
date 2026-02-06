package com.litecms.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue(value ="Article")
public class Article extends Content{

    @Column(name = "Article_Body")
    private String articleBody;

    public Article(){
        
    }

   

    public Article(String articleBody) {
        this.articleBody = articleBody;
    }

    public Article(String title, String description, String tags, Category category, String articleBody) {
        super(title, description, tags, category);
        this.articleBody = articleBody;
    }



    public String getArticleBody() {
        return articleBody;
    }



    public void setArticleBody(String articleBody) {
        this.articleBody = articleBody;
    }

    

    
}
