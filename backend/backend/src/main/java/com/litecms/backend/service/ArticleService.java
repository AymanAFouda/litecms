package com.litecms.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import com.litecms.backend.repositories.MediaRepository;
import com.litecms.backend.repositories.TagRepository;

import jakarta.transaction.Transactional;
 
@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    private final CategoryRepository categoryRepository;

    private final TagRepository tagRepository;

    private final MediaService mediaService;

    private final MediaRepository mediaRepository;

    private final String uploadDir = "uploads";

    public ArticleService(ArticleRepository articleRepository, CategoryRepository categoryRepository, TagRepository tagRepository, MediaService mediaService, MediaRepository mediaRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.mediaService = mediaService;
        this.mediaRepository = mediaRepository;
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
        if (featuredImage != null ){
            Media savedFeaturedImage = mediaService.saveFeaturedImage(featuredImage);
            content.setFeaturedImage(savedFeaturedImage);
        }
        
        return articleRepository.save(content);
    }

    // Update Article
   @Transactional
    public Article update(Article article, MultipartFile newFeaturedImage) throws IOException {

        Article originalArticle = articleRepository.findById(article.getContentId())
            .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setViewCount(originalArticle.getViewCount());
        article.setLikeCount(originalArticle.getLikeCount());

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
                    .map(tag -> tagRepository.findByTagName(tag.getTagName())
                            .orElseGet(() -> {
                                Tag newTag = new Tag();
                                newTag.setTagName(tag.getTagName());
                                return tagRepository.save(newTag);
                            }))
                    .collect(Collectors.toSet());

            article.setTags(processedTags);
        }

        // Handle Featured Image Update
        if (newFeaturedImage != null && !newFeaturedImage.isEmpty()) {

            // Delete old image if exists
            if (originalArticle.getFeaturedImage() != null) {
                deleteFeaturedImage(originalArticle.getFeaturedImage());
            }

            // Save new image
            Media savedImage = mediaService.saveFeaturedImage(newFeaturedImage);
            article.setFeaturedImage(savedImage);
        } else {
            // Keep old image if no new image uploaded
            article.setFeaturedImage(originalArticle.getFeaturedImage());
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

    //Delete
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

    // Get articles by category name
    public List<Article> getByCategory(String categoryName) {
        return articleRepository.findByCategory_name(categoryName);
    }

    // Get articles by tag name
    public List<Article> getByTag(String tagName) {
        return articleRepository.findDistinctByTagName(tagName);
    }

    public void deleteFeaturedImage(Media featuredImage) {
        try {   
            String storedFileName = Paths.get(featuredImage.getFileUrl()).getFileName().toString();

            Path filePath = Paths.get(uploadDir)
                .resolve(storedFileName)
                .normalize();

            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + featuredImage, e);
        }
        mediaRepository.delete(featuredImage); 
    }   
}


