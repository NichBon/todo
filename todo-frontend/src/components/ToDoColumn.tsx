
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef } from 'react';
import type { ColumnData, Todo } from '../types/types';
import TodoItem from './TodoItem';

type Props = {
  columnId: string;
  column: ColumnData;
  onDrop: (todoId: number, destinationColId: string) => void;
}

const TodoColumn: React.FC<Props> = ({ columnId, column, onDrop }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => ({ type: 'column', id: columnId }),
      onDrop: ({ source }) => {
        if (source?.data?.type === 'todo' && typeof source.data.id === 'number') {
          onDrop(source.data.id, columnId);
        }
      }
    });
  }, [columnId, onDrop]);

  return (
    <div
      ref={ref}
      style={{
        background: '#f4f5f7',
        padding: 16,
        borderRadius: 6,
        width: 250,
        minHeight: 300
      }}
    >
      <h3>{column.name}</h3>
      {column.items.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoColumn;