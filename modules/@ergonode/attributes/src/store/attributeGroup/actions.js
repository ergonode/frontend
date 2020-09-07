/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    getAll,
    remove,
    update,
} from '@Attributes/services/attributeGroup';

export default {
    createAttributeGroup({
        state,
    }) {
        const {
            code,
        } = state;

        return create({
            $axios: this.app.$axios,
            data: {
                code,
            },
        });
    },
    getAttributeGroup(
        {
            commit, dispatch,
        },
        {
            groupId, onError = () => {},
        },
    ) {
        return get({
            $axios: this.app.$axios,
            id: groupId,
        }).then(({
            id,
            code,
            name = '',
        }) => {
            const translations = {
                name,
            };

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'name',
                value: name,
            });

            dispatch('tab/setTranslations', translations, {
                root: true,
            });
        }).catch(onError);
    },
    getAttributeGroupsOptions({
        rootState,
    }) {
        const {
            language,
        } = rootState.authentication.user;

        return getAll({
            $axios: this.app.$axios,
        }).then(({
            collection,
        }) => ({
            options: collection.map(element => ({
                id: element.id,
                key: element.code,
                value: element.name,
                hint: element.name ? `#${element.code} ${language}` : '',
            })),
        }));
    },
    updateAttributeGroup(
        {},
        {
            id,
            data,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        return update({
            $axios: this.app.$axios,
            id,
            data,
        }).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeAttributeGroup({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return remove({
            $axios: this.app.$axios,
            id,
        }).then(() => onSuccess());
    },
};
