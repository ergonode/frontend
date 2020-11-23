/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getListItems,
} from '@Core/services/list/getList.service';
import {
    getMappedTreeData,
    getParsedTreeData,
} from '@Trees/models/treeMapper';
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
            const extendedData = await this.$extendMethods('@Trees/store/categoryTree/action/createCategoryTree/__before', {
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
            await this.$extendMethods('@Trees/store/categoryTree/action/createCategoryTree/__after', {
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
                    message: 'Creating category tree has been canceled',
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
            rootState,
        },
        {
            id,
            onError = () => {},
        },
    ) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Trees/store/categoryTree/action/getCategoryTree/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const {
                language: userLanguageCode,
            } = rootState.authentication.user;
            const data = await get({
                $axios: this.app.$axios,
                id,
            });
            const {
                code,
                name = '',
                categories,
            } = data;

            if (categories.length) {
                await getListItems({
                    $axios: this.app.$axios,
                    path: `${userLanguageCode}/categories`,
                    params: {
                        limit: 99999,
                        offset: 0,
                        // TODO: BE has no filter via ID's - we gonna wait for them
                        // filter: `category_id=${categories.map(category => category.id).join(',')}`,
                        view: 'list',
                        field: 'code',
                        order: 'ASC',
                    },
                    onSuccess: (({
                        items,
                    }) => {
                        const treeToSet = getParsedTreeData(categories, items);

                        treeToSet.forEach(e => dispatch('list/setDisabledElement', {
                            languageCode: userLanguageCode,
                            elementId: e.id,
                            disabled: true,
                        }, {
                            root: true,
                        }));
                        dispatch('gridDesigner/setGridData', treeToSet, {
                            root: true,
                        });
                        dispatch('gridDesigner/setFullGridData', treeToSet, {
                            root: true,
                        });
                    }),
                });
            }

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
            await this.$extendMethods('@Trees/store/categoryTree/action/getCategoryTree/__after', {
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
            } = state;
            const {
                translations: {
                    name,
                },
            } = rootState.tab;
            const {
                fullGridData,
            } = rootState.gridDesigner;
            let data = {
                name,
                categories: getMappedTreeData(fullGridData),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Trees/store/categoryTree/action/updateCategoryTree/__before', {
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
            await this.$extendMethods('@Trees/store/categoryTree/action/updateCategoryTree/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Updating category tree has been canceled',
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
            await this.$extendMethods('@Trees/store/categoryTree/action/removeCategoryTree/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD
            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Trees/store/categoryTree/action/removeCategoryTree/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Removing category tree has been canceled',
                });

                return;
            }

            onError(e);
        }
    },
};
