package com.litecms.backend.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.litecms.backend.dto.StatsDTO;
import com.litecms.backend.entity.Status;
import com.litecms.backend.repositories.CommentRepository;
import com.litecms.backend.repositories.ContentRepository;

@Service
public class PublisherStatsService {

    private final ContentRepository contentRepository;
    private final CommentRepository commentRepository;

    public PublisherStatsService(ContentRepository contentRepository, CommentRepository commentRepository) {
        this.contentRepository = contentRepository;
        this.commentRepository = commentRepository;
    }

    public StatsDTO getStats() {
        // Calculate the date for "this week" (last 7 days)
        LocalDateTime lastWeek = LocalDateTime.now().minusDays(7);

        // Fetching data using your existing entity structure
        int totalContent = (int) contentRepository.count();
        int contentThisWeek = (int) contentRepository.countByCreatedAtAfter(lastWeek);
        int publishedContent = (int) contentRepository.countByStatus(Status.PUBLISHED); // Ensure PUBLISHED matches your Enum
        
        // Using the custom JPQL queries for sums
        Integer views = contentRepository.sumAllViewCount();
        int totalViews = (views != null) ? views : 0;

        Integer likes = contentRepository.sumAllLikeCount();
        int totalLikes = (likes != null) ? likes : 0;

        // Fetching total comments from the CommentRepository
        int totalComments = (int) commentRepository.count();

        return new StatsDTO(
            totalContent,
            contentThisWeek,
            publishedContent,
            totalViews,
            totalLikes,
            totalComments
        );
    }
}
