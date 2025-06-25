import type { Category, Todo, UpdateTodo } from "../types/types";

const BASE_URL: string = 'http://localhost:8080'



export async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch(`${BASE_URL}/todos`);

    if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    const data: Todo[] = await response.json();
    console.log(data)
    return data;
}

export async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    const data: Category[] = await response.json();
    console.log(data)
    return data;
}

export async function batchUpdateTodos(todos: UpdateTodo[]): Promise<Todo[]> {
    const response = await fetch(`${BASE_URL}/todos/batch`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todos)
    });

    console.log(todos)

    if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    const data: Todo[] = await response.json();
    console.log(data)
    return data;
}
