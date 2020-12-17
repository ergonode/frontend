/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListSearchHeader
            title="Categories"
            searchable
            @search="onSearch" />
        <List>
            <Preloader v-if="isPrefetchingData" />
            <ListScrollableContainer v-else>
                <CategoriesListElement
                    v-for="item in items[defaultLanguageCode]"
                    :key="item.id"
                    :item="item"
                    :is-draggable="isAllowedToUpdate"
                    :language-code="defaultLanguageCode" />
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import fetchListDataMixin from '@Core/mixins/list/fetchListDataMixin';
import CategoriesListElement from '@Trees/components/Lists/CategoriesListElement';
import PRIVILEGES from '@Trees/config/privileges';
import Fab from '@UI/components/Fab/Fab';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import List from '@UI/components/List/List';
import ListScrollableContainer from '@UI/components/List/ListScrollableContainer';
import ListSearchHeader from '@UI/components/List/ListSearchHeader';
import Preloader from '@UI/components/Preloader/Preloader';
import VerticalTabBarList from '@UI/components/TabBar/VerticalTabBarList';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoriesListTab',
    components: {
        Preloader,
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
        ...mapState('core', [
            'defaultLanguageCode',
        ]),
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

            try {
                this.getItems(this.defaultLanguageCode);
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'List hasn’t been fetched properly',
                });
            }
        },
        onSearch(value) {
            this.codeFilter = value;
            this.getItems(this.defaultLanguageCode);
        },
    },
};
</script>
