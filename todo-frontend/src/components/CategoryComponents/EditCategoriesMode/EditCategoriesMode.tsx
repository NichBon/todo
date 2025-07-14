import { useEffect, useRef, useState } from 'react';
import { type Category } from '../../../types/types';
import { batchUpdateCategories } from '../../../services/dbservice';
import classes from './EditCategoriesMode.module.scss';
import EditCategoryForm from '../EditCategoryForm/EditCategoryForm';

type Props = {
    categories: Category[];
    onCategoryChange: (changedCategories: Category[], isDirty: boolean) => void;
    onExit: (updated: Category[]) => void;
    onCancel: () => void;
    onHide: () => void;
    wasDirty: boolean;
};

const EditCategoriesMode: React.FC<Props> = ({
    categories,
    onCategoryChange,
    onExit,
    onCancel,
    onHide,
    wasDirty,
}) => {
    const [changedCategories, setChangedCategories] = useState<Category[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [confirmingCancel, setConfirmingCancel] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const currentCategory = changedCategories[currentIndex];
    const isDirty = useRef(wasDirty);

    useEffect(() => {
        setChangedCategories(structuredClone(categories));
    }, [categories]);

    const updateCurrentField = (field: keyof Category, value: any) => {
        if (!isDirty.current) isDirty.current = true;
        setChangedCategories(prev => {
            const updated = prev.map((category, i) =>
                i === currentIndex ? { ...category, [field]: value } : category
            )

            onCategoryChange(updated, isDirty.current);

            return updated;
        }
        );
    };


    const handleApplyChanges = async () => {
        const updates = changedCategories.filter((category, i) => {
            const original = categories[i];
            return (
                category.id.toString().startsWith('temp-') ||
                !original ||
                category.name !== original.name ||
                category.color !== original.color
            );
        });

        await batchUpdateCategories(updates);
        onExit(changedCategories);
    };

    const handleHide = () => {
        onHide();
    }

    const handleCancel = () => {
        if (isDirty.current) {
            setConfirmingCancel(true);
        } else {
            onCancel();
        }
    };

    const handleConfirmCancel = () => {
        setConfirmingCancel(false);
        onCancel();
    };

    const handleCancelBack = () => {
        setConfirmingCancel(false);
    };

    const handleAddCategory = () => {
        const newId = (changedCategories[changedCategories.length - 1].id < 0) ?
            changedCategories[changedCategories.length - 1].id - 1
            : -1;
        const newCategory: Category = {
            id: newId,
            name: "",
            color: 'RED',
            todos: [],
        }

        setChangedCategories(prev => [...prev, newCategory]);
        setCurrentIndex(changedCategories.length)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={classes.editCategoriesContainer} ref={modalRef}>
            <div className={classes.navControls}>
                <span className={classes.navButton} onClick={() => setCurrentIndex(i => i < 1 ? changedCategories.length - 1 : i - 1)}>
                    {"<"} Previous
                </span>
                <span>{currentIndex + 1} / {changedCategories.length}</span>
                <span className={classes.navButton} onClick={() => setCurrentIndex(i => i > changedCategories.length - 2 ? 0 : i + 1)}>
                    Next {">"}
                </span>
            </div>

            {currentCategory && (
                <EditCategoryForm
                    category={currentCategory}
                    onUpdate={updateCurrentField}
                />
            )}

            {confirmingCancel ? (
                <div className={classes.confirmationBox}>
                    <p>Discard all unsaved changes?</p>
                    <div className={classes.confirmationButtons}>
                        <button onClick={handleCancelBack}>Go Back</button>
                        <button onClick={handleConfirmCancel}>Confirm</button>
                    </div>
                </div>
            ) : (
                <div className={classes.buttonRow}>
                    <button onClick={handleAddCategory}>Add Category</button>
                    <span>
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleHide}>Hide</button>
                        <button onClick={handleApplyChanges}>Apply Changes</button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default EditCategoriesMode;
