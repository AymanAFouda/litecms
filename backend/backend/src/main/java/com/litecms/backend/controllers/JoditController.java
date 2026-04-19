package com.litecms.backend.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
public class JoditController {

    @Value("${file.upload-dir}")
    private String uploadDir;
    
    @GetMapping("/api/file-list")
    public Map<String, Object> listFiles() throws IOException {

        Path dirPath = Paths.get(uploadDir, "article-body-files");

        List<Map<String, Object>> files = new ArrayList<>();

        if (Files.exists(dirPath)) {
            files = Files.list(dirPath)
                .map(path -> {
                    Map<String, Object> file = new HashMap<>();
                    String fileName = path.getFileName().toString();

                    file.put("name", fileName);

                    if (fileName.matches(".*\\.(png|jpg|jpeg|gif|webp)$")) {
                        file.put("type", "image");
                        file.put("thumb", fileName );
                    } else {
                        file.put("type", "file");
                    }

                    return file;
                })
                .toList();
        }

        Map<String, Object> source = new HashMap<>();
        source.put("baseurl", "http://localhost:8080/uploads/article-body-files/");
        source.put("path", "/");
        source.put("name", "default");
        source.put("files", files);
        source.put("folders", new ArrayList<>()); //CRITICAL FIX

        Map<String, Object> data = new HashMap<>();
        data.put("sources", List.of(source));
        data.put("code", 220);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("time", LocalDateTime.now().toString());
        response.put("data", data);

        return response;
    }

    @PostMapping("/api/upload")
    public Map<String, Object> upload(@RequestParam("files") MultipartFile[] files) throws IOException {

        List<String> uploadedFiles = new ArrayList<>();

        for (MultipartFile file : files) {

            String fileName = UUID.randomUUID().toString();

            Path filePath = Paths.get(uploadDir, "article-body-files", fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            uploadedFiles.add(fileName); //ONLY filename (important)
        }

        return Map.of(
            "data", Map.of(
                "files", uploadedFiles,
                "path", "/uploads/article-body-files/",
                "baseurl", "http://localhost:8080",
                "error", 0,
                "messages", List.of()
            )
        );
    }
}