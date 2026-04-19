package com.litecms.backend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Article;
import com.litecms.backend.service.ArticleService;
import com.litecms.backend.service.InteractionsService;
import com.litecms.backend.service.SearchService;

@RestController
@RequestMapping("/api")
public class ArticleController {
    
    private final ArticleService articleService;
    private final SearchService searchService ;
    private final InteractionsService interactionsService;

    public ArticleController(ArticleService articleService,SearchService searchService,InteractionsService interactionsService) {
        this.articleService = articleService;
        this.searchService = searchService;
        this.interactionsService = interactionsService;
    }

    //get Published Articles
    @GetMapping("/articles")
    public List<Article> getPublishedArticles(){
        return articleService.getPublishedArticles();
    }

    // Get published articles by category name
    @GetMapping("/articles/category/{name}")
    public List<Article> getPublishedArticlesByCategory(@PathVariable String name) {
        return articleService.getPublishedArticlesByCategory(name);
    }

    // Get published articles by tag name
    @GetMapping("/articles/tag/{name}")
    public List<Article> getPublishedArticlesByTag(@PathVariable String name) {
        return articleService.getPublishedArticlesByTag(name);
    }

    // Create Article
    @PostMapping(value = "/publisher/articles", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) 
    public Article createArticle(@RequestPart(value = "featuredImage", required = false)
        MultipartFile featuredImage, @RequestPart("article") Article article) throws IOException {

            Article savedArticle = articleService.create(article, featuredImage);
            searchService.indexContent(savedArticle);
            return savedArticle;
    }

    //Update Article
    @PutMapping(value = "/publisher/articles/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public  Article updateArticle(
            @PathVariable Long id,
            @RequestPart("article") Article article,
            @RequestPart(value = "featuredImage", required = false) MultipartFile featuredImage
        ) throws IOException {

        article.setContentId(id);
        Article updatedArticle = articleService.update(article, featuredImage);
        searchService.indexContent(updatedArticle);

        return updatedArticle;
    }

    // Get all Article
    @GetMapping("/publisher/articles")
    public List<Article> getAllContents() {
        return articleService.findAll();
    }
  
    // Get By Article Id 
   @GetMapping("/publisher/articles/{id}")
    public Article getContentById(@PathVariable Long id) {
        interactionsService.incrementView(id); // COUNT VIEW
        return articleService.findById(id);
    }
 
 
    //Delete Article
   @DeleteMapping("/publisher/articles/{id}")
    public void deleteContent(@PathVariable Long id) {
        articleService.delete(id);
    }
}

 