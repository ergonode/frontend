/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getOption,
    removeOption,
} from '@Attributes/extends/attribute/services';
import {
    getMappedArrayOptions,
} from '@Attributes/models/attributeMapper';

import {
    types,
} from './mutations';

export default {
    async getAttributeOptions({
        commit,
    }, {
        id,
        onError = () => {},
    }) {
        try {
            const options = await getOption({
                $axios: this.app.$axios,
                id,
            });

            commit(types.INITIALIZE_OPTIONS, getMappedArrayOptions(options));
        } catch (e) {
            onError(e);
        }
    },
    addAttributeOptionKey({
        commit,
    }, index) {
        commit(types.ADD_ATTRIBUTE_OPTION_KEY, index);
    },
    removeAttributeOptionKey({
        commit, dispatch,
    }, {
        id, index,
    }) {
        if (id) {
            dispatch('removeOption', {
                id,
                index,
            });
        } else {
            commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index);
        }
    },
    removeAttributeOptions({
        commit,
    }) {
        commit(types.INITIALIZE_OPTIONS);
    },
    removeOption({
        commit,
        state,
    }, {
        id, index,
    }) {
        return removeOption({
            $axios: this.app.$axios,
            attributeId: state.id,
            optionId: id,
        }).then(() => commit(types.REMOVE_ATTRIBUTE_OPTION_KEY, index));
    },
    updateAttributeOptionKey({
        commit,
    }, option) {
        if (option.id) {
            commit(types.SET_UPDATED_OPTION, option.id);
        }
        commit(types.SET_ATTRIBUTE_OPTION_KEY, option);
    },
    setOptionValueForLanguageCode({
        commit, state,
    }, {
        index, languageCode, value, id,
    }) {
        if (!state.options[index].value || !state.options[index].value[languageCode]) {
            commit(types.SET_OPTION_LANGUAGE_CODE_FOR_VALUE, {
                index,
                languageCode,
            });
        }

        commit(types.SET_OPTION_VALUE_FOR_LANGUAGE_CODE, {
            index,
            languageCode,
            value,
        });

        if (id) {
            commit(types.SET_UPDATED_OPTION, id);
        }
    },
};
