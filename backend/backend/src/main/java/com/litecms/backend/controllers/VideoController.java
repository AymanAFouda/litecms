package com.litecms.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Video;
import com.litecms.backend.service.VideoService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/videos")
public class VideoController {
  
    
    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

   @PostMapping
    public ResponseEntity<Video> create(@RequestPart("video") Video video, @RequestPart(value="featuredImage", required=false) MultipartFile featuredImage) {
        Video savedVideo = videoService.create(video);
        return ResponseEntity.status(201).body(savedVideo);
    }

 

    @PutMapping("/{id}")
    public ResponseEntity<Video> update(@PathVariable Long id,
        @RequestPart("video") Video video, 
        @RequestPart(value="featuredImage", 
            required=false) MultipartFile featuredImage) {

            video.setContentId(id);
            Video updatedVideo = videoService.update(video);
            return ResponseEntity.ok(updatedVideo);
    } 

   // Get all Videos
    @GetMapping
    public List<Video> getAllContents() {
        return videoService.findAll();
    }

    // Get Video by ID
     @GetMapping("/{id}")
    public ResponseEntity<Video> getContentById(@PathVariable Long id) {
         
        return ResponseEntity.ok(videoService.findById(id));
    }

   @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        videoService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
