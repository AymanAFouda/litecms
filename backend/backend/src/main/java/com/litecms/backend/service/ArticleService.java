package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Article;
import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Content;
import com.litecms.backend.repositories.ArticleRepository;
import com.litecms.backend.repositories.CategoryRepository;
 

@Service

public class ArticleService {

    private final ArticleRepository contentRepository;
    private final CategoryRepository categoryRepository;


  

public ArticleService(ArticleRepository contentRepository, CategoryRepository categoryRepository) {

    this.contentRepository = contentRepository;
    this.categoryRepository = categoryRepository;

}

// Create content

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
            article.getArticleBody()
        );
        return contentRepository.save(newArticle);
        }
        return contentRepository.save(content);
            }

    // Update content

    public Article update(Long id, Article content) {
            Content existing = contentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article not found"));
            existing.setTitle(content.getTitle());
            existing.setDescription(content.getDescription());
            existing.setTags(content.getTags());

            if (content.getCategory() != null) {
            Long categoryId = content.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Category not found"));
            existing.setCategory(category);
            }

            if (existing instanceof Article existingArticle && content instanceof Article incomingArticle) {
            existingArticle.setArticleBody(incomingArticle.getArticleBody());

            }
            return contentRepository.save(content);
    }

    // Get all content
    public List<Content> findAll() {
        return contentRepository.findAll();
    }

    // Get content by ID
    public Content findById(Long id) {
        return contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
    }
 
    // Delete content
    public void delete(Long id) {
        contentRepository.deleteById(id);

        
    }
        
}
