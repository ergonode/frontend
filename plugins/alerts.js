/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

Vue.prototype.$addAlert = (store, data = {}) => {
    store.dispatch('alerts/addAlert', data);
};
