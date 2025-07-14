import { textColorCalc } from '../../services/textColor';
import { type Category } from '../../types/types';

type FilterState = 'include' | 'exclude' | 'none';

type Props = {
    category: Category;
    filterState: FilterState;
    onFilterChange: (categoryId: number, newState: FilterState) => void;
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

const CategoryFilterButton: React.FC<Props> = ({ category, filterState, onFilterChange }) => {

    const handleClick = () => {
        const nextState = stateCycle[filterState];
        onFilterChange(category.id, nextState);
    };

    return (
        <button
            onClick={handleClick}
            style={{
                backgroundColor: category.color.toLowerCase(),
                border: `3px solid ${borderColors[filterState]}`,
                borderRadius: '50px',
                padding: '6px 12px',
                margin: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                opacity: `${filterState === 'none' ? 0.6 : 1}`,
                //color: `${CATEGORY_TEXT_COLOR[category.color] || 'white'}`
                color: `${textColorCalc(category.color) || 'white'}`
            }}
        >
            {category.name} {filterState !== 'none' ? `(${filterState})` : ''}
        </button>
    );
};

export default CategoryFilterButton;
