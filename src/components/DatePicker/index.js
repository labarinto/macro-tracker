import React, { useState, useEffect } from 'react';
import classes from './style.module.css';

const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const DatePicker = (props) => {
    const [date, setDate] = useState(new Date()); // '1/2/20' month day year
    const [dates, setDates] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    // FILL CALENDAR UI -----
    useEffect( () => {
        const getFirstDateForMonth = (currentDate) => { // get which day, 1 starts for current month
            let month = convertToTwoDigits(currentDate.getMonth() + 1);
            let firstDate = new Date(`${currentDate.getFullYear()}-${month}-01`);
            return firstDate.getDay(); //[0 = sunday , 1 = monday, ...]
        };
        
        const createDates = (firstDate) => { 
            let datesForUI = [], currentMonth = date.getMonth();
            let numDays = MONTH_DAYS[currentMonth];
            if (currentMonth === 1 && isLeapYear(date.getFullYear()) ) numDays = 29;

            for (let day = 0, i = 0; day < numDays; i++, day++) {
                if (day < firstDate) datesForUI[i] = '';
                datesForUI[i + firstDate] = day + 1; //start filling out the placement of 1 to where it falls on the day
            }
            setDates(datesForUI);
        };

        createDates( getFirstDateForMonth(date) );
    }, [date]);
    // -----------------------
    const changeDate = (nextDate) => {
        const newDate = `${selectedYear}-${convertToTwoDigits(selectedMonth + 1)}-${convertToTwoDigits(nextDate)}`;
        setSelectedDate(new Date(newDate));
        props.onChange(newDate);
    }

    const nextPrevDate = (nextDate, month, year) => { // 2020-06-13T23:00:00.000Z ISO format
        const newDate = `${year}-${convertToTwoDigits(month)}-${convertToTwoDigits(nextDate)}`;
        setSelectedDate(new Date(newDate));
        props.onNextPrev(newDate);
    }

    const updateUICalendar = (date, month = selectedMonth, year = selectedYear) => {
        setSelectedMonth(month); // Keep [0: jan, 1: feb, ...] FORMAT
        setSelectedYear(year);
        setDate(new Date(`${year}-${convertToTwoDigits(month + 1)}-${convertToTwoDigits(date)}`));
    }

    //-----------------
    const nextMonth = () => {
        let month = selectedMonth + 1, year = selectedYear;
        if (selectedMonth >= 11) { month = 0; year += 1 };
        updateUICalendar(1, month, year);
    };

    const prevMonth = () => {
        let month = selectedMonth - 1, year = selectedYear;
        if (selectedMonth <= 0) { month = 11; year -= 1 };
        updateUICalendar(1, month, year)
    };

    // DAY
    const nextDay = () => {
        let month = selectedMonth + 1, nextDate = selectedDate.getDate() + 1, year = selectedYear,
            endOfMonth = MONTH_DAYS[month - 1];

        if (nextDate > endOfMonth) { month += 1; nextDate = 1; updateUICalendar(nextDate, month - 1) };
        if (month > 12) { month = 1; year += 1; updateUICalendar(1, month - 1, year) };

        //setSelectedDate(new Date(`${month}/${nextDate}/${year}`));
        nextPrevDate(nextDate, month, year);
    }

    const prevDay = () => {
        let month = selectedMonth + 1, nextDate = selectedDate.getDate() - 1, year = selectedYear;

        if (nextDate < 1) { month -= 1; nextDate = MONTH_DAYS[month - 1]; updateUICalendar(nextDate, month - 1) };
        if (month <= 0) { month = 12; year -= 1; nextDate = 31; updateUICalendar(31, month - 1, year) };

        //setSelectedDate(new Date(`${month}/${nextDate}/${year}`));
        nextPrevDate(nextDate, month, year);
    }

    /* HELPERS */
    const isLeapYear = (year) => 
        ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

    const isSelectedDate = (item) =>
        (item === selectedDate.getDate() &&
            selectedDate.getMonth() === selectedMonth && selectedDate.getFullYear() === selectedYear);
    
    const convertToTwoDigits = date => ('0' + date).slice(-2);

    /* CLASSES */
    let contentClass = [classes.Content],
        dayButtonsClass = [classes.DayButtons];

    props.showDate ? contentClass.push(classes.Show) :
        dayButtonsClass.push(classes.Activate);

    return (
        <div className={classes.DatePicker}>
            <div className={classes.Title}>
                <div onClick={prevDay} className={dayButtonsClass.join(' ')}>
                    <h5 >{'<'}</h5>
                    <h6>Prev</h6>
                </div>
                
                <h3 onClick={props.onToggle}>{
                    `${MONTH[selectedDate.getMonth()]} ${selectedDate.getDate()} ${selectedDate.getFullYear()}`
                }</h3>

                <div onClick={nextDay} className={dayButtonsClass.join(' ')}>
                    <h6>Next</h6>
                    <h5>{'>'}</h5>
                </div>
            </div>

            <div className={contentClass.join(' ')}>
                <div className={classes.Month}>
                    <p onClick={prevMonth}>{'<'}</p>
                    <h4>{MONTH[selectedMonth]} {selectedYear}</h4>
                    <p onClick={nextMonth}>{'>'}</p>
                </div>

                <div className={classes.Day}>
                    {DAY.map(item => <p key={item}>{item.slice(0, 2)}</p>)}
                </div>

                <div className={classes.Date}>
                    {dates && dates.map((item, index) => {
                        let dateClass;
                        if (isSelectedDate(item)) dateClass = classes.Active;
                        if (!item) return <p key={`${item}-${index}`}>{item}</p>;
                        return (
                            <p onClick={ changeDate.bind(this, item)} key={`${item}-${index}`} className={dateClass}>{item}</p>);
                    })}
                </div>
            </div>

        </div>
    );
}

export default DatePicker;