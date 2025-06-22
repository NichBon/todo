package io.nichbon.todo.category.dtos;

import java.util.List;

import io.nichbon.todo.category.Category.Color;
import io.nichbon.todo.todo.Todo;
import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {

    @NotBlank
    private String name;

    private Color color;

    private List<Todo> todos;

    public CreateCategoryDTO(@NotBlank String name, Color color, List<Todo> todos) {
        this.name = name;
        this.color = color;
        this.todos = todos;
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
