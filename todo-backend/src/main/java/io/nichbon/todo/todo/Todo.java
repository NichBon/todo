package io.nichbon.todo.todo;

import io.nichbon.todo.category.Category;

import java.time.LocalDateTime;
import java.util.Optional;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public enum Priority {
        HIGH,
        MEDIUM,
        LOW
    }

    public enum CompletionStatus {
        ON_HOLD,
        COMPLETED,
        TO_DO,
        IN_PROGRESS
    }

    @Column
    private String name;

    @Column
    private Priority priority;

    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime archivedAt;

    @Column
    private CompletionStatus status;

    @ManyToMany()
    @JoinTable(name = "todo_category", joinColumns = @JoinColumn(name = "todo_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Category[] categories;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Optional<LocalDateTime> getArchivedAt() {
        return Optional.ofNullable(archivedAt);
    }

    public void setArchivedAt(LocalDateTime archivedAt) {
        this.archivedAt = archivedAt;
    }

    public CompletionStatus getStatus() {
        return status;
    }

    public void setStatus(CompletionStatus status) {
        this.status = status;
    }

    public Category[] getCategories() {
        return categories;
    }

    public void setCategories(Category[] categories) {
        this.categories = categories;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
