import React from 'react';
import classes from './style.module.css';
import { Macros, MacrosModal } from '../../../components';

const DashBoard = (props) => {

    let hasMacros = true;
    props.macros && Object.values(props.macros).forEach( value => {
        if (value <= 0) hasMacros = false;
    })

    return (
        <div className={classes.DashBoard}>

            <p>Needed:</p>
            { hasMacros && <Macros
                macros={props.macros}
                foods={props.foodLists}
                showTotal
            />}

            <p>Current</p>
            <Macros
                macros={props.macros}
                foods={props.foodLists}
                showTotal
                showCalories
            />

            <p>Pie chart showing calories</p>

            <MacrosModal macros={props.macros} onSubmit={props.onSubmitMacros} />

            <p>Choose a category and start adding!</p>
        </div>
    )

};

export default DashBoard;