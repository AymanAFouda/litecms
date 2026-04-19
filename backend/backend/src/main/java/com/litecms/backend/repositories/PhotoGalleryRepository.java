package com.litecms.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.PhotoGallery;
import com.litecms.backend.entity.Status;

@Repository
public interface PhotoGalleryRepository  extends JpaRepository<PhotoGallery, Long> {

    @EntityGraph(attributePaths = {"tags", "category"})
    List<PhotoGallery> findByCategoryName(String name);

    @EntityGraph(attributePaths = {"tags", "category"})
    @Query("SELECT DISTINCT p FROM PhotoGallery p JOIN p.tags t WHERE t.tagName = :tagName")
    List<PhotoGallery> findDistinctByTagName(@Param("tagName") String tagName);

    List<PhotoGallery> findByStatusOrderByCreatedAtDesc(Status status);

    List<PhotoGallery> findByCategoryNameAndStatusOrderByCreatedAtDesc(String name, Status status);

    @Query("SELECT DISTINCT p FROM PhotoGallery p JOIN p.tags t " +
           "WHERE t.tagName = :tagName AND p.status = :status " +
           "ORDER BY p.createdAt DESC")
    List<PhotoGallery> findByTagNameAndStatus(@Param("tagName") String tagName, @Param("status") Status status);
}

