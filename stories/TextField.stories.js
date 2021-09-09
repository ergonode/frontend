/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import TextField from '@UI/components/TextField/TextField';

export default {
    title: 'Components API/TextField',
    component: TextField,
    argTypes: {
        input: {
            control: {
                type: 'object',
            },
            defaultValue: {
                type: 'text',
            },
        },
        size: {
            control: {
                type: 'select',
                options: [
                    SIZE.SMALL,
                    SIZE.REGULAR,
                ],
            },
            defaultValue: SIZE.REGULAR,
        },
        alignment: {
            control: {
                type: 'select',
                options: Object.values(ALIGNMENT),
            },
            defaultValue: ALIGNMENT.LEFT,
        },
        type: {
            control: {
                type: 'select',
                options: Object.values(INPUT_TYPE),
            },
            defaultValue: INPUT_TYPE.SOLID,
        },
        value: '',
        label: '',
        hint: '',
        errorMessages: '',
        required: false,
        autofocus: false,
        disabled: false,
        placeholder: '',
        dataCy: '',
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<TextField v-bind="$props" />',
    components: {
        TextField,
    },
    props: Object.keys(argTypes),
});

export const Primary = Template.bind({});
Primary.arrgs = {
    value: '',
    size: SIZE.REGULAR,
    alignment: ALIGNMENT.LEFT,
    type: INPUT_TYPE.SOLID,
    label: '',
    hint: '',
    errorMessages: '',
    required: false,
    autofocus: false,
    placeholder: '',
    dataCy: '',
};
