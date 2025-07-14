package io.nichbon.todo.category.dtos;

import java.util.List;

import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {

    @NotBlank
    private String name;

    private String color;

    private List<Long> todoIds;

    public CreateCategoryDTO(@NotBlank String name, String color, List<Long> todoIds) {
        this.name = name;
        this.color = color;
        this.todoIds = todoIds;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    public List<Long> getTodoIds() {
        return todoIds;
    }

}
