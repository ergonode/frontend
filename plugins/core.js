/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({ app }, inject) => {
    inject('setLoader', (key) => {
        app.store.dispatch('core/setLoader', key);
    });
    inject('removeLoader', (key) => {
        app.store.dispatch('core/removeLoader', key);
    });
    inject('isLoaded', (key) => {
        const { loaders } = app.store.state.core;
        return !loaders[key];
    });
};
