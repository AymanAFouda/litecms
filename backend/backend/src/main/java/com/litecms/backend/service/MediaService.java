package com.litecms.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.litecms.backend.entity.Media;
import com.litecms.backend.entity.PhotoGallery;
import com.litecms.backend.repositories.MediaRepository;

@Service
public class MediaService {
    
  @Value("${file.upload-dir}")
    private String uploadDir;

    private final MediaRepository mediaRepository;

public MediaService(MediaRepository mediaRepository) {
    this.mediaRepository = mediaRepository;
    }   


    public Media saveFile(MultipartFile file, PhotoGallery gallery) throws IOException {

        //Validate file
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String mimeType = file.getContentType();
        if (!mimeType.startsWith("image/") && !mimeType.equals("application/pdf")) {
            throw new IllegalArgumentException("Unsupported file type");
        }

        //Generate unique filename
        String originalName = file.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf("."));
        String storedFileName = UUID.randomUUID() + extension;

        //Create directory if not exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        //Save file to disk
        Path filePath = uploadPath.resolve(storedFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        //Save metadata in DB
        Media media = new Media();
        media.setFileName(originalName);
        media.setFileUrl("/uploads/" + storedFileName); // for serving
        media.setMimeType(mimeType);
        media.setPhotoGallery(gallery);

        return mediaRepository.save(media);
    }
    public Media createMedia(Media media) {
        return mediaRepository.save(media);
    }
    //get all
    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }
    //get by id
    public Media getMediaById(Long id) {
        return mediaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Media not found with id: " + id));
    }
    //Delete
    public void deleteFile(Media media) {
        try {   
            String storedFileName = Paths.get(media.getFileUrl()).getFileName().toString();

            Path filePath = Paths.get(uploadDir)
                .resolve(storedFileName)
                .normalize();

            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + media, e);
        }
        mediaRepository.delete(media); 

    }
     

}