package io.nichbon.todo.category;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.nichbon.todo.todo.Todo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public enum Color {
        RED,
        BLUE,
        PURPLE,
        GREEN,
        YELLOW,
        ORANGE,
        GREY,
        CYAN,
    }

    @Column
    @NotNull
    @NotEmpty
    private String name;

    @Column
    @NotNull
    private Color color;

    @ManyToMany(mappedBy = "categories")
    @JsonBackReference
    private List<Todo> todos;

    public String getName() {
        return name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public List<Todo> getTodos() {
        return todos;
    }

    public void setTodos(List<Todo> todos) {
        this.todos = todos;
    }

}
