import type { Columns } from "../types/types";

export const dummyData: Columns = {
    'todo': {
        name: 'To Do',
        items: [
            { id: '1', name: 'Write unit tests' },
            { id: '2', name: 'Set up CI/CD pipeline' }
        ]
    },
    'in-progress': {
        name: 'In Progress',
        items: [
            { id: '3', name: 'Implement auth flow' }
        ]
    },

    'done': {
        name: 'Done',
        items: [
            { id: '4', name: 'Initialize project repo' }
        ]
    }
};