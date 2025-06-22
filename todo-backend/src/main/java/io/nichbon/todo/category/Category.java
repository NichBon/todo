package io.nichbon.todo.category;

import java.util.List;

import io.nichbon.todo.todo.Todo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

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
    private String name;

    @Column
    private Color color;

    @ManyToMany(mappedBy = "categories")
    private List<Todo> todos;

    public String getName() {
        return name;
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
