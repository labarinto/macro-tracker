import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Link.module.css';

const Link = (props) => (
    <li className={classes.Link}>
        <NavLink
            to={props.to}
            exact={props.exact}
            activeClassName={classes.active}
        >
            {props.children}
        </NavLink>
    </li>
);

export default Link;