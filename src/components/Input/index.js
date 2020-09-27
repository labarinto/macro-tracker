import React from 'react';
import classes from './style.module.css';

const Input = (props) => {

    let input;
    const inputClasses = [classes.InputElement];
    if (!props.isValid) inputClasses.push(classes.Invalid);
    
    switch (props.inputType) {
        case('input'):
            input = <input 
                className={inputClasses.join(' ')}
                {...props.config}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onClick={props.onClick}
                ref={props.isActive ? props.inputRef : null}
            />
            break;
        case ('select'):
            input = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.onChange}
                >
                    {
                        props.config.options && props.config.options.map( option => (
                            <option value={option.value} key={option.value}>
                                {option.display}
                            </option>
                        ))
                    }
                </select>
            )
            break;
        default:
            input = <input 
                className={inputClasses.join(' ')}
                {...props.config}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onClick={props.onClick}
                ref={props.isActive ? props.inputRef : null}
            />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            <div className={classes.Error}>{props.errorMessage}</div>
            {input}
        </div>
    )

}

export default Input;