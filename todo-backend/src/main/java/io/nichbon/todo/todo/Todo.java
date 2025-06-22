package io.nichbon.todo.todo;

import io.nichbon.todo.category.Category;

import java.sql.Date;
import java.util.Optional;

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
    private long id;

    public enum Priority {
        HIGH,
        MEDIUM,
        LOW
    }

    public enum CompletionStatus {
        ON_HOLD,
        COMPLETED,
        NEW,
        IN_PROGRESS
    }

    @Column
    private String name;

    @Column
    private Priority priority;

    @Column
    private Date createdAt;

    @Column
    private Date archivedAt;

    @Column
    private boolean isArchived;

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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Optional<Date> getArchivedAt() {
        return Optional.ofNullable(archivedAt);
    }

    public void setArchivedAt(Date archivedAt) {
        this.archivedAt = archivedAt;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean isArchived) {
        this.isArchived = isArchived;
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

}
