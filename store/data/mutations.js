/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setState: (state, { key, value }) => {
        state[key] = value;
    },
    clearStorage: (state) => {
        state.languages = {};
        state.currencies = {};
        state.units = {};
        state.attrTypes = {};
        state.attrGroups = [];
        state.dateFormats = {};
        state.imageFormats = {};
    },
};
