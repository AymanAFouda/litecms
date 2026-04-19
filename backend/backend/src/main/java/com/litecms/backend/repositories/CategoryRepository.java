package com.litecms.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.litecms.backend.dto.CategoryCountDTO;
import com.litecms.backend.entity.Category;

@Repository
public interface CategoryRepository extends  JpaRepository<Category, Long> {

    @Query("SELECT new com.litecms.backend.dto.CategoryCountDTO(c.name, COUNT(cont)) " +
        "FROM Category c " +
        "LEFT JOIN c.contents cont " +
        "WHERE cont.status = com.litecms.backend.entity.Status.PUBLISHED " +
        "GROUP BY c.name " +
        "ORDER BY COUNT(cont) DESC")
    List<CategoryCountDTO> findCategoryCounts();
}
