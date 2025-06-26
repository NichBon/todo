import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import React, { useEffect, useRef } from 'react';
import type { Todo } from '../types/types';
import ToDoItemColorBar from './ToDoItemColorBar';
import CategoryColorPill from './CategoryColorPill';

type Props = {
    todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    // const categoryColors = todo.categories.map(c => c.color);
    // const borderGradient = `linear-gradient(to right, ${categoryColors.join(', ')})`;


    useEffect(() => {
        if (!ref.current) return;

        return draggable({
            element: ref.current,
            getInitialData: () => ({ type: 'todo', id: todo.id })
        });
    }, [todo.id]);

    return (
        <div>
            {/* <ToDoItemColorBar todo={todo}></ToDoItemColorBar> */}
            <div
                ref={ref}
                style={{
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    padding: '8px 16px',
                    marginBottom: 8,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    cursor: 'grab',
                }}
            >
                {todo.name}
                <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '5px' }}>
                    {todo.categories.map(cat => (
                        <CategoryColorPill key={cat.id} category={cat} />
                    ))}
                </div>
            </div>
        </div>
    );

    // return (
    //     <div style={{ padding: '4px 2px', borderRadius: "8px", background: borderGradient, margin: "2px" }}>
    //         <div
    //             ref={ref}
    //             style={{
    //                 background: '#fff',
    //                 border: '1px solid #ccc',
    //                 borderRadius: 4,
    //                 padding: '8px 16px',
    //                 boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    //                 cursor: 'grab'
    //             }}
    //         >
    //             {todo.name}
    //         </div>
    //     </div>
    // );
};

export default TodoItem;

// https://atlassian.design/components/pragmatic-drag-and-drop/
