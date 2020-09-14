/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getAttributeGroup(
        {
            commit, dispatch,
        },
        {
            groupId, onError = () => {},
        },
    ) {
        return this.app.$axios.$get(`attributes/groups/${groupId}`).then(({
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
    updateAttributeGroup(
        {},
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        return this.app.$axios.$put(`attributes/groups/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeAttributeGroup({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        return this.app.$axios.$delete(`attributes/groups/${id}`).then(() => onSuccess());
    },
};
