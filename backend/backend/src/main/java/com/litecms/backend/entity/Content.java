package com.litecms.backend.entity;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "contents")
@EntityListeners(AuditingEntityListener.class)
@Inheritance(strategy= InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(
    name ="Content_type",
    discriminatorType = DiscriminatorType.STRING
)
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    private Long contentId;

    @Column(name = "content_title")
    private String title;

    @Column(name = "content_description")
    private String description;

    @Column(name = "like_count")
    private Integer likeCount = 0;

    @Column(name = "view_count")
    private Integer viewCount = 0;
   
    @CreatedDate
    @Column(nullable = false, updatable = false) 
    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(value = EnumType.STRING)
    @Column(length=10)
    private Status status;

    @ManyToOne
    private Category category;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "content_tags",
        joinColumns = @JoinColumn(name = "content_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    @OneToOne
    @JoinColumn(name = "featured_image_id")
    private Media featuredImage;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Comment> comments;

    @Column(name = "Content_type", insertable = false, updatable = false)
    private String type;

    public Content() {}

    public Content(Long contentId, String title, String description, Integer likeCount, 
            Integer viewCount, LocalDateTime createdAt, Status status, Category category, 
            Set<Tag> tags, Media featuredImage, Set<Comment> comments
        ) {
        this.contentId = contentId;
        this.title = title;
        this.description = description;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.createdAt = createdAt;
        this.status = status;
        this.category = category;
        this.tags = tags;
        this.featuredImage = featuredImage;
        this.comments = comments;
    }

    public Long getContentId() {
        return contentId;
    }

    public void setContentId(Long contentId) {
        this.contentId = contentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Media getFeaturedImage() {
        return featuredImage;
    }

    public void setFeaturedImage(Media featuredImage) {
        this.featuredImage = featuredImage;
    }

    public Set<Comment> getComments() {
    return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    } 
}