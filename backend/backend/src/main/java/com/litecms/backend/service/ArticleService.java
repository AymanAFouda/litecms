package com.litecms.backend.service;

 import java.io.IOException;
import java.util.List;
 import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Article;
import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Media;
import com.litecms.backend.entity.Tag;
import com.litecms.backend.repositories.ArticleRepository;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.TagRepository;

import jakarta.transaction.Transactional;
 

@Service
public class ArticleService {
    @Autowired
    private final ArticleRepository articleRepository;

    @Autowired
    private final CategoryRepository categoryRepository;

    @Autowired
    private final TagRepository tagRepository;

    private final MediaService mediaService;


    public ArticleService(ArticleRepository articleRepository, CategoryRepository categoryRepository, TagRepository tagRepository,MediaService mediaService) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.mediaService = mediaService;
    }   

    // Create Article  
    @Transactional
    public Article create(Article content, MultipartFile featuredImage) throws IOException {

        // Ensure category exists
        if (content.getCategory() != null) {
            Long categoryId = content.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Category not found"));
            content.setCategory(category);
        }

        //Handle Tags 
        if (content.getTags() != null) {
            Set<Tag> processedTags = content.getTags().stream()
                .map(tag -> tagRepository.findByTagName(tag.getTagName())
                .orElseGet(() -> tagRepository.save(tag))) 
                .collect(Collectors.toSet()); // Change .toList() to this
            
            content.setTags(processedTags);
        }

        //Handle Featured Image
        Media savedFeaturedImage = mediaService.saveFeaturedImage(featuredImage);

        content.setFeaturedImage(savedFeaturedImage);

        return articleRepository.save(content);
    }

    // Update Article
    @Transactional
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
            // Handle Tags 
             if (article.getTags() != null) {
            Set<Tag> processedTags = article.getTags().stream()
                .map(tag -> tagRepository.findByTagName(tag.getTagName())
                    .orElseGet(() -> {
                        // Important: If it's a new tag, we must save it first
                        Tag newTag = new Tag();
                        newTag.setTagName(tag.getTagName());
                        return tagRepository.save(newTag);
                    }))
                .collect(Collectors.toSet());
        
        // This replaces the old set with the new set of managed tags
                article.setTags(processedTags);
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
 
    @Transactional
    public void delete(Long id) {
    // 1. Fetch the article first
    Article article = articleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article not found"));

    // 2. Clear the links to tags  
    article.getTags().clear();

    // 3. Delete the article  
    articleRepository.delete(article);
}
        
}


 //#region comments

/*

     if (content instanceof Article article) {
        Article newArticle = new Article(
         null,
        content.getTitle(),
        content.getDescription(),
        0,
        0,
        java.time.LocalDateTime.now(),
        content.getStatus(),
        content.getCategory(),
        content.getTags(),
        article.getArticleBody()
        );
        return articleRepository.save(newArticle);
        }


*/

/*
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
*/

//#endregion