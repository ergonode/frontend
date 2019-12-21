/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Catalog"
            :is-read-only="$isReadOnly('PRODUCT')">
            <template #mainAction>
                <PrependIconButton
                    title="NEW PRODUCT"
                    :size="smallSize"
                    :disabled="!$hasAccess(['PRODUCT_CREATE'])"
                    @click.native="addProduct">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <ProductGridTab />
        <TrashCan v-show="draggedElementOnGrid" />
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import gridModule from '~/reusableStore/grid/state';
import { SIZES } from '@Core/defaults/buttons';
import PrependIconButton from '@Core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import ProductGridTab from '~/components/Card/Grid/ProductGridTab';

export default {
    name: 'Products',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
        ProductGridTab,
        PrependIconButton,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'productsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('productsGrid');
    },
    computed: {
        ...mapState('draggable', {
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addProduct() {
            this.$router.push({ path: 'catalog/product/new/general' });
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'productsGrid',
            store,
        });
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;
        const gridPath = `${userLanguageCode}/products`;

        await store.dispatch('list/clearStorage');
        await Promise.all([
            store.dispatch('list/getGroups', userLanguageCode),
            store.dispatch('list/getElementsForGroup', {
                listType: 'attributes',
                groupId: null,
                languageCode: userLanguageCode,
            }),
        ]);
        await Promise.all([
            store.dispatch('productsGrid/getData', gridPath),
            store.dispatch('productsGrid/getAdvancedFiltersData', gridPath),
        ]).then(() => {
            const { columns, advancedFiltersData } = store.state.productsGrid;
            const disabledElements = {};
            const getAttributeElements = (array) => {
                const { length } = array;
                const elements = [];

                for (let i = 0; i < length; i += 1) {
                    const { language, element_id: elementId } = array[i];
                    if (elementId && language) {
                        if (!elements[language]) elements[language] = [];

                        elements[language].push(elementId);
                    }
                }

                return elements;
            };
            const columnElements = getAttributeElements(columns);
            const filterElements = getAttributeElements(advancedFiltersData);
            const languages = [...columnElements, ...filterElements];
            const languagesSet = new Set(languages);

            languagesSet.forEach((language) => {
                const ids = [...columnElements[language], ...filterElements[language]];
                const idsSet = new Set(ids);

                idsSet.forEach((id) => {
                    disabledElements[language] = {
                        ...disabledElements[language], [id]: true,
                    };
                });
            });

            store.dispatch('list/setDisabledElements', disabledElements);
        });
    },
};
</script>
