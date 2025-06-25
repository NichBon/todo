export type Priority =
    'HIGH'
    | 'MEDIUM'
    | 'LOW';

export type CompletionStatus =
    'ON_HOLD'
    | 'COMPLETED'
    | 'TO_DO'
    | 'IN_PROGRESS';

export type Color =
    'RED'
    | 'BLUE'
    | 'PURPLE'
    | 'GREEN'
    | 'YELLOW'
    | 'ORANGE'
    | 'GREY'
    | 'CYAN';

export type Todo = {
    id: string;
    name: string;
    priority: Priority;
    createdAt: string;
    archivedAt: string | null;
    status: CompletionStatus;
    categories: Category[];
};

export type UpdateTodo = {
    id: string;
}

export type CreateTodoDTO = {
    name: string;
    priority: string;
    status: CompletionStatus;
    categoryIds: number[];
}

export function createTodoDTO(todo: Todo): CreateTodoDTO {
    return {
        name: todo.name,
        status: todo.status,
        priority: todo.priority,
        categoryIds: todo.categories.map(category => category.id)
    };
}

export type Category = {
    id: number;
    name: string;
    color: Color;
    todos?: Todo[];
};

export type ColumnData = {
    name: string;
    items: Todo[];
};

export type Columns = Record<string, ColumnData>;

export const emptyBoard: Columns = {
    'todo': {
        name: 'To Do',
        items: []
    },
    'on-hold': {
        name: "On Hold",
        items: []
    },
    'in-progress': {
        name: 'In Progress',
        items: []
    },
    'done': {
        name: 'Done',
        items: []
    }
};