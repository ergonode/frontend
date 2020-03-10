/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchHeader
            header="Categories"
            @searchResult="onSearch" />
        <List>
            <ListScrollableContainer>
                <CategoriesListElement
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isUserAllowedToUpdateTree"
                    :language-code="userLanguageCode" />
            </ListScrollableContainer>
        </List>
        <template #fab>
            <Fab
                :disabled="!$hasAccess(['CATEGORY_CREATE'])"
                @click.native="onShowModal">
                <template #icon="{ fillColor }">
                    <IconAdd :fill-color="fillColor" />
                </template>
            </Fab>
        </template>
        <CreateCategoryModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedCategory" />
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState } from 'vuex';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import fetchListDataMixin from '@Core/mixins/list/fetchListDataMixin';

export default {
    name: 'CategoriesListTab',
    components: {
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        CategoriesListElement: () => import('@Trees/components/Lists/CategoriesListElement'),
        CreateCategoryModalForm: () => import('@Categories/components/Modals/CreateCategoryModalForm'),
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
        Fab: () => import('@Core/components/Buttons/Fab'),
    },
    mixins: [gridModalMixin, fetchListDataMixin({ namespace: 'categories' })],
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        isUserAllowedToUpdateTree() {
            return this.$hasAccess(['CATEGORY_TREE_UPDATE']);
        },
    },
    methods: {
        onSearch(value) {
            this.codeFilter = value;
            this.getItems(this.languageCode);
        },
        onSelect(value) {
            this.language = value;
            this.getItems(this.languageCode);
        },
    },
};
</script>
