/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getCategory(
        {
            commit, dispatch,
        },
        {
            categoryId, onError = () => {},
        },
    ) {
        return this.app.$axios.$get(`categories/${categoryId}`).then(({
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
    async updateCategory(
        {},
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`categories/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeCategory({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        return this.app.$axios.$delete(`categories/${id}`).then(() => onSuccess());
    },
};
