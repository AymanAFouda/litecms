package com.litecms.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.Tag;

@Repository
public interface TagRepository extends  JpaRepository<Tag, Long>{
        Optional<Tag> findByTagName(String tagName);
}
