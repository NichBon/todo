export type Priority =
    'HIGH'
    | 'MEDIUM'
    | 'LOW';

export type CompletionStatus =
    'ON_HOLD'
    | 'COMPLETED'
    | 'TO_DO'
    | 'IN_PROGRESS';

export const columnIdToStatus: Record<string, CompletionStatus> = {
    TO_DO: 'TO_DO',
    IN_PROGRESS: 'IN_PROGRESS',
    ON_HOLD: 'ON_HOLD',
    DONE: 'COMPLETED'
};

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

export const CATEGORY_TEXT_COLOR: Record<string, string> = {
    'RED': 'white',
    'BLUE': 'white',
    'PURPLE': 'white',
    'GREEN': 'white',
    'YELLOW': '#20202b',
    'ORANGE': '#20202b',
    'GREY': 'black',
    'CYAN': 'black'
};

export type Color = typeof COLORS[number]

export type Todo = {
    id: number;
    name: string;
    priority: Priority;
    createdAt: string;
    archivedAt: string | null;
    status: CompletionStatus;
    categories: Category[];
};


export interface CreateTodoDTO {
    name: string;
    priority: string;
    status: CompletionStatus;
    categoryIds: number[];
    archivedAt: string | null;
}

export interface UpdateTodoDTO extends CreateTodoDTO {
    id: number;
}


export function toCreateTodoDTO(todo: Todo): CreateTodoDTO {
    return {
        name: todo.name,
        status: todo.status,
        priority: todo.priority,
        archivedAt: todo.archivedAt,
        categoryIds: todo.categories.map(category => category.id)
    };
}


export function toUpdateTodoDTO(todo: Todo): UpdateTodoDTO {
    return {
        id: todo.id,
        name: todo.name,
        status: todo.status,
        priority: todo.priority,
        archivedAt: todo.archivedAt,
        categoryIds: todo.categories.map(c => c.id)
    }

};

export type Category = {
    id: number;
    name: string;
    color: Color;
    todos: Todo[];
};

export const areCategoriesEqual = (a: Category[], b: Category[]): boolean => {
    const idsA = a.map(c => String(c.id)).sort();
    const idsB = b.map(c => String(c.id)).sort();

    if (idsA.length !== idsB.length) return false;

    return idsA.every((id, index) => id === idsB[index]);
};

export interface CreateCategoryDTO {
    name: string;
    color: Color;
    todoIds: number[];
}

export interface UpdateCategoryDTO extends CreateCategoryDTO {
    id: number;
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
    'TO_DO': {
        name: 'To Do',
        items: []
    },
    'ON_HOLD': {
        name: "On Hold",
        items: []
    },
    'IN_PROGRESS': {
        name: 'In Progress',
        items: []
    },
    'DONE': {
        name: 'Done',
        items: []
    }
};

export type modalTypes = 'category' | 'todo';

export const maxAppWidth = '1184px';