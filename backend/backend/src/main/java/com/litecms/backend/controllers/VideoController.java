package com.litecms.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public Video create(@RequestBody Video video) {
        return videoService.create(video);
    }

 
    @PutMapping("/{id}")
    public Video update(@PathVariable Long id,
    @RequestBody Video video) {
        video.setContentId(id);
        return videoService.update(video);
    }

   // Get all Videos
    @GetMapping
    public List<Video> getAllContents() {
        return videoService.findAll();
    }

    // Get Video by ID
    @GetMapping("/{id}")
    public Video getContentById(@PathVariable Long id) {
        return videoService.findById(id);
    }

    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        videoService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
