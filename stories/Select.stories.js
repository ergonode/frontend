/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import Select from '@UI/components/Select/Select';

export default {
    title: 'Components API/Select',
    component: Select,
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
        errorMessages: '',
        required: false,
        autofocus: false,
        fixedContent: true,
        clearable: true,
        multiselect: false,
        searchable: false,
        disabled: false,
        searchValue: '',
        placeholder: '',
        dataCy: '',
        options: [],
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<Select v-bind="$props" />',
    components: {
        Select,
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
    fixedContent: true,
    placeholder: '',
    dataCy: '',
    options: [
        1,
        2,
        3,
    ],
};
