package com.litecms.backend.service;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Article;
import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Media;
import com.litecms.backend.entity.Status;
import com.litecms.backend.entity.Tag;
import com.litecms.backend.repositories.ArticleRepository;
import com.litecms.backend.repositories.CategoryRepository;
import com.litecms.backend.repositories.TagRepository;

import jakarta.transaction.Transactional;
 
@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final MediaService mediaService;
    private final SearchService searchService;

    public ArticleService(ArticleRepository articleRepository, CategoryRepository categoryRepository,
            TagRepository tagRepository, MediaService mediaService, SearchService searchService
        ) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.mediaService = mediaService;
        this.searchService = searchService;
    }   

    //get Published Articles
    public List<Article> getPublishedArticles() {
        return articleRepository.findByStatusOrderByCreatedAtDesc(Status.PUBLISHED);
    }

    //get Published Articles By Category
    public List<Article> getPublishedArticlesByCategory(String categoryName) {
        return articleRepository.findByStatusAndCategory_NameOrderByCreatedAtDesc(
        Status.PUBLISHED, categoryName);
    }

    //get Published Articles By Tag
    public List<Article> getPublishedArticlesByTag(String tagName) {
        return articleRepository.findPublishedByTagName(Status.PUBLISHED, tagName);
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

    // Get articles by category name
    public List<Article> getByCategory(String categoryName) {
        return articleRepository.findByCategory_name(categoryName);
    }

    // Get articles by tag name
    public List<Article> getByTag(String tagName) {
        return articleRepository.findDistinctByTagName(tagName);
    }

    // Create Article  
    @Transactional
    public Article create(Article article, MultipartFile featuredImage) throws IOException {
        if (article.getStatus() == null) {
            article.setStatus(Status.DRAFT);
        }

        // Ensure category exists
        if (article.getCategory() != null) {
            Long categoryId = article.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
            article.setCategory(category);
        }

        //Handle Tags 
        if (article.getTags() != null) {
            Set<Tag> processedTags = article.getTags().stream()
                .map(tag -> tagRepository.findByName(tag.getName())
                .orElseGet(() -> tagRepository.save(tag))) 
                .collect(Collectors.toSet());
            
            article.setTags(processedTags);
        }

        //Handle Featured Image
        if (featuredImage != null ){
            Media savedFeaturedImage = mediaService.saveFeaturedImage(featuredImage);
            article.setFeaturedImage(savedFeaturedImage);
        }
        
        Article createdArticle = articleRepository.save(article);
        searchService.indexContent(createdArticle);
        return createdArticle;
    }

    // Update Article
    @Transactional
    public Article update(Article article, MultipartFile newFeaturedImage) throws IOException {

        Article originalArticle = articleRepository.findById(article.getContentId())
            .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setViewCount(originalArticle.getViewCount());
        article.setLikeCount(originalArticle.getLikeCount());
        article.setComments(originalArticle.getComments());

        // Handle Category
        if (article.getCategory() != null) {
            Long categoryId = article.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            article.setCategory(category);
        }

        // Handle Tags
        if (article.getTags() != null) {
            Set<Tag> processedTags = article.getTags().stream()
                .map(tag -> tagRepository.findByName(tag.getName())
                    .orElseGet(() -> {
                        Tag newTag = new Tag();
                        newTag.setName(tag.getName());
                        return tagRepository.save(newTag);
                    }))
                .collect(Collectors.toSet());

            article.setTags(processedTags);
        }

        // Handle Featured Image Update
        if (newFeaturedImage != null && !newFeaturedImage.isEmpty()) {

            // Delete old image if exists
            if (originalArticle.getFeaturedImage() != null) {
                mediaService.deleteFile(originalArticle.getFeaturedImage());
            }

            // Save new image
            Media savedImage = mediaService.saveFeaturedImage(newFeaturedImage);
            article.setFeaturedImage(savedImage);
        } else {
            // Keep old image if no new image uploaded
            article.setFeaturedImage(originalArticle.getFeaturedImage());
        }

        Article updatedArticle = articleRepository.save(article);
        searchService.indexContent(updatedArticle);
        return updatedArticle;
    }

    //Delete
    @Transactional
    public void delete(Long id) {
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article not found"));

        article.getTags().clear();

        if(article.getFeaturedImage() != null) {
            mediaService.deleteFile(article.getFeaturedImage());
        }

        searchService.deleteContentFromIndex(id);
        articleRepository.delete(article);
    }
}


