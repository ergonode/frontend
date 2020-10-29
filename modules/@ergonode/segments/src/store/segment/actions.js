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
} from '@Segments/services/index';

export default {
    async getSegment(
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
            await this.$extendMethods('@Segments/store/segment/action/getSegment/__before', {
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
                condition_set_id: conditionSetId,
                name = '',
                description = '',
            } = data;
            const translations = {
                name,
                description,
            };

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'conditionSetId',
                value: conditionSetId,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });

            if (conditionSetId) {
                await dispatch('condition/getConditionSet', {
                    id: conditionSetId,
                }, {
                    root: true,
                });
            }
            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Segments/store/segment/action/getSegment/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            onError(e);
        }
    },
    getSegmentOptions() {
        return getAll({
            $axios: this.app.$axios,
        }).then(({
            collection,
        }) => collection.map(({
            id, code, name,
        }) => ({
            id,
            key: code,
            value: name,
            hint: name ? `#${code}` : '',
        })));
    },
    async updateSegment(
        {
            state,
            rootState,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                translations: {
                    name,
                    description,
                },
            } = rootState.tab;
            const {
                id,
                conditionSetId,
            } = state;
            let data = {
                name,
                description,
                condition_set_id: conditionSetId,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Segments/store/segment/action/updateSegment/__before', {
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

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Segments/store/segment/action/updateSegment/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },

    async createSegment(
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
            } = state;
            let data = {
                code,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Segments/store/segment/action/createSegment/__before', {
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
            await this.$extendMethods('@Segments/store/segment/action/createSegment/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeSegment({
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id, conditionSetId,
            } = state;
            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Segments/store/segment/action/removeSegment/__before', {
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

            if (conditionSetId) {
                this.app.$axios.$delete(`conditionsets/${conditionSetId}`);
            }

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Segments/store/segment/action/removeSegment/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError(e);
        }
    },
};
