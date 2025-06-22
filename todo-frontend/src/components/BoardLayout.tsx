import { useState } from 'react';
import ToDoColumn from './ToDoColumn';
import { dummyData } from '../data/dummyData';
import type { Columns } from '../types/types';

const BoardLayout = () => {
    const [columns, setColumns] = useState(dummyData);

    const handleDrop = (todoId: string, destinationColId: string) => {
        const newColumns: Columns = { ...columns };
        let movedItem;

        for (const colId in newColumns) {
            const index = newColumns[colId].items.findIndex(item => item.id === todoId);
            if (index !== -1) {
                [movedItem] = newColumns[colId].items.splice(index, 1);
                break;
            }
        }

        if (movedItem) {
            newColumns[destinationColId].items.push(movedItem);
            setColumns(newColumns);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            {Object.entries(columns).map(([id, column]) => (
                <ToDoColumn key={id} columnId={id} column={column} onDrop={handleDrop} />
            ))}
        </div>
    );
};

export default BoardLayout;