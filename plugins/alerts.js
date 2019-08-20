/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({ app }, inject) => {
    inject('addAlert', (data = {}) => {
        app.store.dispatch('alerts/addAlert', data);
    });
};
