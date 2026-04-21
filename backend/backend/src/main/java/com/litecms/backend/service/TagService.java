package com.litecms.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Tag;
import com.litecms.backend.repositories.TagRepository;
 
 
@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag create(Tag tag) {
        return tagRepository.save(tag);
    }

    public Tag update(Long id, Tag tag) {
        Tag existing = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        existing.setName(tag.getName());
        return tagRepository.save(existing);
    }

    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    public void delete(Long id) {
        tagRepository.deleteById(id);
    }

    public List<Tag> getPopularTags() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        // PageRequest.of(0, 10) ensures we only get the top 10 results
        return tagRepository.findTopPopularTags(oneMonthAgo, PageRequest.of(0, 10));
    }
}
