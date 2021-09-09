/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getMappedTransitions,
    getSourceAndDestination,
} from '@Workflow/models/workflowDesigner';
import {
    createStatus,
    getDefaultStatus,
    getStatus,
    getStatuses,
    getTransition,
    getTransitions,
    removeStatus,
    removeTransition,
    updateDefaultStatus,
    updateStatus,
    updateTransition,
    updateTransitions,
} from '@Workflow/services';

export default {
    async getStatuses({
        commit,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                columns,
                collection,
            } = await getStatuses({
                $axios: this.app.$axios,
            });

            const statusColumn = columns.find(column => column.id === 'status');

            commit('__SET_STATE', {
                key: 'statuses',
                value: collection.map(status => ({
                    ...status,
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
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                collection,
            } = await getTransitions({
                $axios: this.app.$axios,
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
    async getWorkflow({
        dispatch,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            await Promise.all(
                [
                    dispatch('getStatuses', {}),
                    dispatch('getTransitions', {}),
                ],
            );

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
    async getTransition(
        {
            state,
            rootState,
            commit,
            dispatch,
        },
        {
            id,
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
                source,
                destination,
            ] = getSourceAndDestination(id);

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
                source,
                destination,
            });
            const {
                condition_set_id: conditionSetId,
            } = data;

            const regex = /%20/g;

            const sourceOption = statuses.find(
                status => status.id === source.replace(regex, ' '),
            );
            const destinationOption = statuses.find(
                status => status.id === destination.replace(regex, ' '),
            );

            dispatch('condition/__clearStorage', {}, {
                root: true,
            });

            commit('__SET_STATE', {
                key: 'transition',
                value: {
                    source: {
                        id: sourceOption.id,
                        key: sourceOption.code,
                        value: sourceOption.name || `#${sourceOption.code}`,
                        hint: sourceOption.name
                            ? `#${sourceOption.code} ${userLanguageCode}`
                            : '',
                    },
                    destination: {
                        id: destinationOption.id,
                        key: destinationOption.code,
                        value: destinationOption.name || `#${destinationOption.code}`,
                        hint: destinationOption.name
                            ? `#${destinationOption.code} ${userLanguageCode}`
                            : '',
                    },
                    conditionSetId,
                },
            });

            if (conditionSetId) {
                await dispatch('condition/getConditionSet', {
                    id: conditionSetId,
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
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                source,
                destination,
                conditionSetId,
            } = state.transition;
            let data = {};

            if (conditionSetId) {
                data.condition_set = conditionSetId;
            }

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Workflow/store/workflow/action/updateTransition/__before', {
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

            await updateTransition({
                $axios: this.app.$axios,
                source: source.id,
                destination: destination.id,
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
    async updateTransitions(
        {
            state,
            commit,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            let data = {
                statuses: state.statuses.map(status => status.id),
                transitions: getMappedTransitions(state.transitions),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Workflow/store/workflow/action/updateTransitions/__before', {
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

            await updateTransitions({
                $axios: this.app.$axios,
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
            await this.$getExtendMethod('@Workflow/store/workflow/action/updateTransitions/__after', {
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
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                source,
                destination,
            } = state.transition;

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Workflow/store/workflow/action/removeTransition/__before', {
                $this: this,
                data: {
                    source,
                    destination,
                },
            });
            // EXTENDED BEFORE METHOD

            await removeTransition({
                $axios: this.app.$axios,
                source: source.id,
                destination: destination.id,
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
