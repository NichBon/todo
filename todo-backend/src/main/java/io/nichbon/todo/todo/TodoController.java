package io.nichbon.todo.todo;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nichbon.todo.category.dtos.UpdateCategoryDTO;
import io.nichbon.todo.todo.dtos.CreateTodoDTO;
import io.nichbon.todo.todo.dtos.UpdateTodoDTO;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/todos")

public class TodoController {

    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping()
    public ResponseEntity<List<Todo>> findAll() {
        List<Todo> todos = this.todoService.getAll();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable long id) {
        try {
            Todo todo = this.todoService.findById(id);
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<Todo> postMethodName(@Valid @RequestBody CreateTodoDTO data) {
        Todo saved = this.todoService.create(data);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PatchMapping()
    public ResponseEntity<Todo> updateById(@Valid @RequestBody UpdateTodoDTO data) {
        Todo todo = this.todoService.updateById(data);
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }

}
