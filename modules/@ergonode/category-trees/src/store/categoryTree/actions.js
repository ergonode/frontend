/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getAutocomplete,
} from '@Categories/services';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getMappedTree,
    getParsedTree,
} from '@Core/models/mappers/treeDesignerMapper';
import {
    create,
    get,
    remove,
    update,
} from '@Trees/services/index';

export default {
    async createCategoryTree({
        state,
    }, {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                code,
            } = state;
            let data = {
                code,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Trees/store/categoryTree/action/createCategoryTree/__before', {
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
            await this.$getExtendMethod('@Trees/store/categoryTree/action/createCategoryTree/__after', {
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
                    message: this.app.i18n.t('@Trees.tree.store.action.createCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async getCategoryTree(
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
            await this.$getExtendMethod('@Trees/store/categoryTree/action/getCategoryTree/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const [
                categoryTreeData,
                categoriesData,
            ] = await Promise.all([
                get({
                    $axios: this.app.$axios,
                    id,
                }),
                getAutocomplete({
                    $axios: this.app.$axios,
                }),
            ]);

            dispatch('__clearStorage');

            const {
                code,
                name = '',
                categories,
            } = categoryTreeData;

            const reducer = (categoryId) => {
                const {
                    code: categoryCode,
                    label: categoryLabel,
                } = categoriesData.find(e => e.id === categoryId);

                return {
                    code: categoryCode,
                    name: categoryLabel,
                };
            };

            const tree = getMappedTree({
                data: categories,
                childrenId: 'category_id',
                reducer,
            });

            commit('__SET_STATE', {
                key: 'tree',
                value: tree,
            });

            const translations = {
                name,
            };

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Trees/store/categoryTree/action/getCategoryTree/__after', {
                $this: this,
                data: categoryTreeData,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async updateCategoryTree(
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
                id,
                tree,
            } = state;
            const {
                translations: {
                    name,
                },
            } = rootState.tab;
            let data = {
                name,
                categories: getParsedTree({
                    data: tree,
                    childrenId: 'category_id',
                }),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Trees/store/categoryTree/action/updateCategoryTree/__before', {
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
            await this.$getExtendMethod('@Trees/store/categoryTree/action/updateCategoryTree/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Trees.tree.store.action.updateCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeCategoryTree({
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Trees/store/categoryTree/action/removeCategoryTree/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD
            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Trees/store/categoryTree/action/removeCategoryTree/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Trees.tree.store.action.deleteCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
