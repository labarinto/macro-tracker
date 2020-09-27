export const signupForm = {
    name: {
        id: 1,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: true,
            isString: true,
        },
        valid: true,
    },
    email: {
        id: 2,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'Your Email'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true,
        },
        valid: true,
    },
    password: {
        id: 3,
        inputType: 'input',
        config: {
            type: 'password',
            placeholder: 'Your Password',
        },
        value: '',
        validation: {
            required: true,
            minLength: 8,
        },
        valid: true,
    },
    confirmPass: {
        id: 4,
        inputType: 'input',
        config: {
            type: 'password',
            placeholder: 'Confirm Password',
        },
        value: '',
        validation: {
            required: true,
            minLength: 8,
            confirmPass: true,
        },
        valid: true,
    }
};