/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    setDisabledScopeElement: ({
        state,
        commit,
    }, {
        scope = 'default',
        disabledElement,
    }) => {
        if (typeof state.disabledElements[scope] === 'undefined') {
            commit(types.SET_DISABLED_ELEMENT_SCOPE, scope);
        }

        if (typeof state.disabledElements[scope][disabledElement.languageCode] === 'undefined') {
            commit(types.SET_DISABLED_ELEMENT_SCOPE_LANGUAGE, {
                scope,
                languageCode: disabledElement.languageCode,
            });
        }

        commit(types.SET_DISABLED_SCOPE_ELEMENT, {
            scope,
            ...disabledElement,
        });
    },
    setDisabledScopeElements: ({
        state,
        commit,
    }, {
        scope = 'default',
        disabledElements,
    }) => {
        commit(types.SET_DISABLED_ELEMENTS, {
            ...state.disabledElements,
            [scope]: disabledElements,
        });
    },
    removeDisabledScopeElement: ({
        commit,
    }, payload) => {
        commit(types.REMOVE_DISABLED_SCOPE_ELEMENT, payload);
    },
    removeDisabledScopeElements: ({
        commit,
    }, payload) => {
        commit(types.REMOVE_DISABLED_SCOPE_ELEMENTS, payload);
    },
    /**
     * @deprecated since 1.1.0
     */
    setDisabledElement: ({
        commit,
    }, payload) => {
        commit(types.SET_DISABLED_ELEMENT, payload);
    },
    /**
     * @deprecated since 1.1.0
     */
    setDisabledElements: ({
        commit,
    }, disabledElements) => {
        commit(types.SET_DISABLED_ELEMENTS, disabledElements);
    },
    /**
     * @deprecated since 1.1.0
     */
    removeDisabledElement: ({
        commit,
    }, payload) => {
        commit(types.REMOVE_DISABLED_ELEMENT, payload);
    },
};
