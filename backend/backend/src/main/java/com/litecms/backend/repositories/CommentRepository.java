package com.litecms.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.Comment;

@Repository
public interface CommentRepository extends  JpaRepository<Comment, Long>{

}
