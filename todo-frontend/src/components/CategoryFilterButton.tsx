import { useState } from 'react';
import type { Category } from '../types/types';

type FilterState = 'include' | 'exclude' | 'none';

type Props = {
    category: Category;
    onFilterChange: (categoryId: string, newState: FilterState) => void;
};

const stateCycle: Record<FilterState, FilterState> = {
    none: 'include',
    include: 'exclude',
    exclude: 'none'
};

const borderColors: Record<FilterState, string> = {
    none: '#343a52',
    include: '#1e7a17',
    exclude: '#7a1717'
};

const CategoryFilterButton: React.FC<Props> = ({ category, onFilterChange }) => {
    const [state, setState] = useState<FilterState>('none');

    const handleClick = () => {
        const nextState = stateCycle[state];
        setState(nextState);
        onFilterChange(category.id, nextState);
    };

    return (
        <button
            onClick={handleClick}
            style={{
                backgroundColor: category.color.toLowerCase(),
                border: `3px solid ${borderColors[state]}`,
                borderRadius: '50px',
                padding: '6px 12px',
                margin: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
        >
            {category.name} {state !== 'none' ? `(${state})` : ''}
        </button>
    );
};

export default CategoryFilterButton;
