package io.nichbon.todo.todo;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nichbon.todo.todo.dtos.CreateTodoDTO;
import io.nichbon.todo.todo.dtos.UpdateTodoDTO;
import jakarta.persistence.EntityNotFoundException;

@Service
public class TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;

    public TodoService(TodoRepository todoRepository, ModelMapper modelMapper) {
        this.todoRepository = todoRepository;
        this.modelMapper = modelMapper;
    }

    public List<Todo> getAll() {
        List<Todo> todos = this.todoRepository.findAll();
        return todos;
    }

    public Todo findById(long id) {
        Todo foundTodo = this.todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No Category with id: " + id));
        return foundTodo;
    }

    public Todo create(CreateTodoDTO data) {
        Todo newTodo = modelMapper.map(data, Todo.class);
        newTodo.setCreatedAt(LocalDateTime.now());
        Todo savedTodo = this.todoRepository.save(newTodo);
        return savedTodo;
    }

    public Todo updateById(UpdateTodoDTO data) {
        Todo foundTodo = findById(data.getId());
        this.modelMapper.map(data, foundTodo);
        this.todoRepository.save(foundTodo);
        return foundTodo;
    }
}
