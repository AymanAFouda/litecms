package com.litecms.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.entity.Article;
import com.litecms.backend.service.ArticleService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/articles")
public class ArticleController {
    

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

     @PostMapping
    public Article create(@RequestBody Article article) {
        return articleService.create(article);
    }

    
    @PutMapping("/{id}")
    public Article update(@PathVariable Long id,
                           @RequestBody Article article) {
        article.setContentId(id);
        return articleService.update(article);
    }

      // Get all Article
    @GetMapping
    public List<Article> getAllContents() {
        return articleService.findAll();
    }

    // Get Article by ID
    @GetMapping("/{id}")
    public Article getContentById(@PathVariable Long id) {
        return articleService.findById(id);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        articleService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
