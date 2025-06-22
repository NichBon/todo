package io.nichbon.todo.category.dtos;

import java.util.List;

import io.nichbon.todo.category.Category.Color;
import io.nichbon.todo.todo.Todo;
import jakarta.validation.constraints.NotNull;

public class UpdateCategoryDTO {

    @NotNull
    private long id;

    private String name;

    private Color color;

    private List<Todo> todos;

    public UpdateCategoryDTO(long id, String name, Color color, List<Todo> todos) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.todos = todos;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Color getColor() {
        return color;
    }

    public List<Todo> getTodos() {
        return todos;
    }
}
