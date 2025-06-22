export type Todo = {
    id: string;
    name: string;
};

export type ColumnData = {
    name: string;
    items: Todo[];
};

export type Columns = Record<string, ColumnData>;