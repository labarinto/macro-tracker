import React from 'react';
import classes from './ItemField.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { addQty, subQty, changeQty, editQty, addRemoveFav } from '../../store/actions';

const ItemField = (props) => {
    console.log('RENDERING ITEM FIELD');
    /* VARS */
    let foodId = `${props.category} ${props.foodKey}`; //space since _ is used in id generator in firebase
    let fieldClass = [classes.ItemField], 
        heartClass = [classes.Heart, classes.Item]; 
    let isActive = props.activeFood === foodId,
        isFav = props.favs && props.favs[props.foodKey],
        inputRef;

    if (isActive) {
        fieldClass.push(classes.Active);
        inputRef = props.inputRef;
    };
    if (isFav) heartClass.push(classes.Faved);

    const inputHandler = (event) => props.changeQty(foodId, event.target.value);
    const favHandler = () => props.addRemoveFav(props.userId, props.token, props.foodKey);

    const { name, unitValue, unit, calories, protein, carbs, fat, qty } = props.item;
    return (
        <div className={fieldClass.join(' ')}>
            <div className={classes.Macros}>
                
                <FontAwesomeIcon icon='heart' size="lg" color="gray" opacity={.5} 
                    className={heartClass.join(' ')} onClick={favHandler}
                />

                <div className={classes.Item}>
                    <h3>{name}</h3>
                    <h5>({unitValue.toFixed(0)}{unit})</h5>
                </div>

                <p className={classes.Item}>{calories.toFixed(2)}</p>
                <p className={classes.Item}>{protein.toFixed(2)}</p>
                <p className={classes.Item}>{carbs.toFixed(2)}</p>
                <p className={classes.Item}>{fat.toFixed(2)}</p>
                <div className={classes.Item}>
                    <div className={classes.QtyInput}>
                        <input
                            className={classes.Input}
                            ref={inputRef}
                            disabled={!isActive}
                            onChange={inputHandler}
                            value={qty}
                        />
                        {props.showQtyControls && <button
                            onClick={props.editQty.bind(this, foodId)}>
                                {isActive ? 'SAVE' : 'EDIT'}
                        </button>}
                    </div>
                </div>
            </div>

            {props.showQtyControls && <div className={classes.QtyControls}>
                <div>
                    <h1 onClick={props.addQty.bind(this, foodId)}>+</h1>
                    <h1 onClick={props.subQty.bind(this, foodId)}>-</h1>
                </div>
                
                {props.showRemove ? (
                    <button onClick={props.onRemoveItem.bind(this, foodId)}>Remove</button>
                ) : (
                    <button onClick={(props.onAddItem.bind(this, props.foodKey))}>Add to {props.category}</button>
                )}
            </div>}
        </div>
    )
};

const mapStateToProps = ({ auth, fav, foods }) => ({
    userId: auth.userId,
    token: auth.token, 
    favs: fav.favs,
    activeFood: foods.activeFood,
});

const mapDispatchToProps = { addQty, subQty, changeQty, editQty, addRemoveFav };

export default connect(mapStateToProps, mapDispatchToProps)(ItemField);