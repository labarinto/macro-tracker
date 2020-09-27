import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import { 
    Account, Overview, Search, Home, 
    Signin, Signup
} from '../screens';

import Header from './Header';

class RootNavigator extends Component {

    constructor(props) {
        super(props);
        this.props.initAuth();
        this.props.initFoodBaseValues();
    }
    
    render() {
        if (this.props.userId) {
            this.props.initFav(this.props.userId, this.props.token);
            this.props.initMacros(this.props.userId, this.props.token);
            
        };
        
        const foodBase = Object.values(this.props.foodBaseValues);
        return (
            <BrowserRouter>
                <Header token={this.props.token} />

                {this.props.token && foodBase.length > 0 ?
                    <Switch>
                        <Route path="/account" component={Account} />
                        <Route path="/overview" component={Overview} />
                        <Route path="/search" component={Search} />
                        <Route path="/" component={Home} />
                        <Redirect to="/" />
                    </Switch>
                    :
                    <Switch>
                        <Route path="/signup" component={Signup} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/" component={Home} />
                    </Switch>
                }
            </BrowserRouter>
        );
    };
};

const mapStateToProps = state => ({ 
    token: state.auth.token, 
    userId: state.auth.userId,
    foodBaseValues: state.foods.foodBaseValues,
});

const mapDispatchToProps = dispatch =>
    ({
        initAuth: () => dispatch(actions.initAuth()),
        initFoodBaseValues: () => dispatch(actions.initFoodBaseValues()),
        initFav: (userId, token) => dispatch(actions.initFav(userId, token)),
        initMacros: (userId, token) => dispatch(actions.initMacros(userId, token)),
    });

export default connect(mapStateToProps, mapDispatchToProps) (RootNavigator);