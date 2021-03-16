/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import LinkButton from '@UI/components/LinkButton/LinkButton';

export default {
    title: 'Components API/LinkButton',
    component: LinkButton,
    argTypes: {
        title: {
            control: {
                type: 'text',
            },
            defaultValue: 'Link',
        },
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<LinkButton v-bind="$props" />',
    components: {
        LinkButton,
    },
    props: Object.keys(argTypes),
});

export const Title = Template.bind({});
Title.arrgs = {
    title: 'Link me',
};
