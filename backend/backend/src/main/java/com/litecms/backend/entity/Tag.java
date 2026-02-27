package com.litecms.backend.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId; 

    @Column(unique = true, nullable = false)
    private String tagName;

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private Set<Content> contents = new HashSet<>();

   
    
     public Tag(Long tagId, String tagName, Set<Content> contents) {

        this.tagId = tagId;
        this.tagName = tagName;
        this.contents = contents;

    }

     public Tag() {}

     public Long getTagId() {
         return tagId;
     }

     public void setTagId(Long tagId) {
         this.tagId = tagId;
     }

     public String getTagName() {
         return tagName;
     }

     public void setTagName(String tagName) {
         this.tagName = tagName;
     }

     public Set<Content> getContents() {
         return contents;
     }

     public void setContents(Set<Content> contents) {
         this.contents = contents;
     }


     
}
