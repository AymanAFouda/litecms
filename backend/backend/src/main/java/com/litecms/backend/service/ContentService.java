package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Article;
import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Content;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.ContentRepository;

@Service
public class ContentService {

    private final ContentRepository contentRepository;
    private final CategoryRepository categoryRepository;

    public ContentService(ContentRepository contentRepository, CategoryRepository categoryRepository) {
        this.contentRepository = contentRepository;
        this.categoryRepository = categoryRepository;
    }

    // Create content
    public Content create(Content content) {
        // Ensure category exists
        if (content.getCategory() != null) {
            Long categoryId = content.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            content.setCategory(category);
        }

        if (content instanceof Article article) {
            Article newArticle = new Article(
                content.getContentId(),
                content.getTitle(),
                content.getDescription(),
                content.getTags(),
                content.getLikeCount(),
                content.getViewCount(),
                content.getCategory(),
                article.getArticleBody() 
            );
            return contentRepository.save(newArticle);
        }

        return contentRepository.save(content);
    }

    // Update content
    public Content update(Long id, Content content) {
        Content existing = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found"));

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

        return contentRepository.save(existing);
    }

    // Get all content
    public List<Content> findAll() {
        return contentRepository.findAll();
    }

    // Get content by ID
    public Content findById(Long id) {
        return contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found"));
    }

    // Delete content
    public void delete(Long id) {
        contentRepository.deleteById(id);
    }
}



 