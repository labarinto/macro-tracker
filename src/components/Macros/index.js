import React from 'react';
import classes from './style.module.css';
import { getTotalMacrosDay, getTotalMacrosCategory } from '../../shared/utility';

const Macros = (props) => {

    let macros = [], totalMacros = {};
    if (props.macros) {
        macros = Object.keys(props.macros);
        if (props.showTotal) totalMacros = getTotalMacrosDay(props.foods, macros);
        else totalMacros = getTotalMacrosCategory(props.foods, macros);
    };

    const renderMacros = (item) => 
        props.showTotal ? 
            <p>{item}: {Math.round(
                props.showCalories ? totalMacros[item] : totalMacros[item] - props.macros[item]
                )}</p>
            : 
            <p>{item}: {Math.round(totalMacros[item])}</p>;

    return (
        <div className={classes.Macros}>
            {props.macros && ['calories', 'protein', 'carbs', 'fat'].map(item => (
                <div key={item}>
                    { renderMacros(item) }
                </div>
            ))}
        </div>
    )
};

export default Macros;