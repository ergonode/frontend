/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// import Button from '@UI/components/Button/Button';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';

export default {
    title: 'Components API/Button',
    component: Button,
    argTypes: {
        theme: {
            control: {
                type: 'select',
                options: Object.values(THEME),
            },
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
        },
        title: '',
        disabled: false,
        floating: {
            control: {
                type: 'object',
            },
        },
    },
};

const Template = (args, {
    argTypes,
}) => ({
    props: Object.keys(argTypes),
    components: {
        Button,
    },
    template: '<Button v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
    theme: THEME.PRIMARY,
    size: SIZE.REGULAR,
    title: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    theme: THEME.SECONDARY,
    size: SIZE.REGULAR,
    title: 'Button',
};

export const SecondaryPlain = Template.bind({});
SecondaryPlain.args = {
    theme: THEME.SECONDARY_PLAIN,
    size: SIZE.REGULAR,
    title: 'Button',
};

export const Destructive = Template.bind({});
Destructive.args = {
    theme: THEME.DESTRUCTIVE,
    size: SIZE.REGULAR,
    title: 'Button',
};

export const Tiny = Template.bind({});
Tiny.args = {
    theme: THEME.PRIMARY,
    size: SIZE.TINY,
    title: 'Button',
};

export const Small = Template.bind({});
Small.args = {
    theme: THEME.PRIMARY,
    size: SIZE.SMALL,
    title: 'Button',
};

export const Regular = Template.bind({});
Regular.args = {
    theme: THEME.PRIMARY,
    size: SIZE.REGULAR,
    title: 'Button',
};
