package io.nichbon.todo.todo.dtos;

import java.time.LocalDateTime;
import java.util.List;

import io.nichbon.todo.todo.Todo.CompletionStatus;
import io.nichbon.todo.todo.Todo.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTodoDTO {

    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    private CompletionStatus status;

    @NotNull
    @NotBlank
    private Priority priority;

    private List<Long> categoryIds;

    public CreateTodoDTO() {
    }

    public CreateTodoDTO(@NotBlank String name, @NotNull CompletionStatus status, @NotNull Priority priority,
            List<Long> categoryIds, LocalDateTime archivedAt) {
        this.name = name;
        this.status = status;
        this.priority = priority;
        this.categoryIds = categoryIds;
    }

    public String getName() {
        return name;
    }

    public CompletionStatus getStatus() {
        return status;
    }

    public Priority getPriority() {
        return priority;
    }

    public List<Long> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(List<Long> categoryIds) {
        this.categoryIds = categoryIds;
    }
}
