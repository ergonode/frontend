/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchHeader
            header="Categories"
            @search-result="onSearch" />
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
            @created="onCreatedCategory" />
    </VerticalTabBarList>
</template>

<script>
import Fab from '@Core/components/Fab/Fab';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import List from '@Core/components/List/List';
import ListScrollableContainer from '@Core/components/List/ListScrollableContainer';
import ListSearchHeader from '@Core/components/List/ListSearchHeader';
import VerticalTabBarList from '@Core/components/TabBar/VerticalTabBarList';
import fetchListDataMixin from '@Core/mixins/list/fetchListDataMixin';
import CategoriesListElement from '@Trees/components/Lists/CategoriesListElement';
import PRIVILEGES from '@Trees/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoriesListTab',
    components: {
        List,
        ListScrollableContainer,
        CategoriesListElement,
        VerticalTabBarList,
        ListSearchHeader,
        IconAdd,
        Fab,
        CreateCategoryModalForm: () => import('@Categories/components/Modals/CreateCategoryModalForm'),
    },
    mixins: [
        fetchListDataMixin({
            namespace: 'categories',
        }),
    ],
    data() {
        return {
            isModalVisible: false,
        };
    },
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
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onCreatedCategory() {
            this.onCloseModal();
            this.getItems(this.userLanguageCode);
        },
        onSearch(value) {
            this.codeFilter = value;
            this.getItems(this.userLanguageCode);
        },
    },
};
</script>
