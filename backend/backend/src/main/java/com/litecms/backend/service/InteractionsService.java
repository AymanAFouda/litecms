package com.litecms.backend.service;

import org.springframework.stereotype.Service;

import com.litecms.backend.repositories.ContentRepository;

import jakarta.transaction.Transactional;

@Service
public class InteractionsService {

    private final ContentRepository contentRepository;

    public InteractionsService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @Transactional
    public void incrementView(Long id) {
        contentRepository.incrementView(id);
    }

    @Transactional
    public void incrementLike(Long id) {
        contentRepository.incrementLike(id);
    }

    @Transactional
    public void decrementLike(Long id) {
        contentRepository.decrementLike(id);
    }
}