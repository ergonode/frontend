/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import Slider from '@UI/components/Slider/Slider';

export default {
    title: 'Components API/Slider',
    component: Slider,
    argTypes: {
        value: 0,
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<Slider v-bind="$props" />',
    components: {
        Slider,
    },
    props: Object.keys(argTypes),
});

export const Sliding = Template.bind({});
Slider.arrgs = {
    value: 0,
};
