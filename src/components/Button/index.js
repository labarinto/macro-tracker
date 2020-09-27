import React from 'react';
import classes from './style.module.css';

const Button = (props) => {

    return (
        <div className={classes.Button}>
            <button {...props} className={classes.Button}>
                {props.children}
            </button>
        </div>
    )
};

export default Button;