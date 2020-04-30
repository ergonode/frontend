/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';

export const directives = {
    install(_vue) {
        _vue.directive('test-id-generator', {
            bind(el, binding) {
                const testId = binding.value
                    .replace(/\W/g, '')
                    .toUpperCase();
                el.setAttribute('data-testid', testId);
            },
        });
    },
};

Vue.use(directives);
