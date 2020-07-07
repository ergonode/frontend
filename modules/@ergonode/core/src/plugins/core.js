/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({
    app,
}, inject) => {
    inject('setLoader', (key) => {
        app.store.dispatch('core/setLoader', key);
    });
    inject('removeLoader', (key) => {
        app.store.dispatch('core/removeLoader', key);
    });
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
    inject('isLoading', (key) => {
        const {
            loaders,
        } = app.store.state.core;

        return Boolean(loaders[key]);
    });
};
