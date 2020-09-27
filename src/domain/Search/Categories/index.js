import React from 'react';
import classes from './style.module.css';
import { Dropdown } from '../../../components';

const Categories = (props) => {
    return (
        <div className={classes.MealOptions}>
            {['breakfast', 'snacks', 'lunch', 'dinner'].map(category => {

                let mealOptionClass = [classes.MealOption],
                    isActiveOption = false,
                    label = 'Show',
                    optionsForDropdown = [];

                if (props.activeCategory === category) {
                    mealOptionClass.push(classes.Active);
                    isActiveOption = true;
                    if (props.showDropdown) label = 'Hide';
                }

                const foods = props.categories[category];

                /* Alter array to suit dropdown options*/
                if (foods) optionsForDropdown = Object.entries(foods).map( 
                    ([foodId, foodInfo]) => ({
                        ...optionsForDropdown,
                        id: foodId, name: foodInfo.name, qty: foodInfo.qty
                    })
                );

                return (
                    <div key={category} className={mealOptionClass.join(' ')}>
                        <Dropdown
                            clicked={props.dropdownClicked}
                            options={optionsForDropdown}
                            show={props.showDropdown && isActiveOption}
                            disabled={!isActiveOption}
                            onRemove={props.onRemoveItem}
                            foods={foods}
                            macros={props.macros}
                        >{label}</Dropdown>

                        <button onClick={props.clicked.bind(this, category)}>
                            {category.toUpperCase()} - Items: {optionsForDropdown.length}
                        </button>
                    </div>
                )
            }) }
        </div>
    )
}

export default Categories;