import {useCallback, useEffect, useState} from "react";

import './DataTable.css';

const DataTable = ({filteredRows, rows, setFilteredRows, setRows, currentPage, itemsPerPage}) => {
    const [isSorted, setIsSorted] = useState({});
    const [order, setOrder] = useState('ASC');
    const [paginatedPosts, setPaginatedPosts] = useState();

    //Data for each page
    const getDataPerPage = () => {
        const indexOfLastRecord = currentPage * itemsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
        setPaginatedPosts(filteredRows
            ? filteredRows.slice(indexOfFirstRecord, indexOfLastRecord)
            : rows.slice(indexOfFirstRecord, indexOfLastRecord));
    }

    useEffect(() => {
        if(!rows) return;

        getDataPerPage();
    }, [currentPage, rows, filteredRows]);

    //Render arrow to show which sorting parameter is active now
    const renderArrow = (col) => {
        if(order === 'ASC' && isSorted[col] === true) {
            return String.fromCharCode(8595);
        }
        if(order === 'DSC' && isSorted[col] === true) {
            return String.fromCharCode(8593);
        }
        else {
            return '';
        }
    }

    const sorting = useCallback((col) => {
        setIsSorted({[col]: true});
        const data = filteredRows ? filteredRows : rows;

        //Sorting strings
        if (order === 'ASC' && col === 'name') {
            const sorted = [...data].sort((a,b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            filteredRows ? setFilteredRows(sorted) : setRows(sorted);
            setOrder('DSC');
        }
        if (order === 'DSC' && col === 'name') {
            const sorted = [...data].sort((a,b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            filteredRows ? setFilteredRows(sorted) : setRows(sorted);
            setOrder('ASC');
        }

        //Sorting numbers
        if (order === 'ASC' && col !== 'name') {
            const sorted = [...data].sort((a,b) => +a[col] - +b[col]);
            filteredRows ? setFilteredRows(sorted) : setRows(sorted);
            setOrder('DSC');
        }
        if (order === 'DSC' && col !== 'name') {
            const sorted = [...data].sort((a,b) => +b[col] - +a[col]);
            filteredRows ? setFilteredRows(sorted) : setRows(sorted);
            setOrder('ASC');
        }
    }, [filteredRows, rows, setRows,setFilteredRows]);

    return (<table>
                <thead className='head'>
                <tr>
                    <th>Дата</th>
                    <th onClick={() => sorting('name')}>Название {renderArrow('name')}</th>
                    <th onClick={() => sorting('amount')}>Количество {renderArrow('amount')}</th>
                    <th onClick={() => sorting('distance')}>Расстояние {renderArrow('distance')}</th>
                </tr>
                </thead>
                <tbody>
                {paginatedPosts && paginatedPosts.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>{item.distance}</td>
                    </tr>
                ))}
                </tbody>
            </table>)
}

export default DataTable;
