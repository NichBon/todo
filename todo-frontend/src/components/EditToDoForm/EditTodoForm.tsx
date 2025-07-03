import { formatDate } from "../../services/dateService";
import type { Category, Todo } from "../../types/types";
import { CategoryToggleButtons } from "../CategoryToggleButtons/CategoryToggleButtons";
import classes from './EditTodoForm.module.scss';

type EditTodoFormProps = {
  todo: Todo;
  categories: Category[];
  onUpdate: (field: keyof Todo, value: any) => void;
};

const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo, categories, onUpdate }) => (
  <div className={classes.editTodoForm}>
    <div className={classes.formGroup}>
      <label>Name</label>
      <input
        type="text"
        value={todo.name}
        onChange={e => onUpdate('name', e.target.value)}
      />
    </div>

    <div className={classes.formGroup}>
      <label>Status</label>
      <select
        value={todo.status}
        onChange={e => onUpdate('status', e.target.value as Todo['status'])}
      >
        <option value="TO_DO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="ON_HOLD">On Hold</option>
      </select>
    </div>

    <div className={classes.formGroup}>
      <label>Priority</label>
      <select
        value={todo.priority}
        onChange={e => onUpdate('priority', e.target.value as Todo['priority'])}
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
    </div>

    <div className={classes.formGroup}>
      <label>Archived</label>
      <input
        type="checkbox"
        checked={!!todo.archivedAt}
        onChange={() =>
          onUpdate('archivedAt', todo.archivedAt ? null : formatDate(new Date()))
        }
      />
    </div>

    <div style={{ paddingTop: '10px' }}>Categories:</div>
    <CategoryToggleButtons
      selected={todo.categories}
      allCategories={categories}
      onToggle={updated => onUpdate('categories', updated)}
    />
  </div>
)


export default EditTodoForm;