package io.nichbon.todo.category.dtos;

import java.util.List;

import io.nichbon.todo.category.Category.Color;
import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {

    @NotBlank
    private String name;

    private Color color;

    private List<Long> todoIds;

    public CreateCategoryDTO(@NotBlank String name, Color color, List<Long> todoIds) {
        this.name = name;
        this.color = color;
        this.todoIds = todoIds;
    }

    public String getName() {
        return name;
    }

    public Color getColor() {
        return color;
    }

    public List<Long> getTodoIds() {
        return todoIds;
    }

}
