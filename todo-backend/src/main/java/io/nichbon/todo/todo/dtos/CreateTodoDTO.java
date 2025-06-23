package io.nichbon.todo.todo.dtos;

import io.nichbon.todo.todo.Todo.CompletionStatus;
import io.nichbon.todo.todo.Todo.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTodoDTO {

    @NotBlank
    private String name;

    @NotNull
    private CompletionStatus status;

    @NotNull
    private Priority priority;

    public CreateTodoDTO(@NotBlank String name, @NotNull CompletionStatus status, @NotNull Priority priority) {
        this.name = name;
        this.status = status;
        this.priority = priority;
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

}
