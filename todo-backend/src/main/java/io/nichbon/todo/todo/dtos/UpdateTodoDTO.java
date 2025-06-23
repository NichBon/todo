package io.nichbon.todo.todo.dtos;

import java.sql.Date;

import io.nichbon.todo.todo.Todo.CompletionStatus;
import io.nichbon.todo.todo.Todo.Priority;
import jakarta.validation.constraints.NotNull;

public class UpdateTodoDTO {

    @NotNull
    private long id;

    private String name;

    private CompletionStatus status;

    private Priority priority;

    private Date createdAt;

    private Date archivedAt;

    private boolean isArchived;

    public UpdateTodoDTO(@NotNull long id, String name, CompletionStatus status, Priority priority, Date createdAt,
            Date archivedAt, boolean isArchived) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.archivedAt = archivedAt;
        this.isArchived = isArchived;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getArchivedAt() {
        return archivedAt;
    }

    public boolean isArchived() {
        return isArchived;
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
}
