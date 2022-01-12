/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import '!style-loader!css-loader!sass-loader!./reset-storybook.scss';

import {
    addDecorator,
} from '@storybook/vue';

addDecorator((story) => {
    document.body.classList.add('app');
    document.body.style.position = 'relative';
    return story();
});

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
}
