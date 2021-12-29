/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import ColorPicker from '@UI/components/ColorPicker/ColorPicker';

export default {
    title: 'Components API/ColorPicker',
    component: ColorPicker,
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
    template: '<ColorPicker v-bind="$props" />',
    components: {
        ColorPicker,
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
        '#ddd',
        '#ea2de2',
        '#edd311',
    ],
};
