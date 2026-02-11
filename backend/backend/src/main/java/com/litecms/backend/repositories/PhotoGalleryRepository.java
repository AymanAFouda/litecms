package com.litecms.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.litecms.backend.entity.PhotoGallery;


@Repository
public interface PhotoGalleryRepository  extends JpaRepository<PhotoGallery, Long> {

}
