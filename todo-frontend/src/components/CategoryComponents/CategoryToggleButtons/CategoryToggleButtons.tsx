import { CATEGORY_TEXT_COLOR } from '../../../types/types';
import './CategoryToggleButtons.scss';

interface Category {
    id: string | number;
    name: string;
    color: string;
}

interface Props {
    selected: Category[];
    allCategories: Category[];
    onToggle: (updated: Category[]) => void;
}

export const CategoryToggleButtons: React.FC<Props> = ({ selected, allCategories, onToggle }) => {
    const handleToggle = (category: Category) => {
        const isSelected = selected.some(
            selectedCat => String(selectedCat.id) === String(category.id)
        );

        const updated = isSelected
            ? selected.filter(selectedCat => String(selectedCat.id) !== String(category.id))
            : [...selected, category];

        onToggle(updated);
    };

    return (
        <div className="category-toggle-buttons">
            {allCategories.map(category => {
                const isSelected = selected.some(
                    selectedCat => String(selectedCat.id) === String(category.id)
                );

                return (
                    <div
                        key={category.id}
                        className={`category-button ${isSelected ? 'selected' : ''}`}
                        style={{
                            backgroundColor: category.color.toLowerCase(),
                            color: `${CATEGORY_TEXT_COLOR[category.color] || 'white'}`,
                            border: `1px solid ${isSelected ? 'lightgrey' : category.color.toLowerCase() || 'white'}`,
                            opacity: isSelected ? 1 : 0.4,
                        }}
                        onClick={() => handleToggle(category)}
                    >
                        {category.name}
                    </div>
                );
            })}
        </div>
    );
};