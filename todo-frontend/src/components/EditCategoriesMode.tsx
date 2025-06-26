import { useEffect, useState } from 'react';
import { COLORS, type Category, type Color } from '../types/types';
import { batchUpdateCategories } from '../services/dbservice';

type Props = {
    categories: Category[];
    onExit: (updated: Category[]) => void;
};

const EditCategoriesMode: React.FC<Props> = ({ categories, onExit }) => {
    const [editMode, setEditMode] = useState(false);
    const [changedCategories, setChangedCategories] = useState<Category[]>([]);

    useEffect(() => {
        setChangedCategories(structuredClone(categories));
    }, [categories]);

    const updateField = (id: string | number, field: keyof Category, value: any) => {
        setChangedCategories(prev =>
            prev.map(category => (category.id === id ? { ...category, [field]: value } : category))
        );
    };

    const handleAddCategory = () => {
        const newCategory: Category = {
            id: `temp-${crypto.randomUUID()}`,
            name: '',
            color: 'GREY',
            todos: []
        };
        setChangedCategories(prev => [...prev, newCategory]);
    };

    const cancelEditMode = () => {
        setEditMode(false);
    };

    const exitEditMode = async () => {
        const updates = changedCategories.filter((category) => {
            if (category.id.toString().startsWith('temp-')) return true;
            const original = categories.find(category => category.id === category.id);
            return original && (category.name !== original.name || category.color !== original.color);
        });

        const result = await batchUpdateCategories(updates);
        console.log(result);

        setEditMode(false);
        onExit(changedCategories);
    };

    return (
        <div>
            {!editMode && (
                <button onClick={() => setEditMode(true)}>Edit Categories</button>
            )}
            {editMode && (
                <>
                    {changedCategories.map(category => (
                        <div key={category.id} style={{ margin: '0.5rem 0' }}>
                            <input
                                value={category.name}
                                onChange={e => updateField(category.id, 'name', e.target.value)}
                                placeholder="Category name"
                                style={{ marginRight: '0.5rem' }}
                            />
                            <select
                                value={category.color}
                                onChange={e => updateField(category.id, 'color', e.target.value as Color)}
                            >
                                {COLORS.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <button onClick={cancelEditMode} style={{ margin: "0.5rem" }}>Cancel</button>
                    <button onClick={handleAddCategory} style={{ margin: "0.5rem" }}>Add Category</button>
                    <button onClick={exitEditMode} style={{ margin: "0.5rem" }}>Apply Changes</button>
                </>
            )}
        </div>
    );
};

export default EditCategoriesMode;