package io.nichbon.todo.category;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nichbon.todo.category.dtos.CreateCategoryDTO;
import io.nichbon.todo.category.dtos.UpdateCategoryDTO;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping()
    public ResponseEntity<Category> create(@Valid @RequestBody CreateCategoryDTO data) {
        Category saved = this.categoryService.create(data);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Category>> batchCreateTodos(@Valid @RequestBody CreateCategoryDTO[] data) {
        List<Category> saved = this.categoryService.batchCreate(data);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Category>> findAll() {
        List<Category> categories = this.categoryService.getAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findById(@PathVariable long id) {
        Category category = this.categoryService.findById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PatchMapping()
    public ResponseEntity<Category> updateById(@Valid @RequestBody UpdateCategoryDTO data) {
        Category category = this.categoryService.updateById(data);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PatchMapping("/batch")
    public ResponseEntity<?> batchUpdate(@Valid @RequestBody UpdateCategoryDTO[] data) {
        try {
            List<Category> categories = this.categoryService.batchUpdate(data);
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable long id) {
        String deleted = this.categoryService.deleteById(id);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

    @PutMapping("/batch")
    public ResponseEntity<?> batchPut(@Valid @RequestBody UpdateCategoryDTO[] data) {
        try {
            List<Category> categories = this.categoryService.batchPut(data);
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

}
