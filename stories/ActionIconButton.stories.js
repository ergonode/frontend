/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ActionIconButton from '@UI/components/ActionIconButton/ActionIconButton';
import IconSettings from '@UI/components/Icons/Actions/IconSettings';

export default {
    title: 'Components API/ActionIconButton',
    component: ActionIconButton,
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
        disabled: false,
        dismissible: true,
        options: [],
        fixedContent: false,
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: `
        <ActionIconButton v-bind="$props">
            <template #icon="{ color }">
                <IconSettings :fill-color="color" />
            </template>
        </ActionIconButton>
    `,
    components: {
        ActionIconButton,
        IconSettings,
    },
    props: Object.keys(argTypes),
});

export const Primary = Template.bind({});
Primary.args = {
    theme: THEME.PRIMARY,
    size: SIZE.REGULAR,
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
    options: [
        'First option',
        'Second option',
        'Third option',
    ],
};
