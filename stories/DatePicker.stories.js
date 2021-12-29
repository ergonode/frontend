/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import DatePicker from '@UI/components/DatePicker/DatePicker';
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';

export default {
    title: 'Components API/DatePicker',
    component: DatePicker,
    argTypes: {
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
        format: DEFAULT_FORMAT,
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
    template: '<DatePicker v-bind="$props" />',
    components: {
        DatePicker,
    },
    props: Object.keys(argTypes),
});

export const Primary = Template.bind({});
Primary.arrgs = {};
