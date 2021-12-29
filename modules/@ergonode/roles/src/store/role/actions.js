/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedPrivileges,
} from '@Authentication/models/userMapper';
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
} from '@Roles/services/role/index';

export default {
    async getRole(
        {
            commit,
            dispatch,
        },
        {
            id,
            onError = () => {},
        },
    ) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Roles/store/role/action/getRole/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const data = await get({
                $axios: this.app.$axios,
                id,
            });
            const {
                name,
                description,
                privileges,
            } = data;

            dispatch('__clearStorage');

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'name',
                value: name,
            });
            commit('__SET_STATE', {
                key: 'description',
                value: description,
            });
            commit('__SET_STATE', {
                key: 'privileges',
                value: getMappedPrivileges(privileges),
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Roles/store/role/action/getRole/__after', {
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
    async updateRole(
        {
            state,
            commit,
        },
        {
            scope,
            drafts = {},
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                name,
                privileges,
                description,
            } = state;

            const tmpPrivileges = {
                ...privileges,
            };

            Object.keys(drafts).forEach((key) => {
                const [
                    rowId,
                    columnId,
                ] = key.split('/');

                if (drafts[key]) {
                    tmpPrivileges[`${rowId}_${columnId.toUpperCase()}`] = true;
                } else {
                    delete tmpPrivileges[`${rowId}_${columnId.toUpperCase()}`];
                }
            });

            let data = {
                name,
                description,
                privileges: Object.keys(tmpPrivileges),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Roles/store/role/action/updateRole/__before', {
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

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            commit('__SET_STATE', {
                key: 'privileges',
                value: isObject(tmpPrivileges)
                    ? {
                        ...tmpPrivileges,
                    }
                    : tmpPrivileges,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Roles/store/role/action/updateRole/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Roles.role.store.action.updateCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createRole(
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
                name,
                description,
            } = state;
            let data = {
                name,
                description,
            };
            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Roles/store/role/action/createRole/__before', {
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
            await this.$getExtendMethod('@Roles/store/role/action/createRole/__after', {
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
                    message: this.app.i18n.t('@Roles.role.store.action.createCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeRole(
        {
            state,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Roles/store/role/action/removeRole/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Roles/store/role/action/removeRole/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Roles.role.store.action.deleteCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
            });
        }
    },
};
