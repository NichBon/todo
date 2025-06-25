import { useEffect, useState } from 'react';
import { batchUpdateTodos } from '../services/dbservice';
import type { CompletionStatus, Todo } from '../types/types';
import { formatDate } from '../services/dateService';

type Props = {
    todos: Todo[];
    onExit: (updated: Todo[]) => void;
};

const EditMode: React.FC<Props> = ({ todos, onExit }) => {

    const [editMode, setEditMode] = useState(false);
    const [changedTodos, setChangedTodos] = useState<Todo[]>([]);

    useEffect(() => {
        setChangedTodos(structuredClone(todos));
    }, [todos])

    const updateField = (id: string, field: keyof Todo, value: any) => {
        setChangedTodos(prev =>
            prev.map(todo => (todo.id === id ? { ...todo, [field]: value } : todo))
        );
    };

    const exitEditMode = async () => {
        const updates = changedTodos.filter((todo, id) => {
            const original = todos[id];
            return (
                todo.name !== original.name ||
                todo.status !== original.status ||
                todo.archivedAt !== original.archivedAt
            );
        });

        console.log("from edit mode")
        console.log(updates)

        const updateConfirmation = await batchUpdateTodos(updates)
        console.log(updateConfirmation)

        setEditMode(false);
        onExit(changedTodos);
    };

    const cancelEditMode = () => {
        setEditMode(false);
    }


    return (
        <div>
            {!editMode && <button onClick={() => setEditMode(true)}>
                {'Edit Todos'}
            </button>}
            {editMode && (
                <>
                    <ul>
                        {changedTodos.map((todo) => (
                            <li key={todo.id} style={{ margin: '0.5rem 0' }}>
                                <input
                                    value={todo.name}
                                    onChange={e => updateField(todo.id, 'name', e.target.value)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                <select
                                    value={todo.status}
                                    onChange={e =>
                                        updateField(todo.id, 'status', e.target.value as Todo['status'])
                                    }
                                >
                                    <option value="TO_DO">To Do</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="ON_HOLD">On Hold</option>
                                </select>
                                <button
                                    style={{ marginLeft: '1rem' }}
                                    onClick={() => updateField(todo.id, 'archivedAt', todo.archivedAt ? null : formatDate(new Date))}
                                >
                                    {todo.archivedAt ? 'Unarchive' : 'Archive'}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={cancelEditMode}>Cancel</button>
                    <button onClick={exitEditMode}>Apply Changes</button>
                </>
            )}
        </div>
    )
}

export default EditMode


