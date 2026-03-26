package com.litecms.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

}
