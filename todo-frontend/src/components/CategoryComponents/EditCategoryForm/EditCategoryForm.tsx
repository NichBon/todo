import { COLORS, type Category, type Color } from "../../../types/types";
import classes from "./EditCategoryForm.module.scss"

type EditCategoryFormProps = {
    category: Category;
    onUpdate: (field: keyof Category, value: any) => void;
};

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category, onUpdate }) => (
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
            <select
                value={category.color}
                onChange={e => onUpdate('color', e.target.value as Color)}
            >
                {COLORS.map(color => (
                    <option key={color} value={color}>{color}</option>
                ))}
            </select>
        </div>
    </div>
)

export default EditCategoryForm;