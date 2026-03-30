package com.litecms.backend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/articles")
public class ArticleController {
    

    private final ArticleService articleService;
    private final SearchService searchService ;
    private final InteractionsService interactionsService;

    public ArticleController(ArticleService articleService,SearchService searchService,InteractionsService interactionsService) {
        this.articleService = articleService;
        this.searchService = searchService;
        this.interactionsService = interactionsService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE) 
    public ResponseEntity<Article> create(@RequestPart(value = "featuredImage", required = false)
        MultipartFile featuredImage, @RequestPart("article") Article article) throws IOException {

            Article savedArticle = articleService.create(article, featuredImage);
            searchService.indexContent(savedArticle);
            return ResponseEntity.status(201).body(savedArticle);
    }
    //update
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Article> update(
            @PathVariable Long id,
            @RequestPart("article") Article article,
            @RequestPart(value = "featuredImage", required = false) MultipartFile featuredImage
        ) throws IOException {

        article.setContentId(id);
        Article updatedArticle = articleService.update(article, featuredImage);
        searchService.indexContent(updatedArticle);

        return ResponseEntity.ok(updatedArticle);
    }

    // Get all Article
    @GetMapping
    public List<Article> getAllContents() {
        return articleService.findAll();
    }

  @GetMapping("/{id}")
    public ResponseEntity<Article> getContentById(@PathVariable Long id) {
           interactionsService.incrementView(id); // COUNT VIEW
        return ResponseEntity.ok(articleService.findById(id));
    }

    // Like article
    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likeArticle(@PathVariable Long id) {
        interactionsService.incrementLike(id); // COUNT LIKE
        return ResponseEntity.ok().build();
    }

    // Unlike article
    @PostMapping("/{id}/unlike")
    public ResponseEntity<Void> unlikeArticle(@PathVariable Long id) {
        interactionsService.decrementLike(id); // COUNT UNLIKE
        return ResponseEntity.ok().build();
    }
    
    // Get articles by category name
    @GetMapping("/category/{name}")
    public List<Article> getByCategory(@PathVariable String name) {
        return articleService.getByCategory(name);
    }

  

    // Get articles by tag name
    @GetMapping("/tags/{tagName}")
    public List<Article> getByTag(@PathVariable String tagName) {
        return articleService.getByTag(tagName);
    }

   @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        articleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}


