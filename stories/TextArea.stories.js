/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import TextArea from '@UI/components/TextArea/TextArea';

export default {
    title: 'Components API/TextArea',
    component: TextArea,
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
        disabled: false,
        placeholder: '',
        resize: 'auto',
        dataCy: '',
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<TextArea v-bind="$props" />',
    components: {
        TextArea,
    },
    props: Object.keys(argTypes),
});

export const Primary = Template.bind({});
Primary.arrgs = {
    value: '',
    size: SIZE.REGULAR,
    height: '200px',
    alignment: ALIGNMENT.LEFT,
    type: INPUT_TYPE.SOLID,
    label: '',
    hint: '',
    errorMessages: '',
    required: false,
    autofocus: false,
    placeholder: '',
    resize: 'auto',
    dataCy: '',
};
