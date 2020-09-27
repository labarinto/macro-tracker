import React from 'react';
import classes from './style.module.css';

const Card = (props) => {

    return (
        <div className={classes.Card}>
            <div className={classes.Content}>
                {props.children}
            </div>
        </div>
    );
};

export default Card;