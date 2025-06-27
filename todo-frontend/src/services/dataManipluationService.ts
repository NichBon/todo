import { emptyBoard, type Todo } from "../types/types";

export const sortColumns = (todos: Todo[]) => {
    const newColumns = structuredClone(emptyBoard);
    for (const todo of todos) {
        switch (todo.status) {
            case 'TO_DO':
                newColumns['TO_DO'].items.push(todo);
                break;

            case 'IN_PROGRESS':
                newColumns['IN_PROGRESS'].items.push(todo);
                break;

            case 'COMPLETED':
                newColumns['DONE'].items.push(todo);
                break;

            case 'ON_HOLD':
                newColumns['ON_HOLD'].items.push(todo);
                break;
        }
    }
    return newColumns;
}