import React from 'react';
import classes from './DayPanel.module.css';
import { connect } from 'react-redux';

import { ItemFields, Macros } from '../../../components';
import * as actions from '../../../store/actions';

//const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DayPanel = (props) => {
    /*let calories = 0, protein = 0, carbs = 0, fat = 0;

    props.foods && Object.values(props.foods).map(foods => {
        Object.values(foods).map(food => {
            calories += food.calories;
            protein += food.protein;
            carbs += food.carbs;
            fat += food.fat;
        });
    });*/

    let moreClasses = [classes.MoreInfo];
    if (props.activeModal) moreClasses.push(classes.Show);

    return (
        <div className={classes.DayPanel}>

            <div className={classes.PanelView} >
                <p>{new Date(props.date).toDateString().slice(0, 10)}</p>

                <div className={classes.Description}>
                    <div className={classes.Macros} onClick={props.openModal}>
                        <Macros
                            macros={props.macros}
                            foods={props.foods}
                            showTotal
                        />
                    </div>

                    { props.activeModal && 
                        <div className={classes.Edit} onClick={props.editMode}>
                            {props.inEditMode ? 'SAVE CHANGES' : 'EDIT MODE'}
                        </div>
                    }
                </div>
            </div>

            <div className={moreClasses.join(' ')}>

                {(props.foodCategories && props.activeModal) ? Object.entries(props.foodCategories).map(([category, foods]) => {
                    return (
                        <div key={`${category}`} className={classes.Category}>
                            <p>{category}</p>
                            <Macros
                                macros={props.macros}
                                foods={foods}
                            />

                            <ItemFields
                                items={foods}
                                inputRef={props.qtyInputRef}
                                onAddItem={() => { }}
                                onRemoveItem={props.onRemoveItem}
                                category={category}
                                showQtyControls={props.inEditMode}
                                showRemove
                            />
                        </div>
                    )
                }) : (
                    <p>EMPTY</p>
                )
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        foodLists: state.foods.foodLists,
        foodBaseValues: state.foods.foodBaseValues,
        foodCategories: state.foods.foodCategories,
        loading: state.foods.loading,
        activeFood: state.foods.activeFood,
        macros: state.macros.macros,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddQty: (foodId) => dispatch(actions.addQty(foodId)),
        onSubQty: (foodId) => dispatch(actions.subQty(foodId)),
        onChangeQty: (foodId, event) => dispatch(actions.changeQty(foodId, event.target.value)),
        onEditQty: (foodId, inputRef) => dispatch(actions.editQty(foodId, inputRef)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayPanel);