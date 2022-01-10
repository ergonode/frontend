/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
} from '@Transitions/services';
import {
    getFromAndToTransition,
} from '@Workflow/models/workflowDesigner';
import {
    getTransitionConditions,
} from '@Workflow/services';

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
                from,
                to,
            ] = getFromAndToTransition(id);

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
                from,
                to,
            });
            const conditions = await getTransitionConditions({
                $axios: this.app.$axios,
                from,
                to,
            });
            const regex = /%20/g;
            const fromOption = statusOptions.find(
                status => status.id === from.replace(regex, ' '),
            );
            const toOption = statusOptions.find(
                status => status.id === to.replace(regex, ' '),
            );

            dispatch('__clearStorage');
            dispatch('workflowConditions/__clearStorage', {}, {
                root: true,
            });

            commit('__SET_STATE', {
                key: 'from',
                value: fromOption,
            });
            commit('__SET_STATE', {
                key: 'to',
                value: toOption,
            });

            if (conditions) {
                await dispatch('workflowConditions/setConditions', {
                    conditions,
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
                from,
                to,
            } = state;
            let data = {};

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Transitions/store/statusTransition/action/updateStatusTransition/__before', {
                $this: this,
                data: {
                    from,
                    to,
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
                from: from.id,
                to: to.id,
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
                    message: this.app.i18n.t('@Transitions.transition.store.action.updateCancel'),
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
                from,
                to,
            } = state;
            let data = {
                from: isObject(from) ? from.id : null,
                to: isObject(to) ? to.id : null,
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
                    message: this.app.i18n.t('@Transitions.transition.store.action.createCancel'),
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
                from,
                to,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Transitions/store/statusTransition/action/removeStatusTransition/__before', {
                $this: this,
                data: {
                    from,
                    to,
                },
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                from: from.id,
                to: to.id,
            });

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
                    message: this.app.i18n.t('@Transitions.transition.store.action.deleteCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
