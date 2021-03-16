/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import RangeSlider from '@UI/components/RangeSlider/RangeSlider';

export default {
    title: 'Components API/RangeSlider',
    component: RangeSlider,
    argTypes: {
        value: {
            control: {
                type: 'object',
            },
            defaultValue: {
                from: 0,
                to: 0,
            },
        },
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<RangeSlider v-bind="$props" />',
    components: {
        RangeSlider,
    },
    props: Object.keys(argTypes),
});

export const Sliding = Template.bind({});
Sliding.arrgs = {
    value: {
        from: 0,
        to: 0,
    },
};
