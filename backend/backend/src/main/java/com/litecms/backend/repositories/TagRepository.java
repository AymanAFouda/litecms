package com.litecms.backend.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.Tag;

@Repository
public interface TagRepository extends  JpaRepository<Tag, Long>{
        Optional<Tag> findByTagName(String tagName);

        @Query("SELECT t FROM Tag t " +
           "JOIN t.contents c " +
           "WHERE c.createdAt >= :startDate " +
           "GROUP BY t.tagId " +
           "ORDER BY COUNT(c) DESC")
    List<Tag> findTopPopularTags(LocalDateTime startDate, Pageable pageable);
}
 
