import { useEffect, useRef, useState } from 'react';
import ToDoColumn from '../ToDoColumn.tsx';
import { columnIdToStatus, emptyBoard, type Category, type Columns, type Todo } from '../../types/types.ts';
import { fetchCategories, fetchTodos, updateTodo } from '../../services/dbservice.ts'
import CategoryFilterBar, { type FilterState } from '../CategoryFilterBar.tsx';
import EditTodosMode from '../EditTodosMode/EditTodosMode.tsx';
import EditCategoriesMode from '../EditCategoriesMode.tsx';
import { sortColumns } from '../../services/dataManipluationService.ts';
import './BoardLayout.scss'


const BoardLayout = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [columns, setColumns] = useState<Columns>({});
    const [categories, setCategories] = useState<Category[]>([])

    // filters
    const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
    const [showArchivedFilter, setShowArchivedFilter] = useState<boolean>(false);
    const [categoryFilters, setCategoryFilters] = useState<Record<string, FilterState>>({});

    // Modal
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);
    const dirtyTodos = useRef<Todo[]>([]);
    const todosAreDirty = useRef<boolean>(false);

    // for dev server
    const didFetch = useRef(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

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
        const filteredTodos = todos.filter(todo => {
            const categoryIds = todo.categories.map(cat => cat.id.toString());

            const include = Object.entries(categoryFilters)
                .filter(([, state]) => state === "include")
                .map((([id]) => id));

            const exclude = Object.entries(categoryFilters)
                .filter(([, state]) => state === "exclude")
                .map((([id]) => id));

            const matchesCategories = (
                include.length === 0
                || include.every(id => categoryIds.includes(id))
                && !exclude.some(id => categoryIds.includes(id))
            )

            return matchesCategories
        })

        const newColumns = sortColumns(filteredTodos);
        setColumns(newColumns);
    }, [todos, categoryFilters])

    const handleDrop = (todoId: number, destinationColId: string) => {
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

    const handleCategoryFilterChange = (newFilters: Record<string, FilterState>) => {
        setCategoryFilters(newFilters);
    };

    const handleTodoClick = (clickedTodo: Todo) => {
        const index = todos.findIndex(t => t.id === clickedTodo.id);
        if (index !== -1) {
            setCurrentIndex(index);
            setIsOpen(true);
        }
    };

    const handleModalUpdate = (updated: Todo[]) => {
        setTodos(updated);
        setIsOpen(false);
        dirtyTodos.current = [];
        todosAreDirty.current = false;
    }

    const handleModalDiscard = () => {
        setIsOpen(false);
        dirtyTodos.current = [];
        todosAreDirty.current = false;
    };

    const handleModalHide = () => {
        setIsOpen(false);
    }

    const modalTodoChange = (updated: Todo[], isDirty: boolean) => {
        dirtyTodos.current = updated;
        todosAreDirty.current = isDirty;
    }

    return (
        <>
            {isOpen && (
                <div className="modal-edit-todo">
                    <div className="modal-content" ref={modalRef}>
                        <EditTodosMode
                            todos={dirtyTodos.current.length === 0 ? todos : dirtyTodos.current}
                            categories={categories}
                            onTodoChange={modalTodoChange}
                            onExit={handleModalUpdate}
                            onCancel={handleModalDiscard}
                            onHide={handleModalHide}
                            clickedIndex={currentIndex}
                            wasDirty={todosAreDirty.current}
                        >
                        </EditTodosMode>
                    </div>
                </div>
            )}

            {loading === true && <div>Loading...</div>}
            {error !== null && <p>Error: {error}</p>}
            <CategoryFilterBar
                categories={categories}
                onChange={handleCategoryFilterChange}
            />

            {todos.length !== 0 && <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                {Object.entries(columns).map(([id, column]) => (
                    <ToDoColumn key={id} columnId={id} column={column} onDrop={handleDrop} onTodoClick={handleTodoClick} />
                ))}
            </div>}

            <EditCategoriesMode categories={categories} onExit={(updated) => setCategories(updated)}></EditCategoriesMode>
        </>
    );
};

export default BoardLayout;