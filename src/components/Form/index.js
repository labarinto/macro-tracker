import React, { Component } from 'react';
import classes from './style.module.css';
import { Button, Input } from '../../components';
import { checkValidity } from '../../shared/utility';

class Form extends Component {

    state = {
        form: this.props.formState,
        activeInput: '',
        errors: {},
        oldValue: '',
    };

    componentDidMount() {
        //this.setState({...this.state, form: this.props.formState});
    }

    componentDidUpdate() {
        if (this.props.activateClear) {
            const selectedInput = this.props.inputRef.current;
            if (selectedInput) { selectedInput.focus(); selectedInput.value = ''; }
        };
    };

    inputChanged = (name, event) => {
        this.props.onAuthStart && this.props.onAuthStart();
        this.props.inputRefCheck && this.props.inputRefCheck();

        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: {
                    ...this.state.form[name],
                    value: event.target.value,
                    valid: true,
                }
            },
            activeInput: name
        })
    }

    inputBlurred = (name) => {

        let value = this.state.form[name].value;
        // this clears the [name]: value, since when a string is typed, 
        // the program will clear it but the state will still store the first
        // digit entered into the state,
        if (this.props.inputRef && 
            (this.props.inputRef.current && !this.props.inputRef.current.value)) value = '';

        if (!value && this.state.oldValue) value = this.state.oldValue;
        
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: {
                    ...this.state.form[name],
                    value: value,
                }
            },
            activeInput: ''
        });
    };

    inputClicked = (name) => {
        
        let oldValue = '';
        if (this.props.activateClear) oldValue = this.state.form[name].value;

        this.setState({
            ...this.state,
            activeInput: name,
            oldValue,
        });
        
    };

    formHandler = (event) => {
        event.preventDefault();
        let errors = false, updatedForm = {...this.state.form};

        Object.entries(this.state.form).forEach( ([id, input]) => {
            let hasError = checkValidity(id, input.value, input.validation ); // (name, value, rules)
            //confirm Pass
            if (id === 'confirmPass') 
                hasError = checkValidity(id, input.value, input.validation, this.state.form.password.value);
            //
            if (hasError) {
                updatedForm = { ...updatedForm, [id]: { ...updatedForm[id], valid: false }};
                errors = { ...errors, ...hasError };
            };
        });

        this.setState({ ...this.state, form: updatedForm, errors });
        // callback to props parent
        if (!errors) this.props.onSubmit(updatedForm);
    };

    render() {
        //console.log('RENDERING');

        let loginFailed;
        if(this.props.loginFailed) 
            loginFailed = <p className={classes.Error}>Incorrect Details! Please try again!</p>;

        const { form } = this.state;
        const formKeys = Object.keys(form), formValues = Object.values(form);

        const formOrder = []; //Keeps input order in safari
        for(let i=1; i <= formKeys.length; i++) {
            formOrder.push(i);
        };

        return (
            <form onSubmit={this.formHandler}>
                <div className={this.props.style}>
                    {formOrder.map( id => {
                        const nameIndex = formValues.findIndex( input => input.id === id);
                        const name = formKeys[nameIndex];

                        return <div key={name} className={this.props.inputStyle}>
                            <Input
                                value={form[name].value}
                                inputType={form[name].inputType}
                                config={form[name].config}
                                label={this.props.label ? this.props.label[name] : name}
                                isValid={form[name].valid}
                                inputRef={this.props.inputRef}
                                onChange={this.inputChanged.bind(this, name)}
                                onBlur={this.inputBlurred.bind(this, name)}
                                onClick={this.inputClicked.bind(this, name)}
                                errorMessage={this.state.errors[name]}
                                isActive={this.state.activeInput === name}
                            />
                        </div>
                    })}
                </div>
                {loginFailed}
                <Button>{this.props.buttonTitle}</Button>
            </form>
        );
    };
};

export default Form;