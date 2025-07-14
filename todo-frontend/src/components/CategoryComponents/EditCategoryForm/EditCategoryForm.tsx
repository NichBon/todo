import { useState } from "react";
import { type Category, type Color } from "../../../types/types";
import CategoryFilterButton from "../CategoryFilterButton";
import classes from "./EditCategoryForm.module.scss"
import { HexColorPicker } from "react-colorful";

type EditCategoryFormProps = {
    category: Category;
    onUpdate: (field: keyof Category, value: any) => void;
};



const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category, onUpdate }) => {
    const [filterState, setFilterState] = useState<'none' | 'include' | 'exclude'>('include');

    const cycleFilterState = () => {
        setFilterState(prev =>
            prev === 'none' ? 'include'
                : prev === 'include' ? 'exclude'
                    : 'none'
        );
    };

    return (
        <div className={classes.editCategoryForm}>
            <div className={classes.formGroup}>
                <label>Name</label>
                <input
                    type='text'
                    value={category.name}
                    onChange={e => onUpdate('name', e.target.value)}
                    placeholder="Category name"
                />
            </div>
            <div className={classes.formGroup}>
                <label>Color</label>
                <div className={classes.colorPickerSection}>
                    <HexColorPicker color={category.color} onChange={e => onUpdate('color', e as Color)} />
                    <div className={classes.categoryButtonPreview}>
                        <label>Preview</label>
                        <div>
                            <CategoryFilterButton
                                category={category}
                                onFilterChange={cycleFilterState}
                                filterState={filterState}
                            ></CategoryFilterButton>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCategoryForm;