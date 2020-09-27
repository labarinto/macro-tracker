import React from 'react';
import classes from './style.module.css';
import ItemField from './ItemField';

const ItemFields = React.memo( (props) => {

    let itemEntries = [];
    if (props.items) itemEntries = Object.keys(props.items).slice(0, 10).sort();

    return (
        <div>
            {itemEntries.length > 0 ?
                <div>
                    <div className={classes.Titles}>
                        { ['Name', 'Calories', 'Protein', 'Carbs', 'Fat', 'Qty'].map( title => (
                            <h4 key={title}>{title}</h4>
                        ))}
                    </div>

                    {itemEntries.map(foodKey => {
                        return <ItemField
                            key={`${props.category}-${foodKey}`}
                            item={props.items[foodKey]}
                            foodKey={foodKey}
                            category={props.category}
                            inputRef={props.inputRef}
                            onAddItem={props.onAddItem}
                            onRemoveItem={props.onRemoveItem}
                            showQtyControls={props.showQtyControls}
                            showRemove={props.showRemove}
                        />
                    })}
                </div>
                : <p>No food found!</p>
            }
        </div>
    )
}, (prevProps, nextProps ) => {
    //console.log(nextProps);
    return (prevProps.items === nextProps.items);
});

export default ItemFields;