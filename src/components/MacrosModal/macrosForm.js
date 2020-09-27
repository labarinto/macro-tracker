export const macrosForm = {
    calories: {
        id: 1,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'Calories',
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
        },
        valid: true,
    },
    protein: {
        id: 2,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'Protein',
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
        },
        valid: true,
    },
    carbs: {
        id: 3,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'Carbs',
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
        },
        valid: true,
    },
    fat: {
        id: 4,
        inputType: 'input',
        config: {
            type: 'text',
            placeholder: 'Fat',
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
        },
        valid: true,
    },
};