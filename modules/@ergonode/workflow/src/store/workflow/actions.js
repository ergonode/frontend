/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getFromAndToTransition,
    getMappedTransitions,
} from '@Workflow/models/workflowDesigner';
import {
    createStatus,
    getStatus,
    getStatuses,
    getTransition,
    getTransitionConditions,
    getTransitions,
    getWorkflow,
    orderStatuses,
    removeStatus,
    removeTransition,
    updateDefaultStatus,
    updateStatus,
    updateTransition,
    updateWorkflow,
} from '@Workflow/services';

export default {
    async orderStatuses({
        commit,
        state,
    }, {
        statusIds,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                statuses,
            } = state;

            commit('__SET_STATE', {
                key: 'statuses',
                value: statusIds.map(statusId => statuses.find(status => status.id === statusId)),
            });

            await orderStatuses({
                $axios: this.app.$axios,
                data: {
                    statusIds,
                },
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getStatuses({
        commit,
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                defaultStatus: workflowDefaultStatus,
            } = state;
            const {
                columns,
                collection,
            } = await getStatuses({
                $axios: this.app.$axios,
            });
            const statusColumn = columns.find(column => column.id === 'status');

            // INFO: overwrite default status from workflow end-point
            commit('__SET_STATE', {
                key: 'statuses',
                value: collection.map(({
                    // eslint-disable-next-line no-unused-vars
                    is_default, ...status
                }) => ({
                    ...status,
                    isDefaultStatus: workflowDefaultStatus === status.id,
                    color: statusColumn.filter.options[status.id].color,
                })),
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getTransitions({
        commit,
    }, {
        workflowId,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                collection,
            } = await getTransitions({
                $axios: this.app.$axios,
                workflowId,
            });

            commit('__SET_STATE', {
                key: 'transitions',
                value: collection.map(transition => ({
                    ...transition,
                    isSaved: true,
                })),
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getWorkflowById({
        commit,
    }, {
        workflowId,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/getWorkflowById/__before', {
                $this: this,
                data: {
                    workflowId,
                },
            });
            // EXTENDED BEFORE METHOD

            const data = await getWorkflow({
                $axios: this.app.$axios,
                workflowId,
            });
            const {
                id,
                code,
                default_id,
            } = data;

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'defaultStatus',
                value: default_id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/getWorkflowById/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getWorkflow({
        dispatch,
    }, {
        workflowId,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            await dispatch('getWorkflowById', {
                workflowId,
            });
            await dispatch('getStatuses', {});
            await dispatch('getTransitions', {
                workflowId,
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
            workflowId,
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
                    workflowId,
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
        workflowId,
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
                    workflowId,
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
        state,
        commit,
        dispatch,
    }, {
        id,
        onError = () => {},
    }) {
        try {
            const {
                defaultStatus: workflowDefaultStatus,
            } = state;
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
                    isDefaultStatus: workflowDefaultStatus === id,
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
    async getTransition(
        {
            state,
            rootState,
            commit,
            dispatch,
        },
        {
            id,
            workflowId,
            onError = () => {},
        },
    ) {
        try {
            const {
                language: userLanguageCode,
            } = rootState.authentication.user;
            const {
                statuses,
            } = state;
            const [
                from,
                to,
            ] = getFromAndToTransition(id);

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/getTransition/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const data = await getTransition({
                $axios: this.app.$axios,
                workflowId,
                from,
                to,
            });
            const conditions = await getTransitionConditions({
                $axios: this.app.$axios,
                workflowId,
                from,
                to,
            });
            const regex = /%20/g;
            const fromOption = statuses.find(
                status => status.id === from.replace(regex, ' '),
            );
            const toOption = statuses.find(
                status => status.id === to.replace(regex, ' '),
            );

            dispatch('workflowConditions/__clearStorage', {}, {
                root: true,
            });

            commit('__SET_STATE', {
                key: 'transition',
                value: {
                    from: {
                        id: fromOption.id,
                        key: fromOption.code,
                        value: fromOption.name || `#${fromOption.code}`,
                        hint: fromOption.name
                            ? `#${fromOption.code} ${userLanguageCode}`
                            : '',
                    },
                    to: {
                        id: toOption.id,
                        key: toOption.code,
                        value: toOption.name || `#${toOption.code}`,
                        hint: toOption.name
                            ? `#${toOption.code} ${userLanguageCode}`
                            : '',
                    },
                },
            });

            if (conditions) {
                await dispatch('workflowConditions/setConditions', {
                    conditions,
                }, {
                    root: true,
                });
            }
            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/getTransition/__after', {
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
    async updateTransition(
        {
            state,
        },
        {
            scope,
            workflowId,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                from,
                to,
            } = state.transition;
            let data = {};

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Workflow/store/workflow/action/updateTransition/__before', {
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

            await updateTransition({
                $axios: this.app.$axios,
                workflowId,
                from: from.id,
                to: to.id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/updateTransition/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Workflow.workflow.store.action.updateTransitionCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateWorkflow(
        {
            state,
            commit,
        },
        {
            scope,
            workflowId,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                defaultStatus,
                code = 'default',
            } = state;
            let data = {
                code,
                default_id: defaultStatus,
                statuses: state.statuses.map(status => status.id),
                transitions: getMappedTransitions(state.transitions),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Workflow/store/workflow/action/updateWorkflow/__before', {
                $this: this,
                data,
            });
            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });
            // EXTENDED BEFORE METHOD

            await updateWorkflow({
                $axios: this.app.$axios,
                workflowId,
                data,
            });

            commit('__SET_STATE', {
                key: 'transitions',
                value: state.transitions.map(transition => ({
                    ...transition,
                    isSaved: true,
                })),
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/updateWorkflow/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Workflow.workflow.store.action.updateTransitionsCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeTransition({
        state,
    }, {
        workflowId,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                from,
                to,
            } = state.transition;

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/removeTransition/__before', {
                $this: this,
                data: {
                    from,
                    to,
                },
            });
            // EXTENDED BEFORE METHOD

            await removeTransition({
                $axios: this.app.$axios,
                workflowId,
                from: from.id,
                to: to.id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/removeTransition/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Workflow.workflow.store.action.deleteTransitionCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
