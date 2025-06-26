import { useState } from 'react';
import type { Category } from '../types/types';
import CategoryFilterButton from './CategoryFilterButton';

export type FilterState = 'include' | 'exclude' | 'none';

type Props = {
    categories: Category[];
    onChange: (filters: Record<string, FilterState>) => void;
};

const CategoryFilterBar: React.FC<Props> = ({ categories, onChange }) => {
    const [filters, setFilters] = useState<Record<string, FilterState>>({});

    const handleFilterChange = (categoryId: string, newState: FilterState) => {
        const newFilters = { ...filters, [categoryId]: newState };
        setFilters(newFilters);
        onChange(newFilters);
        console.log(newFilters);
    };

    const resetFilters = () => {
        const cleared = categories.reduce<Record<string, FilterState>>((acc, cat) => {
            acc[cat.id] = 'none';
            return acc;
        }, {});
        setFilters(cleared);
        onChange(cleared);
    };

    return (
        <div style={{ padding: '8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            {categories.map((category) => (
                <CategoryFilterButton
                    key={category.id}
                    category={category}
                    onFilterChange={handleFilterChange}
                />
            ))}
            <button
                onClick={resetFilters}
                style={{
                    marginLeft: 'auto',
                    background: '#343a52',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Reset Filters
            </button>
        </div>
    );
};

export default CategoryFilterBar;
