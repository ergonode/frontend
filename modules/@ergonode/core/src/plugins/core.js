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
    inject('openModal', (payload) => {
        app.store.dispatch('core/openModal', payload);
    });
    inject('getModal', (key) => {
        const {
            modals,
        } = app.store.state.core;

        return modals[key];
    });
    inject('closeModal', (key) => {
        app.store.dispatch('core/closeModal', key);
    });
    inject('getExtendedFormByType', ({
        key, type = null,
    }) => {
        const forAllTypes = '__ALL';
        const components = [];
        const extendedComponents = app.$getExtendedComponents(key);

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
