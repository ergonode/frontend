/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import RichTextEditor from '@UI/components/RichTextEditor/RichTextEditor';

export default {
    title: 'Components API/RichTextEditor',
    component: RichTextEditor,
    argTypes: {
        value: '',
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
        height: '200px',
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
        label: '',
        hint: '',
        errorMessages: '',
        required: false,
        autofocus: false,
        placeholder: '',
        dataCy: '',
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<RichTextEditor v-bind="$props" />',
    components: {
        RichTextEditor,
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
    dataCy: '',
};
