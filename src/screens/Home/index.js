import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class Home extends Component {

    state = {
        
    };
    
    componentDidMount() {
        
    }

    render() {
        console.log(this.props.token);
        
        return (
            <div>

                { !this.props.token && <Redirect to='/signin' />}

                <p>HomeScreen</p>

                <p>Show what meals is for today</p>
                <p>Lunch: PEanut butter: 1, Egg: 2</p>

                <p>maybe add datepicker</p>
                <p>to show what meal is next day etc...</p>
            </div>
        );
    };
};

const mapStateToProps = state => ({ 
    token: state.auth.token, 
});

const mapDispatchToProps = dispatch =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps) (Home);