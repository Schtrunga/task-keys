import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [data, setData] = useState<IItem[]>(props.initialData);

    const sortedData = [...data].sort((a, b) => {
        return props.sorting === 'ASC' ? a.id - b.id : b.id - a.id;
    });

    const handleStartEdit = (item: IItem) => {
        setEditingId(item.id);
        setEditValue(item.name);
    };

    const handleSave = () => {
        if (editingId !== null) {
            setData((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...item, name: editValue } : item,
                ),
            );
            setEditingId(null);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div>
            {sortedData.map((item) => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => handleStartEdit(item)}>
                            {item.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
