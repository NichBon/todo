import type { Category } from "../../types/types"

type Props = {
    category: Category;
}

const CategoryColorPill: React.FC<Props> = ({ category }) => {

    return (
        <span style={{
            backgroundColor: category.color,
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '999px',
            marginRight: '6px',
            whiteSpace: 'nowrap',
            height: '5px',
        }}>
        </span>
    )
}

export default CategoryColorPill