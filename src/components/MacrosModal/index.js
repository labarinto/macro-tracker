import React, { Component } from 'react';
import { Modal, Form, Button } from '..';
import { macrosForm } from './macrosForm';

class MacrosModal extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = { showModal: false };
    };

    formSubmitted = (macros) => {
        let newEntry = {}, macrosArray = Object.entries(macros);

        if (macrosArray.length > 0) {
            macrosArray.forEach( ([key, input]) => {
                newEntry = {...newEntry, [key]: input.value }
            });

            this.props.onSubmit(newEntry);
        }
        this.setState({ ...this.state, showModal: false});
    };

    modalToggled = () => {
        this.props.macros && Object.keys(macrosForm).forEach( key => {
            if (this.props.macros[key]) macrosForm[key].value = this.props.macros[key];
        });

        this.setState({ ...this.state, showModal: !this.state.showModal})
    };
    
    render() {
        return (
            <div>
                <Button onClick={this.modalToggled}>
                    {this.props.macros ? `CHANGE MACROS GOALS` : `ADD MACROS GOALS` }
                </Button>

                {this.state.showModal && <Modal
                    showModal={this.state.showModal}
                    title='My Macro'
                    onClose={this.modalToggled}
                >
                    <p>Go on a macros calculator, and enter the details here to start tracking your macros.</p>

                    <Form
                        formState={macrosForm}
                        buttonTitle={this.props.macros ? `UPDATE MACROS` : `ADD MACROS`}
                        onSubmit={this.formSubmitted}
                        inputRef={this.inputRef}
                        activateClear
                    />
                </Modal>
                }
            </div>
        );
    }
};

export default MacrosModal;