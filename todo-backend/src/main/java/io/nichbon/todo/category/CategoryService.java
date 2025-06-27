package io.nichbon.todo.category;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nichbon.todo.category.dtos.CreateCategoryDTO;
import io.nichbon.todo.category.dtos.UpdateCategoryDTO;
import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;
    private ModelMapper modelMapper;

    public CategoryService(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    public Category create(CreateCategoryDTO data) {
        Category newCategory = modelMapper.map(data, Category.class);
        Category savedCategory = this.categoryRepository.save(newCategory);
        return savedCategory;
    }

    public List<Category> batchCreate(CreateCategoryDTO[] data) {
        List<Category> Categories = Arrays.stream(data)
                .map(dto -> {
                    Category newCategory = modelMapper.map(dto, Category.class);
                    return newCategory;
                }).toList();

        List<Category> createdCategories = categoryRepository.saveAll(Categories);
        return createdCategories;
    }

    public List<Category> getAll() {
        List<Category> categories = this.categoryRepository.findAll();
        return categories;
    }

    public Category findById(long id) {
        Category foundCategory = this.categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No Category with id: " + id));
        return foundCategory;
    }

    public List<Category> findListByIds(List<Long> categories) {
        return categories.stream()
                .map(categoryRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    public Category updateById(UpdateCategoryDTO data) {
        Category foundCategory = findById(data.getId());
        this.modelMapper.map(data, foundCategory);
        this.categoryRepository.save(foundCategory);
        return foundCategory;
    }

    public List<Category> batchUpdate(UpdateCategoryDTO[] data) {
        List<Category> Categories = Arrays.stream(data)
                .map(dto -> {
                    Category newCategory = modelMapper.map(dto, Category.class);
                    return newCategory;
                }).toList();
        List<Category> createdCategories = categoryRepository.saveAll(Categories);
        return createdCategories;

        // Category[] updatedCategories = new Category[data.length];
        // for (int i = 0; i < data.length; i++) {
        // updatedCategories[i] = updateById(data[i]);
        // }
        // return updatedCategories;
    }

    public String deleteById(long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ("DELETED ID" + id);
        } else {
            return ("NO ID" + id + "to delete");
        }
    }

}
