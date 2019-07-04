/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    update(el, binding) {
        const { value } = binding;
        const element = el;

        if (value) element.style.visibility = 'visible';
        else element.style.visibility = 'hidden';
    },
};
