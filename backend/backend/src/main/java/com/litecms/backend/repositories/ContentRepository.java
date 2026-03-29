package com.litecms.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.Category;
import com.litecms.backend.entity.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    // Increment view count
    @Modifying
    @Query("UPDATE Content c SET c.viewCount = c.viewCount + 1 WHERE c.contentId = :id")
    void incrementView(@Param("id") Long id);

    // Increment like count
    @Modifying
    @Query("UPDATE Content c SET c.likeCount = c.likeCount + 1 WHERE c.contentId = :id")
    void incrementLike(@Param("id") Long id);

    // Decrement like count (prevent negative)
    @Modifying
    @Query("UPDATE Content c SET c.likeCount = CASE WHEN c.likeCount > 0 THEN c.likeCount - 1 ELSE 0 END WHERE c.contentId = :id")
    void decrementLike(@Param("id") Long id);


    @EntityGraph(attributePaths = {"tags", "category"})
    List<Content> findAll();

    @EntityGraph(attributePaths = {"tags", "category"})
    List<Content> findByCategory(Category category);

    @EntityGraph(attributePaths = {"tags", "category"})
    @Query("SELECT DISTINCT c FROM Content c JOIN c.tags t WHERE t.tagId IN :tagIds")
    List<Content> findDistinctByTagIds(@Param("tagIds") List<Long> tagIds);
}