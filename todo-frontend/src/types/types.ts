export type Priority =
    'HIGH'
    | 'MEDIUM'
    | 'LOW';

export type CompletionStatus =
    'ON_HOLD'
    | 'COMPLETED'
    | 'TO_DO'
    | 'IN_PROGRESS';

export const COLORS = [
    'RED',
    'BLUE',
    'PURPLE',
    'GREEN',
    'YELLOW',
    'ORANGE',
    'GREY',
    'CYAN'
] as const;

export type Color = typeof COLORS[number]

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
    categoryIds: string[];
}

export function toCreateTodoDTO(todo: Todo): CreateTodoDTO {
    return {
        name: todo.name,
        status: todo.status,
        priority: todo.priority,
        categoryIds: todo.categories.map(category => category.id)
    };
}

export type Category = {
    id: string;
    name: string;
    color: Color;
    todos: Todo[];
};

export interface CreateCategoryDTO {
    name: string;
    color: Color;
    todoIds: string[];
}

export interface UpdateCategoryDTO extends CreateCategoryDTO {
    id: string;
}

export function toCreateCategoryDTO(category: Category): CreateCategoryDTO {
    return {
        name: category.name,
        color: category.color,
        todoIds: category.todos.map(todo => todo.id)
    };
}

export function toUpdateCategoryDTO(category: Category): UpdateCategoryDTO {
    return {
        id: category.id,
        name: category.name,
        color: category.color,
        todoIds: category.todos.map(todo => todo.id)
    };
}

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