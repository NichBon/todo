import type { Todo } from "../../types/types"

type Props = {
    todo: Todo;
}

const ToDoItemColorBar: React.FC<Props> = ({ todo }) => {

    return (
        <div style={{ display: 'flex', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
            {todo.categories.map((category, index) => (
                <div
                    key={category.id}
                    style={{
                        flex: 1,
                        backgroundColor: category.color,
                        borderRight: index !== todo.categories.length - 1 ? '1px solid #1e1e2e' : 'none'
                    }}
                />
            ))}
        </div>
    )
}

export default ToDoItemColorBar