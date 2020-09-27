import React from 'react';
import classes from './style.module.css';
import { NavLink } from 'react-router-dom';
import Links from '../Links';

const Header = (props) => {

    return (
        <div className={classes.Header}>
            <div className={classes.Logo}>
                <NavLink to="/" exact activeClassName={classes.active}>
                    <h3>MACRO TRACKER</h3>
                    <p>helping you track your macros!</p>
                </NavLink>
            </div>

            <Links token={props.token} />
        </div>

    )
};

export default Header;