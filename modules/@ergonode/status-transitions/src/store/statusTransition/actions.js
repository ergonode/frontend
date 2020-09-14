/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    async getTransition(
        {
            commit, dispatch, rootState,
        },
        {
            id,
        },
    ) {
        const {
            statuses: statusOptions,
        } = rootState.productStatus;
        const [
            source,
            destination,
        ] = id.split('--');

        await this.app.$axios.$get(`workflow/default/transitions/${source}/${destination}`).then(async ({
            condition_set_id: conditionSetId,
            role_ids: rolesIds,
        }) => {
            const sourceOption = statusOptions.find(
                status => status.key === source.replace(/%20/g, ' '),
            );
            const destinationOption = statusOptions.find(
                status => status.key === destination.replace(/%20/g, ' '),
            );

            commit('__SET_STATE', {
                key: 'source',
                value: sourceOption,
            });
            commit('__SET_STATE', {
                key: 'destination',
                value: destinationOption,
            });
            commit('__SET_STATE', {
                key: 'roles',
                value: rolesIds,
            });
            commit('__SET_STATE', {
                key: 'conditionSetId',
                value: conditionSetId,
            });

            if (conditionSetId) {
                await dispatch('condition/getConditionSet', {
                    conditionSetId,
                }, {
                    root: true,
                });
            }
        });
    },
    async updateTransition(
        {
            state,
        },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            source, destination,
        } = state;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`workflow/default/transitions/${source.id}/${destination.id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeTransition({
        state,
    }, {
        onSuccess,
    }) {
        const {
            source, destination, conditionSetId,
        } = state;

        return this.app.$axios.$delete(`workflow/default/transitions/${source.key}/${destination.key}`)
            .then(() => {
                if (conditionSetId) {
                    this.app.$axios.$delete(`conditionsets/${conditionSetId}`)
                        .then(() => onSuccess());
                } else {
                    onSuccess();
                }
            });
    },
};
