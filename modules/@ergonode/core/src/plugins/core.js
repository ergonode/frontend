/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject,
} from '@Core/models/objectWrapper';

export default ({
    app,
}, inject) => {
    inject('confirm', (payload) => {
        app.store.dispatch('core/addModal', {
            component: () => import('@UI/components/ConfirmModal/ConfirmModal'),
            props: payload,
        });
    });
    inject('extendedForm', ({
        key, type = null,
    }) => {
        const forAllTypes = '__ALL';
        const components = [];
        const extendedComponents = app.$getExtendSlot(key);

        if (extendedComponents && isObject(extendedComponents)) {
            if (extendedComponents[forAllTypes]) {
                components.push(...extendedComponents[forAllTypes]);
            }
            if (type && extendedComponents[type]) {
                components.push(...extendedComponents[type]);
            }
        }

        return components;
    });
};
