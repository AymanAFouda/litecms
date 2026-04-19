package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.dto.CategoryCountDTO;
import com.litecms.backend.entity.Category;
import com.litecms.backend.repositories.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    //get Category Counts
    public List<CategoryCountDTO> getCategoryCounts() {
    return categoryRepository.findCategoryCounts();
    }

    //Create Category
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    //Update Category
    public Category updateCategory(Long id, Category category) {
        Category existing = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found"));

        existing.setName(category.getName());
       return categoryRepository.save(existing);
    }

    //Get all  Categories
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    //Delete Category
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}