/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import Toggler from '@UI/components/Toggler/Toggler';

export default {
    title: 'Components API/Toggler',
    component: Toggler,
    argTypes: {
        value: false,
        disabled: false,
        label: '',
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<Toggler v-bind="$props" />',
    components: {
        Toggler,
    },
    props: Object.keys(argTypes),
});

export const Toggling = Template.bind({});
Toggling.args = {
    value: true,
    label: 'Are you sure you want me to be checked?',
};
