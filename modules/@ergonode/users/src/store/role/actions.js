/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedPrivileges,
} from '@Authentication/models/userMapper';
import {
    isObject,
} from '@Core/models/objectWrapper';
import {
    create,
    get,
    getAll,
    remove,
    update,
} from '@Users/services/role/index';

export default {
    async getRole(
        {
            commit,
        },
        {
            id,
        },
    ) {
        const {
            name,
            description,
            privileges,
        } = await get({
            $axios: this.app.$axios,
            id,
        });

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
    },
    getRoleOptions() {
        return getAll({
            $axios: this.app.$axios,
        }).then(({
            collection,
        }) => ({
            options: collection.map(element => ({
                id: element.id,
                key: element.id,
                value: element.name,
                hint: element.description,
            })),
        }));
    },
    async updateRole(
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
            const {
                id,
                name,
                privileges,
                description,
                drafts,
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

            const data = {
                name,
                description,
                privileges: Object.keys(tmpPrivileges),
            };

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
            commit('__SET_STATE', {
                key: 'drafts',
                value: {},
            });

            onSuccess();
        } catch (e) {
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

            const data = {
                name,
                description,
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
    async removeRole(
        {
            state,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        const {
            id,
        } = state;

        try {
            await remove({
                $axios: this.app.$axios,
                id,
            });

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
            });
        }
    },
};
