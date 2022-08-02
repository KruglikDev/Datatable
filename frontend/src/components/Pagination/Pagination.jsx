import {useEffect, useState} from "react";

import './Pagination.css';

const Pagination = ({onPageChange, total}) => {
    // Current active button number
    const [currentButton, setCurrentButton] = useState(1);

    // Array of buttons what we see on the page
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState(total);

    useEffect(() => {
        setArrOfCurrButtons(total);

        if(total[total.length-1] < currentButton) {
            setCurrentButton(total.length);
        }

        let tempNumberOfPages = [...arrOfCurrButtons];

        let dotsInitial = '...';
        let dotsLeft = '... ';
        let dotsRight = ' ...';

        if (total.length < 6) {
            tempNumberOfPages = total;
        }

        else if (currentButton >= 1 && currentButton <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, total.length];
        }

        else if (currentButton === 4) {
            const sliced = total.slice(0, 5);
            tempNumberOfPages = [...sliced, dotsInitial, total.length];
        }

        else if (currentButton > 4 && currentButton < total.length - 2) {
            const sliced1 = total.slice(currentButton - 2, currentButton);
            const sliced2 = total.slice(currentButton, currentButton + 1);
            tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, total.length]);
        }

        else if (currentButton > total.length - 3) {
            const sliced = total.slice(total.length - 4);
            tempNumberOfPages = ([1, dotsLeft, ...sliced]);
        }

        else if (currentButton === dotsInitial) {
            setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1);
        }
        else if (currentButton === dotsRight) {
            setCurrentButton(arrOfCurrButtons[3] + 2);
        }

        else if (currentButton === dotsLeft) {
            setCurrentButton(arrOfCurrButtons[3] - 2);
        }

        setArrOfCurrButtons(tempNumberOfPages);
        onPageChange(currentButton);
    }, [total, currentButton]);

    return (
        <ul className="pagination">
            <li
                className={`${currentButton === 1 ? 'disabled' : ''}`}
                onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
            >
                Prev
            </li>

            {arrOfCurrButtons.map(((item, index) => {
                return <li
                    key={index}
                    className={`${currentButton === item ? 'active' : ''}`}
                    onClick={() => setCurrentButton(item)}
                >
                    {item}
                </li>
            }))}

            <li
                className={`${currentButton === total.length ? 'disabled' : ''}`}
                onClick={() => setCurrentButton(prev => prev >= total.length ? prev : prev + 1)}
            >
                Next
            </li>
        </ul>
    );
}

export default Pagination;
