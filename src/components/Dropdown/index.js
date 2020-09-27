import React from 'react';
import classes from './style.module.css';
import Macros from '../Macros';

const Dropdown = (props) => {
    const contentClass = [classes.Content];
    if (props.show) contentClass.push(classes.Show);
    const optionsHandler = option => props.optionClicked && props.optionClicked(option);
    return (
        <div className={classes.Dropdown}>
            <button onClick={props.clicked} className={classes.Button} disabled={props.disabled}>
                {props.children}
            </button>

            {/* Hidden Content */}
            <div className={contentClass.join(' ')}>
                <div className={classes.Macros}>
                    <Macros foods={props.foods} macros={props.macros} />
                </div>

                { props.options.length > 0 ? props.options.map( option => (
                    <div key={option.id} className={classes.Item}>
                        <p  onClick={optionsHandler.bind(this, option.id)}>
                            {option.name} - ({option.qty})
                        </p>
                        <button onClick={props.onRemove.bind(this, option.id)}>Remove</button>
                    </div>
                )) : 
                <p>Empty</p> }
            </div>
        </div>
    )
};

export default Dropdown;