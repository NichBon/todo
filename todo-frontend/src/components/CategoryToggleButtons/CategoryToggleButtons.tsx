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
                    <button
                        key={category.id}
                        className={`category-button ${isSelected ? 'selected' : ''}`}
                        style={{
                            borderColor: category.color.toLowerCase(),
                            backgroundColor: isSelected ? category.color.toLowerCase() : 'transparent',
                            color: isSelected ? '#fff' : category.color.toLowerCase(),
                        }}
                        onClick={() => handleToggle(category)}
                    >
                        {category.name}
                    </button>
                );
            })}
        </div>
    );
};