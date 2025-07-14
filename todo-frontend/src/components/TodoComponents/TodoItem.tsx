import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import React, { useEffect, useRef } from 'react';
import type { Todo } from '../../types/types';
import CategoryColorPill from '../CategoryComponents/CategoryColorPill.tsx';

type Props = {
    todo: Todo;
    onClick?: () => void;
}

const TodoItem: React.FC<Props> = ({ todo, onClick }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const overflowLimit: number = 4;

    useEffect(() => {
        if (!ref.current) return;

        return draggable({
            element: ref.current,
            getInitialData: () => ({ type: 'todo', id: todo.id })
        });
    }, [todo.id]);

    return (
        <div>
            <div
                onClick={onClick}
                ref={ref}
                style={{
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    padding: '8px 16px',
                    marginBottom: 8,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    cursor: 'grab',
                    opacity: `${todo.archivedAt ? 0.6 : 1}`
                }}
            >
                {todo.name}
                <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '5px', alignItems: 'center', padding: '5px 0px' }}>
                    {todo.categories.slice(0, overflowLimit).map(cat => (
                        <CategoryColorPill key={cat.id} category={cat} />
                    ))}
                    {todo.categories.length > overflowLimit && <span style={{
                        padding: '2px 3px',
                        borderRadius: '999px',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        lineHeight: 1,
                        color: 'grey'
                    }}>
                        +{todo.categories.length - overflowLimit}
                    </span>}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
