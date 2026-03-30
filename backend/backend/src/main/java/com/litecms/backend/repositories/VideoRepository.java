package com.litecms.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {


    @EntityGraph(attributePaths = {"tags", "category"})
    List<Video> findByCategoryName(String name);

    @EntityGraph(attributePaths = {"tags", "category"})
    @Query("SELECT DISTINCT v FROM Video v JOIN v.tags t WHERE t.tagName = :tagName")
    List<Video> findDistinctByTagName(@Param("tagName") String tagName);

}
