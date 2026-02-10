package com.litecms.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.service.MediaService;

 
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/media")
public class MediaController {
    
  
    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }
 
     

}
