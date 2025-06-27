import { useEffect, useRef, useState } from 'react';
import ToDoColumn from './ToDoColumn';
import { columnIdToStatus, emptyBoard, type Category, type Columns, type Todo } from '../types/types';
import { fetchCategories, fetchTodos, updateTodo } from '../services/dbservice.ts'
import CategoryFilterBar, { type FilterState } from './CategoryFilterBar.tsx';
import EditTodosMode from './EditTodosMode/EditTodosMode.tsx';
import EditCategoriesMode from './EditCategoriesMode.tsx';
import { sortColumns } from '../services/dataManipluationService.ts';


const BoardLayout = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [columns, setColumns] = useState<Columns>({});
    const [categories, setCategories] = useState<Category[]>([])
    // for dev server
    const didFetch = useRef(false);

    useEffect(() => {
        // for dev server
        if (didFetch.current) return;
        didFetch.current = true;

        fetchCategories()
            .then((response) => setCategories(response))
            .catch(err => setError(err.message))

        fetchTodos()
            .then((response) => {
                setTodos(response);
                const newColumns = sortColumns(response);
                setColumns(newColumns);
            }
            )
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const newColumns = sortColumns(todos);
        setColumns(newColumns);
    }, [todos])

    const handleDrop = (todoId: string, destinationColId: string) => {
        const newColumns: Columns = { ...columns };
        let movedItem;

        for (const colId in newColumns) {
            const index = newColumns[colId].items.findIndex(item => item.id === todoId);
            if (index !== -1) {
                [movedItem] = newColumns[colId].items.splice(index, 1);
                break;
            }
        }

        if (movedItem) {
            newColumns[destinationColId].items.push(movedItem);
            setColumns(newColumns);
            movedItem.status = columnIdToStatus[destinationColId];
            updateTodo(movedItem)

        }
    };

    return (
        <>
            {loading === true && <div>Loading...</div>}
            {error !== null && <p>Error: {error}</p>}
            <CategoryFilterBar
                categories={categories}
                onChange={() => console.log("add filter logic")//setCategoryFilters
                }
            />

            {todos.length !== 0 && <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                {Object.entries(columns).map(([id, column]) => (
                    <ToDoColumn key={id} columnId={id} column={column} onDrop={handleDrop} />
                ))}
            </div>}

            <EditCategoriesMode categories={categories} onExit={(updated) => setCategories(updated)}></EditCategoriesMode>
            <EditTodosMode todos={todos} categories={categories} onExit={(updated) => setTodos(updated)}></EditTodosMode>
        </>
    );
};

export default BoardLayout;