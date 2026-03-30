package com.litecms.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    // Using @EntityGraph ensures tags are loaded in a single database hit
    @EntityGraph(attributePaths = {"tags", "category"})
    List<Article> findAll();

    @EntityGraph(attributePaths = {"tags", "category"})
    Optional<Article> findById(Long id);

    @EntityGraph(attributePaths = {"tags", "category"})
    List<Article> findByCategory_name(String name);

    @EntityGraph(attributePaths = {"tags", "category"})
    @Query("SELECT DISTINCT a FROM Article a JOIN a.tags t WHERE t.tagName = :tagName")
    List<Article> findDistinctByTagName(@Param("tagName") String tagName);
}

