import { useEffect, useState } from 'react';
import { batchUpdateTodos } from '../../services/dbservice';
import { areCategoriesEqual, type Category, type Todo } from '../../types/types';
import { formatDate } from '../../services/dateService';
import { CategoryToggleButtons } from '../CategoryToggleButtons/CategoryToggleButtons';

import './EditTodosMode.scss';

type Props = {
    todos: Todo[];
    categories: Category[];
    onExit: (updated: Todo[]) => void;
};

const EditTodosMode: React.FC<Props> = ({ todos, categories, onExit }) => {

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
            if (todo.id.toString().startsWith('temp-')) return true;
            const original = todos[id];
            return (
                todo.name !== original.name ||
                todo.status !== original.status ||
                todo.archivedAt !== original.archivedAt ||
                !areCategoriesEqual(todo.categories, original.categories) ||
                todo.priority !== original.priority
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

    const handleAddTodo = () => {
        const newTodo: Todo = {
            id: `temp-${crypto.randomUUID()}`,
            name: "",
            priority: "LOW",
            createdAt: formatDate(new Date),
            archivedAt: null,
            status: 'TO_DO',
            categories: [],
        }

        setChangedTodos(prev => [...prev, newTodo]);
    }

    return (
        <div className="edit-todos-container">
            {!editMode && <button onClick={() => setEditMode(true)}>
                {'Edit Todos'}
            </button>}
            {editMode && (
                <>

                    {changedTodos.map((todo) => (
                        <div key={todo.id} style={{ margin: '0.5rem 0' }}>
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
                                style={{ marginRight: '0.5rem' }}
                            >
                                <option value="TO_DO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="ON_HOLD">On Hold</option>
                            </select>

                            <select
                                value={todo.priority}
                                onChange={e =>
                                    updateField(todo.id, 'priority', e.target.value as Todo['priority'])
                                }
                                style={{ marginRight: '0.5rem' }}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>

                            <label className="archive-checkbox">
                                <span>Archived</span>
                                <input
                                    type="checkbox"
                                    checked={todo.archivedAt ? true : false}
                                    onChange={() => updateField(todo.id, 'archivedAt', todo.archivedAt ? null : formatDate(new Date))}
                                />
                            </label>

                            <CategoryToggleButtons
                                selected={todo.categories}
                                allCategories={categories}
                                onToggle={updated => {
                                    console.log('Updating todo', todo.id, 'with categories', updated.map(c => c.id));
                                    updateField(todo.id, 'categories', updated)
                                }}
                            />

                        </div>
                    ))}

                    <button onClick={cancelEditMode} style={{ margin: "0.5rem" }}>Cancel</button>
                    <button onClick={handleAddTodo} style={{ margin: "0.5rem" }}>Add Todo</button>
                    <button onClick={exitEditMode} style={{ margin: "0.5rem" }}>Apply Changes</button>
                </>
            )}
        </div>
    )
}

export default EditTodosMode


{/* <select
                                multiple
                                value={todo.categories.map(category => String(category.id))}
                                onChange={e => {
                                    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => String(opt.value));
                                    const selectedCategories = categories.filter(category => selectedOptions.includes(String(category.id)));
                                    updateField(todo.id, 'categories', selectedCategories);
                                }}
                                style={{ marginRight: '0.5rem' }}
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={String(category.id)}>
                                        {category.name}
                                    </option>
                                ))}
                            </select> */}
{/* <button
                                style={{ marginLeft: '1rem', width: "80px" }}
                                onClick={() => updateField(todo.id, 'archivedAt', todo.archivedAt ? null : formatDate(new Date))}
                            >
                                {todo.archivedAt ? 'Unarchive' : 'Archive'}
                            </button> */}