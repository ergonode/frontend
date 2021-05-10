/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    createStatus,
    getDefaultStatus,
    getStatus,
    getStatuses,
    getTransitions,
    removeStatus,
    updateDefaultStatus,
    updateStatus,
} from '@Workflow/services';

export default {
    async getWorkflow({
        commit,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const [
                statusesResponse,
                transitionsResponse,
            ] = await Promise.all([
                getStatuses({
                    $axios: this.app.$axios,
                }),
                getTransitions({
                    $axios: this.app.$axios,
                }),
            ]);

            const statusColumn = statusesResponse.columns.find(column => column.id === 'status');

            commit('__SET_STATE', {
                key: 'statuses',
                value: statusesResponse.collection.map(status => ({
                    ...status,
                    color: statusColumn.filter.options[status.id].color,
                })),
            });
            commit('__SET_STATE', {
                key: 'transitions',
                value: transitionsResponse.collection,
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async createStatus(
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
                code,
                color,
                isDefaultStatus,
            } = state.status;
            let data = {
                code,
                color,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Workflow/store/workflow/action/createStatus/__before', {
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
            } = await createStatus({
                $axios: this.app.$axios,
                data,
            });

            if (isDefaultStatus) {
                await updateDefaultStatus({
                    $axios: this.app.$axios,
                    id,
                });
            }

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/createStatus/__after', {
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
                    message: this.app.i18n.t('@Workflow.workflow.store.action.createStatusCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateStatus({
        state,
        rootState,
    }, {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                translations: {
                    name, description,
                },
            } = rootState.tab;
            const {
                id,
                color,
                isDefaultStatus,
            } = state.status;
            let data = {
                color,
                name,
                description,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Workflow/store/workflow/action/updateStatus/__before', {
                $this: this,
                data: {
                    id,
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

            const requests = [
                updateStatus({
                    $axios: this.app.$axios,
                    id,
                    data,
                }),
            ];

            if (isDefaultStatus) {
                requests.push(updateDefaultStatus({
                    $axios: this.app.$axios,
                    id,
                }));
            }

            await Promise.all(requests);

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/updateStatus/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Workflow.workflow.store.action.updateStatusCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async getDefaultStatus({
        commit,
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state.status;

            const {
                default_id: defaultStatus,
            } = await getDefaultStatus({
                $axios: this.app.$axios,
            });

            if (defaultStatus === id) {
                commit('__SET_STATE', {
                    key: 'status',
                    value: {
                        ...state.status,
                        isDefaultStatus: true,
                    },
                });
            }

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async removeStatus({
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state.status;
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/removeStatus/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            await removeStatus({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/removeStatus/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Workflow.workflow.store.action.deleteStatusCancel'),
                });

                return;
            }

            onError(e);
        }
    },
    async getStatus({
        commit,
        dispatch,
    }, {
        id,
        onError = () => {},
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/getStatus/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const data = await getStatus({
                $axios: this.app.$axios,
                id,
            });
            const {
                code,
                color,
                name,
                description,
            } = data;

            const translations = {
                name,
                description,
            };

            commit('__SET_STATE', {
                key: 'status',
                value: {
                    id,
                    color,
                    code,
                },
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/getStatus/__after', {
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
};
