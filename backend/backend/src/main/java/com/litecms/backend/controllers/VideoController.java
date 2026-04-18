package com.litecms.backend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Video;
import com.litecms.backend.service.InteractionsService;
import com.litecms.backend.service.SearchService;
import com.litecms.backend.service.VideoService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class VideoController {
  
    
    private final VideoService videoService;
    private final SearchService searchService ;
    private final InteractionsService interactionsService;



    public VideoController(VideoService videoService, SearchService searchService, InteractionsService interactionsService) {
        this.videoService = videoService;
        this.searchService = searchService;
        this.interactionsService = interactionsService ;
    }

    //get Published Videos
    @GetMapping("/videos")
    public List<Video> getPublishedVideos() {
        return videoService.getPublishedVideos();
    }

    // get Published Videos By Category
    @GetMapping("/videos/category/{name}")
    public List<Video> getPublishedVideosByCategory(@PathVariable String name) {
        return videoService.getPublishedVideosByCategory(name);
    }

    //get Published Videos By Tag
    @GetMapping("/videos/tags/{name}")  
    public List<Video> getPublishedVideosByTag(@PathVariable String name) {
        return videoService.getPublishedVideosByTag(name);
    }

    //Create Video
    @PostMapping(value = "/publisher/videos/ ", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) 
    public  Video createVideo(@RequestPart("video") Video video, @RequestPart(value="featuredImage", required=false)
     MultipartFile featuredImage)throws IOException {

        Video savedVideo = videoService.create(video, featuredImage);
        searchService.indexContent(savedVideo);
        return savedVideo;
    }

 
    // Update Video
    @PutMapping(value = "/publisher/videos//{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Video updateVideo(@PathVariable Long id,
        @RequestPart("video") Video video, 
        @RequestPart(value = "featuredImage", required = false)
        MultipartFile featuredImage) throws IOException{

            video.setContentId(id);
            Video updatedVideo = videoService.update(video, featuredImage);
            searchService.indexContent(updatedVideo);
            return updatedVideo;
    } 

   // Get all Videos
    @GetMapping("/publisher/videos")
    public List<Video> getAllContents() {
        return videoService.findAll();
    }

    // Get Video by ID
     @GetMapping("/publisher/videos/{id}")
    public Video getContentById(@PathVariable Long id) {
        interactionsService.incrementView(id); // COUNT VIEW
        return videoService.findById(id);
    } 

  


    // Delete Video
   @DeleteMapping("/publisher/videos/{id}")
    public void deleteContent(@PathVariable Long id) {
        videoService.delete(id);
    }


}

/*
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

 */