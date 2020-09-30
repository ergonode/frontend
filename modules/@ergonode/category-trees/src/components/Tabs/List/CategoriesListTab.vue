/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchHeader
            header="Categories"
            @searchResult="onSearch" />
        <List>
            <ListScrollableContainer>
                <CategoriesListElement
                    v-for="item in items[userLanguageCode]"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isAllowedToUpdate"
                    :language-code="userLanguageCode" />
            </ListScrollableContainer>
        </List>
        <Fab
            :floating="{ bottom: '16px', right: '16px' }"
            :disabled="!isAllowedToCreate"
            @click.native="onShowModal">
            <template #icon="{ color }">
                <IconAdd :fill-color="color" />
            </template>
        </Fab>
        <CreateCategoryModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </VerticalTabBarList>
</template>

<script>
import fetchListDataMixin from '@Core/mixins/list/fetchListDataMixin';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import PRIVILEGES from '@Trees/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoriesListTab',
    components: {
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        CategoriesListElement: () => import('@Trees/components/Lists/CategoriesListElement'),
        CreateCategoryModalForm: () => import('@Categories/components/Modals/CreateCategoryModalForm'),
        VerticalTabBarList: () => import('@Core/components/TabBar/VerticalTabBarList'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
        Fab: () => import('@Core/components/Fab/Fab'),
    },
    mixins: [
        gridModalMixin,
        fetchListDataMixin({
            namespace: 'categories',
        }),
    ],
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.create,
            ]);
        },
    },
    beforeDestroy() {
        this.setDisabledElements({});
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElements',
        ]),
        onSearch(value) {
            this.codeFilter = value;
            this.getItems(this.languageCode);
        },
    },
};
</script>
