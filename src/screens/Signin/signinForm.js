export const signinForm = {
    email: {
        id: 1,
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
        id: 2,
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
    }
};