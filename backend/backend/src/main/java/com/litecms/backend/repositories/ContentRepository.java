package com.litecms.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.litecms.backend.entity.Content;

@NoRepositoryBean
public interface ContentRepository extends  JpaRepository<Content, Long> {

}
