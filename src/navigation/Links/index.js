import React from 'react';

import classes from './style.module.css';
import Link from './Link.js';

const Links = (props) => {

    return (
        <ul>
            { props.token ? <div className={classes.Links}>
                    <Link to="/overview" exact>Overview</Link>
                    <Link to="/search" exact>Search</Link>
                    <Link to="/account" exact>Account</Link>
                </div> : <div className={classes.Links}>
                    <Link to="/signin" exact>Sign In</Link>
                    <Link to="/signup" exact>Sign Up</Link>
                </div>
            }
        </ul>
    )
}

export default Links;