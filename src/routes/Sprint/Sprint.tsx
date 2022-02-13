import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import './Sprint.css';

export const Sprint: React.FC = () => {
    const [level, setLevel] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setLevel(event.target.value as string);
    };

    return (
        <div className="sprint">
            <h1 className="h1">Спринт</h1>
            <div>
                «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
                <ul>
                    <li>Используйте мышь, чтобы выбрать</li>
                </ul>
                <div className="sprint">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={level}
                        label="Level"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <button className="btns btn-start" type="button">
                        НАЧАТЬ
                    </button>
                </div>
            </div>
        </div>
    );
};
