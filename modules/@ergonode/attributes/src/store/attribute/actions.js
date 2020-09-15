/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    getAll,
    remove,
    update,
} from '@Attributes/services/attribute';
import {
    getMappedTranslationArrayOptions,
} from '@Core/models/mappers/translationsMapper';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';

export default {
    async createAttribute({
        state,
        rootState,
    },
    {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                code,
                groups,
                type,
                scope,
            } = state;
            const {
                attrTypes,
            } = rootState.dictionaries;
            const typeKey = type ? getKeyByValue(attrTypes, type) : null;
            let data = {
                code,
                scope,
                type: typeKey,
                groups,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Attributes/store/attribute/action/createAttribute/__before', {
                $this: this,
                type: typeKey,
                data,
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Attributes/store/attribute/action/createAttribute/__after', {
                $this: this,
                type: typeKey,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            onError(e.data);
        }
    },
    getAttributesByFilter({
        rootState,
    }, {
        filter,
    }) {
        const {
            language,
        } = rootState.authentication.user;

        return getAll({
            $axios: this.app.$axios,
            params: {
                limit: 9999,
                offset: 0,
                filter,
                view: 'list',
                field: 'name',
                order: 'ASC',
            },
        }).then(({
            collection,
        }) => getMappedTranslationArrayOptions({
            options: collection,
            languageCode: language,
        }));
    },
    getAttributesOptionsByType({
        rootState,
    }, {
        type,
    }) {
        const {
            language,
        } = rootState.authentication.user;
        const filter = `type=${type}`;

        // EXTENDED BEFORE METHOD
        this.$extendMethods('@Attributes/store/attribute/action/getAttributesOptionsByType/__before', {
            $this: this,
            type,
        });
        // EXTENDED BEFORE METHOD

        return getAll({
            $axios: this.app.$axios,
            params: {
                limit: 9999,
                offset: 0,
                filter,
                view: 'list',
                field: 'name',
                order: 'ASC',
            },
        }).then(({
            collection,
        }) => {
            let options = collection.map(element => ({
                id: element.id,
                key: element.code,
                value: element.name,
                hint: element.name ? `#${element.code} ${language}` : '',
            }));

            // EXTENDED AFTER METHOD
            const extendedData = this.$extendMethods('@Attributes/store/attribute/action/getAttributesOptionsByType/__after', {
                $this: this,
                type,
                data: options,
            });
            // EXTENDED AFTER METHOD

            extendedData.forEach((extended) => {
                options = [
                    ...options,
                    ...extended,
                ];
            });

            return {
                options,
            };
        });
    },
    async getAttribute({
        dispatch,
        commit,
        rootState,
    }, {
        id,
    }) {
        const {
            attrTypes,
        } = rootState.dictionaries;

        // EXTENDED BEFORE METHOD
        this.$extendMethods('@Attributes/store/attribute/action/getAttribute/__before', {
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
            code,
            type,
            hint = '',
            label = '',
            groups: groupIds,
            scope,
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
            key: 'scope',
            value: scope,
        });
        commit('__SET_STATE', {
            key: 'groups',
            value: groupIds,
        });
        commit('__SET_STATE', {
            key: 'type',
            value: attrTypes[type],
        });

        dispatch(
            'tab/setTranslations',
            {
                hint,
                label,
            },
            {
                root: true,
            },
        );

        // EXTENDED AFTER METHOD
        this.$extendMethods('@Attributes/store/attribute/action/getAttribute/__after', {
            $this: this,
            data,
            type,
        });
        // EXTENDED AFTER METHOD
    },
    async updateAttribute(
        {
            state,
            rootState,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                type,
                groups,
                scope,
            } = state;
            const {
                attrTypes,
            } = rootState.dictionaries;
            const {
                translations: {
                    label, hint,
                },
            } = rootState.tab;
            const typeKey = getKeyByValue(attrTypes, type);
            let data = {
                groups,
                scope,
                label,
                hint,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Attributes/store/attribute/action/updateAttribute/__before', {
                $this: this,
                type: typeKey,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Attributes/store/attribute/action/updateAttribute/__after', {
                $this: this,
                type: typeKey,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async removeAttribute({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
            type,
        } = state;
        const {
            attrTypes,
        } = rootState.dictionaries;
        const typeKey = getKeyByValue(attrTypes, type);

        // EXTENDED BEFORE METHOD
        await this.$extendMethods('@Attributes/store/attribute/action/removeAttribute/__before', {
            $this: this,
            type: typeKey,
        });
        // EXTENDED BEFORE METHOD

        await remove({
            $axios: this.app.$axios,
            id,
        });

        // EXTENDED AFTER METHOD
        await this.$extendMethods('@Attributes/store/attribute/action/removeAttribute/__after', {
            $this: this,
            type: typeKey,
        });
        // EXTENDED AFTER METHOD
        onSuccess();
    },
};
