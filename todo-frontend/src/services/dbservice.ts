import { type Category, type Todo, toUpdateCategoryDTO, toUpdateTodoDTO } from "../types/types";

const BASE_URL: string = 'http://localhost:8080'

export async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch(`${BASE_URL}/todos`);

    if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    const data: Todo[] = await response.json();
    return data;
}

export async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    const data: Category[] = await response.json();
    return data;
}

export async function batchUpdateTodos(todos: Todo[]): Promise<Todo[]> {
    const formattedTodos = todos.map((todo) => toUpdateTodoDTO(todo));
    console.log(todos)
    const response = await fetch(`${BASE_URL}/todos/batch`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedTodos)
    });

    if (!response.ok) {
        throw new Error(`Failed to update todos: ${response.statusText}`);
    }

    const data: Todo[] = await response.json()
    console.log(data)
    return data;
}

export async function updateTodo(todo: Todo): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    });

    const data: Todo = await response.json();
    return data;
}

export async function batchUpdateCategories(categories: Category[]): Promise<Category[]> {
    const formattedTodos = categories.map((cat) => toUpdateCategoryDTO(cat));
    console.log(categories)
    const response = await fetch(`${BASE_URL}/categories/batch`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedTodos)
    });

    if (!response.ok) {
        throw new Error(`Failed to update todos: ${response.statusText}`);
    }

    const data: Category[] = await response.json()
    console.log(data)
    return data;
}


// export async function batchUpdateCategories(categories: Category[]): Promise<Category[]> {
//     console.log(categories)
//     const patchCategories: UpdateCategoryDTO[] = categories
//         .filter(category => !category.id.toString().startsWith('temp-'))
//         .map(toUpdateCategoryDTO);

//     const postCategories: CreateCategoryDTO[] = categories
//         .filter(category => category.id.toString().startsWith('temp-'))
//         .map(toCreateCategoryDTO);

//     const responses: Category[] = [];

//     if (patchCategories.length > 0) {
//         const patchRes = await fetch(`${BASE_URL}/categories/batch`, {
//             method: 'PATCH',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(patchCategories)
//         });

//         if (!patchRes.ok) {
//             throw new Error(`Failed to update categories: ${patchRes.statusText}`);
//         }

//         const patchData: Category[] = await patchRes.json();
//         responses.push(...patchData);
//     }

//     if (postCategories.length > 0) {
//         const postRes = await fetch(`${BASE_URL}/categories/batch`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(postCategories)
//         });

//         if (!postRes.ok) {
//             throw new Error(`Failed to create categories: ${postRes.statusText}`);
//         }

//         const postData: Category[] = await postRes.json();
//         responses.push(...postData);
//     }

//     return responses;
// }