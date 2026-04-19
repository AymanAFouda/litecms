package com.litecms.backend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
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
import com.litecms.backend.service.VideoService;

@RestController
@RequestMapping("/api")
public class VideoController {
  
    private final VideoService videoService;
    private final InteractionsService interactionsService;

    public VideoController(VideoService videoService, InteractionsService interactionsService) {
        this.videoService = videoService;
        this.interactionsService = interactionsService ;
    }

    //get Published Videos
    @GetMapping("/api/videos")
    public List<Video> getPublishedVideos() {
        return videoService.getPublishedVideos();
    }

    // get Published Videos By Category
    @GetMapping("/videos/category/{name}")
    public List<Video> getPublishedVideosByCategory(@PathVariable String name) {
        return videoService.getPublishedVideosByCategory(name);
    }

    //get Published Videos By Tag
    @GetMapping("/videos/tag/{name}")  
    public List<Video> getPublishedVideosByTag(@PathVariable String name) {
        return videoService.getPublishedVideosByTag(name);
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

    //Create Video
    @PostMapping(value = "/publisher/videos/ ", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) 
    public  Video createVideo(
            @RequestPart("video") Video video, 
            @RequestPart(value="featuredImage", required=false) MultipartFile featuredImage
        ) throws IOException {
        return videoService.create(video, featuredImage);
    }

    // Update Video
    @PutMapping(value = "/publisher/videos//{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Video updateVideo(@PathVariable Long id,
            @RequestPart("video") Video video, 
            @RequestPart(value = "featuredImage", required = false) MultipartFile featuredImage
        ) throws IOException{

        video.setContentId(id);
        return videoService.update(video, featuredImage);
    }  

    // Delete Video
    @DeleteMapping("/publisher/videos/{id}")
    public void deleteContent(@PathVariable Long id) {
        videoService.delete(id);
    }
}