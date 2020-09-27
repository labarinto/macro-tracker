import React from 'react';
import classes from './style.module.css';
import DayPanel from './DayPanel';

const DayPanels = (props) => {

    return (
        <div className={classes.DayPanels}>
            {
                props.week.map( date =>
                    <DayPanel
                        key={date}
                        date={date}
                        foods={props.foodWeekLists[date]}
                        activeModal={ date === props.activeModal }
                        openModal={props.openModal.bind(this, date)}
                        qtyInputRef={props.qtyInputRef}
                        editMode = {props.editMode}
                        inEditMode ={props.inEditMode}
                        onRemoveItem={props.onRemoveItem}
                    />
                )
            }
        </div>
    )
}

export default DayPanels;