import { type Category, type Todo, type UpdateTodo, type CreateTodoDTO, createTodoDTO } from "../types/types";

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

export async function batchUpdateTodos(todos: Todo[]): Promise<Todo[]> {
    const patchTodos: UpdateTodo[] = todos.filter((todo) => !todo.id.toString().startsWith('temp-'));
    const postTodos: CreateTodoDTO[] = todos.filter((todo) => todo.id.toString().startsWith('temp-')).map((todo) => createTodoDTO(todo));

    const patchResponse = await fetch(`${BASE_URL}/todos/batch`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchTodos)
    });

    if (!patchResponse.ok) {
        throw new Error(`Failed to update todos: ${patchResponse.statusText}`);
    }

    const postResponse = await fetch(`${BASE_URL}/todos/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postTodos)
    });

    const patchData: Todo[] = await patchResponse.json();
    const postData: Todo[] = await postResponse.json();

    const data = patchData.concat(postData);
    console.log(data)
    return data;
}
