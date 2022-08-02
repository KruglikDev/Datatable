import {useCallback, useEffect, useState} from "react";

import './Filter.css';

const Filter = ({setFilteredRows, rows}) => {
    const [filterParams, setFilterParams] = useState({
        condition: '',
        text: '',
        column: ''
    });

    //Filter data
    const filterData = useCallback(() => {
        if (!filterParams.text || !filterParams.column || !filterParams.condition || !rows) return;

        switch (filterParams.condition) {
            case 'equal':
            default:
                //Numbers are compared like strings to compare float numbers
                return rows.filter(rows => rows[filterParams.column].toLowerCase().toString() === filterParams.text.toLowerCase().toString());
            case 'exist':
                return rows.filter(rows => {
                    if (filterParams.column === 'name') {
                        return rows[filterParams.column].toLowerCase().includes(filterParams.text.toLowerCase());
                    } else {
                        return +rows[filterParams.column] - +filterParams.text >= 0;
                    }
                });
            case 'more':
                return rows.filter(rows => +rows[filterParams.column] > +filterParams.text);
            case 'less':
                return rows.filter(rows => +rows[filterParams.column] < +filterParams.text);
        }
    }, [filterParams, rows]);

    //Update filter conditions
    useEffect(() => {
        setFilteredRows(filterData());
    }, [filterParams]);

    return (<div className='filter'>
            <h4 className='title'>Фильтр</h4>
                <select
                    name="condition"
                    value={filterParams.condition}
                    onChange={
                    (e) =>
                        setFilterParams({...filterParams, condition: e.target.value})
                    }
                >
                    <option
                        defaultChecked
                        value=""
                    />
                    <option value="equal">Ровно</option>
                    <option value="exist">Содержит</option>
                    <option value="more">Больше</option>
                    <option value="less">Меньше</option>
                </select>
                <input
                    value={filterParams.text}
                    onChange={
                    (e) =>
                        setFilterParams({...filterParams, text: e.target.value})
                    }
                    type="text"
                    name='text'
                    placeholder='Введите данные для фильтрации'
                />
                <select
                    name="column"
                    value={filterParams.column}
                    onChange={
                    (e) =>
                        setFilterParams({...filterParams, column: e.target.value})
                    }
                >
                    <option
                        defaultChecked
                        value=""
                    />
                    <option value="name" >Название</option>
                    <option value="amount">Количество</option>
                    <option value="distance">Расстояние</option>
                </select>
        </div>)
}

export default Filter;
