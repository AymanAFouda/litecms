package com.litecms.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.Media;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long>{

}
