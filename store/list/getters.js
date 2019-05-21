/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    elementByCode: state => (code) => {
        let lookingElement = null;

        Object.values(state.elements).some(groupElements => groupElements.some((element) => {
            if (element.code === code) {
                lookingElement = { ...element };
                return true;
            }
            return false;
        }));

        return lookingElement;
    },
    isElementDisabled: (state, getters, rootState) => (id, languageCode) => {
        if (!Object.keys(state.draggedElementsStore).length) return false;
        const { storeName, stateName, idName } = state.draggedElementsStore;
        const data = rootState[storeName][stateName];
        return data.some((element) => {
            let selectedId = element;
            for (let i = 0; i <= idName.length; i += 1) {
                if (selectedId[idName[i]]) {
                    selectedId = selectedId[idName[i]];
                }
            }
            return element.language
                ? selectedId === id && element.language === languageCode
                : selectedId === id;
        });
    },
};
