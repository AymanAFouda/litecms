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

    public Article(Long contentId, String title, String description, String tags, Integer likeCount, Integer viewCount,
            Category category, String articleBody) {
        super(contentId, title, description, tags, likeCount, viewCount, category);
        this.articleBody = articleBody;
    }



    public String getArticleBody() {
        return articleBody;
    }



    public void setArticleBody(String articleBody) {
        this.articleBody = articleBody;
    }

    

    
}
