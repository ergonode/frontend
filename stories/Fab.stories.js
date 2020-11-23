/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Fab from '@UI/components/Fab/Fab';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    title: 'Components API/Fab',
    component: Fab,
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
    template: `
        <Fab v-bind="$props">
            <template #icon="{ color }">
                <IconAdd :fill-color="color" />
            </template>
        </Fab>
    `,
    components: {
        Fab,
        IconAdd,
    },
    props: Object.keys(argTypes),
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
