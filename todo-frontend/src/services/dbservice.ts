import type { Todo } from "../types/types";

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