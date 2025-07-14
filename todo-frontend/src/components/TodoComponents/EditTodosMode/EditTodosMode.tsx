import { useEffect, useRef, useState } from 'react';
import { batchUpdateTodos } from '../../../services/dbservice';
import { areCategoriesEqual, type Category, type Todo } from '../../../types/types';
import { formatDate } from '../../../services/dateService';
import classes from './EditTodosMode.module.scss';

import EditTodoForm from '../EditToDoForm/EditTodoForm';

type Props = {
    todos: Todo[];
    categories: Category[];
    onExit: (updated: Todo[]) => void;
    onCancel: () => void;
    clickedIndex?: number;
    onHide: () => void;
    wasDirty: boolean;
    onTodoChange: (changedTodos: Todo[], isDirty: boolean) => void;
};

const EditTodosMode: React.FC<Props> = ({
    todos,
    categories,
    onExit,
    onCancel,
    clickedIndex,
    wasDirty,
    onHide,
    onTodoChange
}) => {

    const [changedTodos, setChangedTodos] = useState<Todo[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [confirmingCancel, setConfirmingCancel] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const currentTodo = changedTodos[currentIndex];
    const isDirty = useRef(wasDirty)



    useEffect(() => {
        setChangedTodos(structuredClone(todos));
    }, [todos])

    useEffect(() => {
        setChangedTodos(structuredClone(todos));
        if (clickedIndex !== undefined) {
            setCurrentIndex(clickedIndex);
        }
    }, [todos, clickedIndex]);

    const updateCurrentField = (field: keyof Todo, value: any) => {
        if (!isDirty.current) isDirty.current = true;
        setChangedTodos(prev => {
            const updated = prev.map((todo, i) =>
                i === currentIndex ? { ...todo, [field]: value } : todo
            )

            onTodoChange(updated, isDirty.current);

            return updated;
        }
        );
    };

    const handleApplyChanges = async () => {
        const updates = changedTodos.filter((todo, id) => {
            if (todo.id < 0) return true;
            const original = todos[id];
            return (
                todo.name !== original.name ||
                todo.status !== original.status ||
                todo.archivedAt !== original.archivedAt ||
                !areCategoriesEqual(todo.categories, original.categories) ||
                todo.priority !== original.priority
            );
        });

        const updatedTodos = await batchUpdateTodos(updates)
        onExit(updatedTodos);
    };

    const handleHide = () => {
        onHide();
    }

    const handleCancel = () => {
        if (isDirty.current === true) {
            setConfirmingCancel(true);
        } else {
            onCancel();
        }
    }

    const handleConfirmCancel = () => {
        setConfirmingCancel(false);
        onCancel();
    };

    const handleCancelBack = () => {
        setConfirmingCancel(false);
    };

    const handleAddTodo = () => {
        const last = changedTodos[changedTodos.length - 1];
        const newId = (last?.id && last.id < 0) ?
            changedTodos[changedTodos.length - 1].id - 1
            : -1;
        const newTodo: Todo = {
            id: newId,
            name: "",
            priority: "LOW",
            createdAt: formatDate(new Date),
            archivedAt: null,
            status: 'TO_DO',
            categories: [],
        }

        setChangedTodos(prev => [...prev, newTodo]);
        setCurrentIndex(changedTodos.length)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onHide();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleCancel]);


    return (
        <div className={classes.editTodosContainer}>

            <div className={classes.navControls}>
                <span className={classes.navButton} onClick={() => setCurrentIndex(i => i < 1 ? changedTodos.length - 1 : i - 1)}>
                    {"<"} Previous
                </span>
                <span>{currentIndex + 1} / {changedTodos.length}</span>
                <span className={classes.navButton} onClick={() => setCurrentIndex(i => i > changedTodos.length - 2 ? 0 : i + 1)}>
                    Next {">"}
                </span>
            </div>

            {currentTodo && (
                <EditTodoForm
                    todo={currentTodo}
                    categories={categories}
                    onUpdate={updateCurrentField}
                />
            )}

            {confirmingCancel ? (
                <div className={classes.confirmationBox}>
                    <p>Discard all unsaved changes?</p>
                    <div className={classes.confirmationButtons}>
                        <span>
                            <button onClick={handleCancelBack}>Go Back</button>
                            <button onClick={handleConfirmCancel}>Confirm</button></span>
                    </div>
                </div>
            ) : (
                <div className={classes.buttonRow}>
                    <button onClick={handleAddTodo}>Add New Todo</button>
                    <span>
                        <button onClick={handleCancel} data-trigger-cancel>Cancel</button>
                        <button onClick={handleHide}>Hide</button>
                        <button onClick={handleApplyChanges}>Apply Changes</button>
                    </span>
                </div>
            )}
        </div>
    )
};

export default EditTodosMode