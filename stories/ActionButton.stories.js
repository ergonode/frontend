/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ActionButton from '@UI/components/ActionButton/ActionButton';

export default {
    title: 'Components API/ActionButton',
    component: ActionButton,
    argTypes: {
        theme: {
            control: {
                type: 'select',
                options: Object.values(THEME),
            },
            defaultValue: THEME.PRIMARY,
        },
        size: {
            control: {
                type: 'select',
                options: [
                    SIZE.TINY,
                    SIZE.SMALL,
                    SIZE.REGULAR,
                ],
            },
            defaultValue: SIZE.REGULAR,
        },
        title: '',
        disabled: false,
        dismissible: true,
        options: [],
        fixedContent: false,
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<ActionButton v-bind="$props" />',
    components: {
        ActionButton,
    },
    props: Object.keys(argTypes),
});

export const Primary = Template.bind({});
Primary.args = {
    theme: THEME.PRIMARY,
    size: SIZE.REGULAR,
    title: 'Take an action',
    options: [
        'First option',
        'Second option',
        'Third option',
    ],
};

export const Secondary = Template.bind({});
Secondary.args = {
    theme: THEME.SECONDARY,
    size: SIZE.REGULAR,
    title: 'Take an action',
    options: [
        'First option',
        'Second option',
        'Third option',
    ],
};

export const SecondaryPlain = Template.bind({});
SecondaryPlain.args = {
    theme: THEME.SECONDARY_PLAIN,
    size: SIZE.REGULAR,
    title: 'Take an action',
    options: [
        'First option',
        'Second option',
        'Third option',
    ],
};

export const Destructive = Template.bind({});
Destructive.args = {
    theme: THEME.DESTRUCTIVE,
    size: SIZE.REGULAR,
    title: 'Take an action',
    options: [
        'First option',
        'Second option',
        'Third option',
    ],
};

export const Tiny = Template.bind({});
Tiny.args = {
    theme: THEME.PRIMARY,
    size: SIZE.TINY,
    title: 'Take an action',
    options: [
        'First option',
        'Second option',
        'Third option',
    ],
};

export const Small = Template.bind({});
Small.args = {
    theme: THEME.PRIMARY,
    size: SIZE.SMALL,
    title: 'Take an action',
    options: [
        'First option',
        'Second option',
        'Third option',
    ],
};

export const Regular = Template.bind({});
Regular.args = {
    theme: THEME.PRIMARY,
    size: SIZE.REGULAR,
    title: 'Take an action',
    options: [
        'First option',
        'Second option',
        'Third option',
    ],
};
