/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
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
            onError = () => {},
        },
    ) {
        try {
            const {
                statuses: statusOptions,
            } = rootState.productStatus;
            const [
                source,
                destination,
            ] = id.split('--');

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Transitions/store/statusTransition/action/getStatusTransition/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const data = await get({
                $axios: this.app.$axios,
                source,
                destination,
            });
            const {
                condition_set_id: conditionSetId,
            } = data;

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
            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Transitions/store/statusTransition/action/getStatusTransition/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
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
        try {
            const {
                source,
                destination,
                conditionSetId,
            } = state;
            let data = {};

            if (conditionSetId) {
                data.condition_set = conditionSetId;
            }

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Transitions/store/statusTransition/action/updateStatusTransition/__before', {
                $this: this,
                data: {
                    source,
                    destination,
                    ...data,
                },
            });
            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });
            // EXTENDED BEFORE METHOD

            await update({
                $axios: this.app.$axios,
                source: source.id,
                destination: destination.id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Transitions/store/statusTransition/action/updateStatusTransition/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Updating status transition has been canceled',
                });

                return;
            }

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
            } = state;
            let data = {
                source: isObject(source) ? source.id : null,
                destination: isObject(destination) ? destination.id : null,
            };
            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Transitions/store/statusTransition/action/createStatusTransition/__before', {
                $this: this,
                data,
            });
            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });
            // EXTENDED BEFORE METHOD

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Transitions/store/statusTransition/action/createStatusTransition/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Creating status trsnaition has been canceled',
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeStatusTransition({
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                source,
                destination,
                conditionSetId,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Transitions/store/statusTransition/action/removeStatusTransition/__before', {
                $this: this,
                data: {
                    source,
                    destination,
                },
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                source: source.id,
                destination: destination.id,
            });

            if (conditionSetId) {
                await this.app.$axios.$delete(`conditionsets/${conditionSetId}`);
            }
            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Transitions/store/statusTransition/action/removeStatusTransition/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Removing status transition has been canceled',
                });

                return;
            }

            onError(e);
        }
    },
};
