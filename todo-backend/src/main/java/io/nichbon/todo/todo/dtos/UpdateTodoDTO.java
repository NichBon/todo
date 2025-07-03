package io.nichbon.todo.todo.dtos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.nichbon.todo.todo.Todo.CompletionStatus;
import io.nichbon.todo.todo.Todo.Priority;
import jakarta.validation.constraints.NotNull;

public class UpdateTodoDTO {

    @NotNull
    private long id;

    private String name;

    private CompletionStatus status;

    private Priority priority;

    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    private LocalDateTime archivedAt;

    private Long[] categoryIds;

    public UpdateTodoDTO(@NotNull Long id, String name, CompletionStatus status, Priority priority,
            LocalDateTime createdAt,
            LocalDateTime archivedAt, Long[] categoryIds) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.archivedAt = archivedAt;
        this.categoryIds = categoryIds;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getArchivedAt() {
        return archivedAt;
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

    public long getId() {
        return id;
    }

    public Long[] getCategoryIds() {
        return categoryIds;
    }
}
