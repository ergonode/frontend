/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setTemplatesSectionElements: (state, payload) => {
        state.templatesSectionElements = payload;
    },
    setTemplatesSection: (state, payload) => {
        state.templatesSection = payload;
    },
    clearStorage: (state) => {
        state.templatesSection = [];
        state.templatesSectionElements = [];
    },
};
