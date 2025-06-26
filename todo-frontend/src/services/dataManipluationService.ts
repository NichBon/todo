import { emptyBoard, type Todo } from "../types/types";

export const sortColumns = (todos: Todo[]) => {
    const newColumns = structuredClone(emptyBoard);
    for (const todo of todos) {
        switch (todo.status) {
            case 'TO_DO':
                newColumns['todo'].items.push(todo);
                break;

            case 'IN_PROGRESS':
                newColumns['in-progress'].items.push(todo);
                break;

            case 'COMPLETED':
                newColumns['done'].items.push(todo);
                break;

            case 'ON_HOLD':
                newColumns['on-hold'].items.push(todo);
                break;
        }
    }
    return newColumns;
}