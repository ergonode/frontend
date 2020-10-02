/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject,
} from '@Core/models/objectWrapper';
import {
    create,
    get,
    remove,
    update,
} from '@Transitions/services/index';

export default {
    async getStatusTransition(
        {
            commit,
            dispatch,
            rootState,
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
        console.log(statusOptions, source);

        const {
            condition_set_id: conditionSetId,
            role_ids: rolesIds,
        } = await get({
            $axios: this.app.$axios,
            source,
            destination,
        });

        const regex = /%20/g;

        const sourceOption = statusOptions.find(
            status => status.id === source.replace(regex, ' '),
        );
        const destinationOption = statusOptions.find(
            status => status.id === destination.replace(regex, ' '),
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
                id: conditionSetId,
            }, {
                root: true,
            });
        }
    },
    async updateStatusTransition(
        {
            state,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        const {
            source,
            destination,
            conditionSetId,
            roles,
        } = state;
        const data = {
            roles,
        };

        if (conditionSetId) {
            data.condition_set = conditionSetId;
        }

        try {
            await update({
                $axios: this.app.$axios,
                source: source.id,
                destination: destination.id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createStatusTransition(
        {
            state,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                source,
                destination,
                roles,
            } = state;

            const data = {
                source: isObject(source) ? source.id : null,
                destination: isObject(destination) ? destination.id : null,
                roles,
            };

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeStatusTransition({
        state,
    }, {
        onSuccess,
    }) {
        const {
            source,
            destination,
            conditionSetId,
        } = state;

        await remove({
            $axios: this.app.$axios,
            source: source.id,
            destination: destination.id,
        });

        if (conditionSetId) {
            await this.app.$axios.$delete(`conditionsets/${conditionSetId}`);
        }

        onSuccess();
    },
};
