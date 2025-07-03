package io.nichbon.todo.todo;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nichbon.todo.category.Category;
import io.nichbon.todo.category.CategoryService;
import io.nichbon.todo.todo.dtos.CreateTodoDTO;
import io.nichbon.todo.todo.dtos.UpdateTodoDTO;
import jakarta.persistence.EntityNotFoundException;

@Service
public class TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;
    private CategoryService categoryService;

    public TodoService(TodoRepository todoRepository, ModelMapper modelMapper, CategoryService categoryService) {
        this.todoRepository = todoRepository;
        this.modelMapper = modelMapper;
        this.categoryService = categoryService;
    }

    public List<Todo> getAll() {
        List<Todo> todos = this.todoRepository.findAll();
        return todos;
    }

    public Todo findById(long id) {
        Todo foundTodo = this.todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No Todo with id: " + id));
        return foundTodo;
    }

    public Todo create(CreateTodoDTO data) {
        Todo newTodo = modelMapper.map(data, Todo.class);
        newTodo.setCreatedAt(LocalDateTime.now());
        List<Category> linkedCategories = categoryService.findListByIds(data.getCategoryIds());
        newTodo.setCategories(linkedCategories.toArray(new Category[0]));
        Todo savedTodo = this.todoRepository.save(newTodo);
        return savedTodo;
    }

    public List<Todo> batchCreate(CreateTodoDTO[] data) {
        List<Todo> todos = Arrays.stream(data)
                .map(dto -> {
                    Todo newTodo = modelMapper.map(dto, Todo.class);

                    newTodo.setCreatedAt(LocalDateTime.now());

                    List<Category> linkedCategories = categoryService.findListByIds(dto.getCategoryIds());
                    newTodo.setCategories(linkedCategories.toArray(new Category[0]));

                    return newTodo;
                }).toList();

        List<Todo> createdTodos = todoRepository.saveAll(todos);
        return createdTodos;

        // Todo[] createdTodos = new Todo[data.length];
        // for (int i = 0; i < data.length; i++) {
        // createdTodos[i] = create(data[i]);
        // }
        // return createdTodos;
    }

    public Todo updateById(UpdateTodoDTO data) {
        Todo foundTodo = findById(data.getId());
        if (data.getCategoryIds() != null) {
            Category[] categories = categoryService.findListByIds(List.of(data.getCategoryIds()))
                    .toArray(new Category[0]);
            foundTodo.setCategories(categories);
        }
        this.modelMapper.map(data, foundTodo);
        this.todoRepository.save(foundTodo);
        return foundTodo;
    }

    public List<Todo> batchUpdate(UpdateTodoDTO[] data) {
        List<Todo> todos = Arrays.stream(data)
                .map(dto -> {
                    Todo foundTodo = findById(dto.getId());
                    if (dto.getCategoryIds() != null) {
                        Category[] categories = categoryService.findListByIds(List.of(dto.getCategoryIds()))
                                .toArray(new Category[0]);
                        foundTodo.setCategories(categories);
                    }
                    this.modelMapper.map(dto, foundTodo);
                    foundTodo.setArchivedAt(dto.getArchivedAt());
                    return foundTodo;
                }).toList();

        List<Todo> updatedTodos = todoRepository.saveAll(todos);
        return updatedTodos;
    }

    public Todo archiveById(long id) {
        Todo foundTodo = this.todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No Todo with id: " + id));

        if (foundTodo.getArchivedAt().isEmpty()) {
            foundTodo.setArchivedAt(LocalDateTime.now());
        } else {
            foundTodo.setArchivedAt(null);
        }

        this.todoRepository.save(foundTodo);

        return foundTodo;
    }

    public List<Todo> batchPut(UpdateTodoDTO[] data) {
        List<Todo> todos = Arrays.stream(data)
                .map(dto -> {
                    if (dto.getId() >= 0) {
                        Todo foundTodo = findById(dto.getId());
                        if (dto.getCategoryIds() != null) {
                            Category[] categories = categoryService.findListByIds(List.of(dto.getCategoryIds()))
                                    .toArray(new Category[0]);
                            foundTodo.setCategories(categories);
                        }
                        this.modelMapper.map(dto, foundTodo);
                        foundTodo.setArchivedAt(dto.getArchivedAt());
                        return foundTodo;
                    } else {
                        System.out.println(dto);
                        Todo newTodo = modelMapper.map(dto, Todo.class);
                        newTodo.setCreatedAt(LocalDateTime.now());
                        List<Category> linkedCategories = categoryService.findListByIds(List.of(dto.getCategoryIds()));
                        newTodo.setCategories(linkedCategories.toArray(new Category[0]));
                        newTodo.setId(null);
                        return newTodo;
                    }
                }).toList();

        List<Todo> updatedTodos = todoRepository.saveAll(todos);
        return updatedTodos;

    }

}
