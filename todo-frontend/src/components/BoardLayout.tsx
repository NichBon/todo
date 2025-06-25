import { useEffect, useRef, useState } from 'react';
import ToDoColumn from './ToDoColumn';
import { emptyBoard, type Category, type Columns, type Todo } from '../types/types';
import { fetchCategories, fetchTodos } from '../services/dbservice.ts'
import CategoryFilterBar, { type FilterState } from './CategoryFilterBar.tsx';
import EditMode from './EditMode.tsx';


const BoardLayout = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [columns, setColumns] = useState<Columns>({});
    const [categories, setCategories] = useState<Category[]>([])
    // for dev server
    const didFetch = useRef(false);

    const sortColumns = (todos: Todo[]) => {
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
        }
    };

    return (
        <>
            {/* {loading === true && <div>Loading...</div>}
            {error !== null && <p>Error: {error}</p>}
            <CategoryFilterBar
                categories={categories}
                onChange={(filters) => {
                    // derive filteredTodos before rendering
                }}
            /> */}

            {todos.length !== 0 && <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                {Object.entries(columns).map(([id, column]) => (
                    <ToDoColumn key={id} columnId={id} column={column} onDrop={handleDrop} />
                ))}
            </div>}

            <EditMode todos={todos} onExit={(updated) => setTodos(updated)}></EditMode>
        </>
    );
};

export default BoardLayout;