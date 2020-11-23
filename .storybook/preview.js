/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

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
}
