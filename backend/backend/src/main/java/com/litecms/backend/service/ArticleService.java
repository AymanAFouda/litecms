package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Article;
import com.litecms.backend.entity.Category;
import com.litecms.backend.repositories.ArticleRepository;
import com.litecms.backend.repositories.CategoryRepository;
 

@Service

public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;

public ArticleService(ArticleRepository articleRepository, CategoryRepository categoryRepository) {

    this.articleRepository = articleRepository;
    this.categoryRepository = categoryRepository;

}

// Create Article  
 public Article create(Article content) {

// Ensure category exists

        if (content.getCategory() != null) {

        Long categoryId = content.getCategory().getId();
        Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new RuntimeException("Category not found"));
        content.setCategory(category);
        }

        

        if (content instanceof Article article) {
        Article newArticle = new Article(
            content.getTitle(),
            content.getDescription(),
            content.getTags(),
            content.getCategory(),
            content.getStatus(),
            article.getArticleBody()
        );
        return articleRepository.save(newArticle);
        }
        return articleRepository.save(content);
            }

    // Update Article

    public Article update(Article article) {
            Article originalArticle = articleRepository.findById(article.getContentId())
            .orElseThrow(() -> new RuntimeException("Article not found"));

            article.setViewCount(originalArticle.getViewCount());
            article.setLikeCount(originalArticle.getLikeCount());

            if (article.getCategory() != null) {
                Long categoryId = article.getCategory().getId();
                categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            }

            return articleRepository.save(article);
    }

    // Get all Article
    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    // Get Article by ID
    public Article findById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
    }
 
    // Delete Article
    public void delete(Long id) {
        articleRepository.deleteById(id);

        
    }
        
}
