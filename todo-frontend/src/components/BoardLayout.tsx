import { useEffect, useRef, useState } from 'react';
import ToDoColumn from './ToDoColumn';
import { emptyBoard, type Columns, type Todo } from '../types/types';
import { fetchTodos } from '../services/dbservice.ts'


const BoardLayout = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [columns, setColumns] = useState<Columns>({});
    const didFetch = useRef(false);

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;

        fetchTodos()
            .then((response) => {
                // setTodos(response);

                // const columnMap = {
                //     TO_DO: 'todo',
                //     IN_PROGRESS: 'in-progress',
                //     COMPLETED: 'done',
                //     ON_HOLD: 'on-hold'
                // } as const;

                // console.log("attempting reduce")
                // const newColumns = response.reduce<Columns>((acc, todo) => {
                //     const key = columnMap[todo.status];
                //     acc[key].items.push(todo);
                //     return acc;
                // }, emptyBoard);

                // console.log("finished reduce")
                // console.log(newColumns)

                // setColumns(newColumns);


                setTodos(response);
                const newColumns = emptyBoard;
                for (const todo of response) {
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
                setColumns(newColumns);
            }
            )
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

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
            {loading === true && <div>Loading...</div>}
            {error !== null && <p>Error: {error}</p>}
            {todos.length !== 0 && <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                {Object.entries(columns).map(([id, column]) => (
                    <ToDoColumn key={id} columnId={id} column={column} onDrop={handleDrop} />
                ))}
            </div>}
        </>
    );
};

export default BoardLayout;