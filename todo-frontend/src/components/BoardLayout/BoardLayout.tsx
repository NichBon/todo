import { useEffect, useRef, useState } from 'react';
import ToDoColumn from '../TodoComponents/ToDoColumn.tsx';
import { columnIdToStatus, type Category, type Columns, type modalTypes, type Todo } from '../../types/types.ts';
import { fetchCategories, fetchTodos, updateTodo } from '../../services/dbservice.ts'
import CategoryFilterBar, { type FilterState } from '../CategoryComponents/CategoryFilterBar.tsx';
import EditTodosMode from '../TodoComponents/EditTodosMode/EditTodosMode.tsx';
import EditCategoriesMode from '../CategoryComponents/EditCategoriesMode/EditCategoriesMode.tsx';
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
    const [isOpen, setIsOpen] = useState<string | boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);
    const dirtyTodos = useRef<Todo[]>([]);
    const todosAreDirty = useRef<boolean>(false);

    const dirtyCategories = useRef<Category[]>([]);
    const categoriesAreDirty = useRef<boolean>(false);

    // for dev server
    const didFetch = useRef(false);

    // modal click outside
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
            setIsOpen('todo');
        }
    };

    const handleModalTodosUpdate = (updated: Todo[]) => {
        setTodos(updated);
        setIsOpen(false);
        dirtyTodos.current = [];
        todosAreDirty.current = false;
    }

    const handleModalCategoryUpdate = (updated: Category[]) => {
        setCategories(updated);
        setIsOpen(false);
        dirtyCategories.current = [];
        categoriesAreDirty.current = false;
    }

    const handleModalDiscard = () => {
        if (isOpen === 'todo') {
            dirtyTodos.current = [];
            todosAreDirty.current = false;
        }
        if (isOpen === 'category') {
            dirtyCategories.current = [];
            categoriesAreDirty.current = false;
        }
        setIsOpen(false);
    };

    const handleModalHide = () => {
        setIsOpen(false);
    }

    const modalTodoChange = (updated: Todo[], isDirty: boolean) => {
        dirtyTodos.current = updated;
        todosAreDirty.current = isDirty;
    }

    const modalCategoryChange = (updated: Category[], isDirty: boolean) => {
        dirtyCategories.current = updated;
        categoriesAreDirty.current = isDirty;
    }

    const handleEdit = (type: modalTypes) => {
        setCurrentIndex(0);
        setIsOpen(type);
    }

    return (
        <>
            {isOpen === 'todo' && (
                <div className="modal-edit-todo">
                    <div className="modal-content" ref={modalRef}>
                        <EditTodosMode
                            todos={dirtyTodos.current.length === 0 ? todos : dirtyTodos.current}
                            categories={categories}
                            onTodoChange={modalTodoChange}
                            onExit={handleModalTodosUpdate}
                            onCancel={handleModalDiscard}
                            onHide={handleModalHide}
                            clickedIndex={currentIndex}
                            wasDirty={todosAreDirty.current}
                        >
                        </EditTodosMode>
                    </div>
                </div>
            )}

            {isOpen === 'category' && (
                <div className="modal-edit-todo">
                    <div className="modal-content" ref={modalRef}>
                        <EditCategoriesMode
                            categories={dirtyCategories.current.length === 0 ? categories : dirtyCategories.current}
                            onCategoryChange={modalCategoryChange}
                            onExit={handleModalCategoryUpdate}
                            onCancel={handleModalDiscard}
                            onHide={handleModalHide}
                            wasDirty={categoriesAreDirty.current}>
                        </EditCategoriesMode>
                    </div>
                </div>
            )}

            {loading === true && <div>Loading...</div>}
            {error !== null && <p>Error: {error}</p>}
            <div>
                <button onClick={() => handleEdit('category')}>Edit Categories</button>
                <button onClick={() => handleEdit('todo')}>Edit Todos</button>
            </div>

            <CategoryFilterBar
                categories={categories}
                onChange={handleCategoryFilterChange}
            />

            {<div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                {Object.entries(columns).map(([id, column]) => (
                    <ToDoColumn key={id} columnId={id} column={column} onDrop={handleDrop} onTodoClick={handleTodoClick} />
                ))}
            </div>}
        </>
    );
};

export default BoardLayout;