package com.litecms.backend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
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
import com.litecms.backend.service.InteractionsService;
import com.litecms.backend.service.SearchService;
import com.litecms.backend.service.VideoService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/videos")
public class VideoController {
  
    
    private final VideoService videoService;
    private final SearchService searchService ;
    private final InteractionsService interactionsService;



    public VideoController(VideoService videoService, SearchService searchService, InteractionsService interactionsService) {
        this.videoService = videoService;
        this.searchService = searchService;
        this.interactionsService = interactionsService ;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE) 
    public ResponseEntity<Video> create(@RequestPart("video") Video video, @RequestPart(value="featuredImage", required=false)
     MultipartFile featuredImage)throws IOException {

        Video savedVideo = videoService.create(video, featuredImage);
        searchService.indexContent(savedVideo);
        return ResponseEntity.status(201).body(savedVideo);
    }

 

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Video> update(@PathVariable Long id,
        @RequestPart("video") Video video, 
        @RequestPart(value = "featuredImage", required = false)
         MultipartFile featuredImage) throws IOException{

            video.setContentId(id);
            Video updatedVideo = videoService.update(video, featuredImage);
            searchService.indexContent(updatedVideo);

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
        interactionsService.incrementView(id); // COUNT VIEW
        return ResponseEntity.ok(videoService.findById(id));
    }

    // Like article
    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likeArticle(@PathVariable Long id) {
        interactionsService.incrementLike(id); // COUNT LIKE
        return ResponseEntity.ok().build();
    }

    // Unlike article
    @PostMapping("/{id}/unlike")
    public ResponseEntity<Void> unlikeArticle(@PathVariable Long id) {
        interactionsService.decrementLike(id); // COUNT UNLIKE
        return ResponseEntity.ok().build();
    }

    // Get videos by category
    @GetMapping("/category/{name}")
    public List<Video> getByCategory(@PathVariable String name) {
        return videoService.getByCategory(name);
    }

    // Get videos by tag
    @GetMapping("/tags/{tagName}")
    public List<Video> getByTag(@PathVariable String tagName) {
        return videoService.getByTag(tagName);
    }

   @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        videoService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
