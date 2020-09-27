import React from 'react';
import classes from './style.module.css';
import Card from '../Card';
import Button from '../Button';

const Modal = (props) => {

    let modalClass = [classes.Modal];
    if (props.showModal) modalClass.push(classes.Show);

    return (
        <div className={modalClass.join(' ')}>
            <div className={classes.Content}>
                <Card>
                    <div className={classes.Header}>
                        <p>{props.title}</p>
                        <p onClick={props.onClose} className={classes.Close}>&times;</p>
                    </div>

                    {props.children}

                    <div className={classes.Footer}>
                        
                        <Button onClick={props.onClose}>CANCEL, KEEP IT</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
};

export default Modal;