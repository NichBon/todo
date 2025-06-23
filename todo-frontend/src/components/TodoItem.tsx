import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import React, { useEffect, useRef } from 'react';
import type { Todo } from '../types/types';

type Props = {
    todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        console.log(`mounted todo item with id: ${todo.id}`)

        return draggable({
            element: ref.current,
            getInitialData: () => ({ type: 'todo', id: todo.id })
        });
    }, [todo.id]);

    return (
        <div
            ref={ref}
            style={{
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: '12px 16px',
                marginBottom: 8,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                cursor: 'grab'
            }}
        >
            {todo.name}
        </div>
    );
};

export default TodoItem;

// https://atlassian.design/components/pragmatic-drag-and-drop/