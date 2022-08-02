import DataTable from "./components/DataTable/DataTable";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import {useEffect, useState} from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

const App = () => {
    const [rows, setRows] = useState(null);
    const [filteredRows, setFilteredRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:5000/').then(res => setRows(res.data));
    }, []);

    if(!rows) return <div>Sorry, no data found</div>;

    const getArrayWithNumberOfPages = () => {
        const filteredLength = filteredRows && filteredRows?.length > 1 ? Math.ceil(filteredRows?.length/ITEMS_PER_PAGE) : 0;
        const pageCount = rows.length/ITEMS_PER_PAGE;

        return [...Array(filteredRows ? filteredLength : pageCount).keys()].map(page => page + 1);
    };

  return (
    <div className="App">
        <Filter
            setFilteredRows={setFilteredRows}
            rows={rows}
        />
        <DataTable
            filteredRows={filteredRows}
            rows={rows}
            setFilteredRows={setFilteredRows}
            setRows={setRows}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
        />
        {getArrayWithNumberOfPages().length > 1 && <Pagination
            total={getArrayWithNumberOfPages()}
            onPageChange={(page) => setCurrentPage(page)}
        />}
    </div>
  );
}

export default App;
