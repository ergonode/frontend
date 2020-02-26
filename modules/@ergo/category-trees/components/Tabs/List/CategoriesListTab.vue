/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListSearchHeader
            header="Categories"
            @searchResult="onSearch" />
        <CategoriesList :language-code="userLanguageCode" />
        <template #fab>
            <FabButton
                :disabled="!$hasAccess(['CATEGORY_CREATE'])"
                @click.native="onShowModal">
                <template #icon="{ fillColor }">
                    <IconAdd :fill-color="fillColor" />
                </template>
            </FabButton>
        </template>
        <CreateCategoryModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedCategory" />
    </VerticalTabBarListWrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';

export default {
    name: 'CategoriesListTab',
    components: {
        CategoriesList: () => import('@Trees/components/Lists/CategoriesList'),
        CreateCategoryModalForm: () => import('@Categories/components/Modals/CreateCategoryModalForm'),
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        ListSearchHeader: () => import('@Core/components/List/ListSearchHeader'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
        FabButton: () => import('@Core/components/Buttons/FabButton'),
    },
    mixins: [gridModalMixin],
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        whiteColor() {
            return WHITE;
        },
        listDataType() {
            return 'categories';
        },
    },
    methods: {
        ...mapActions('list', [
            'setFilter',
            'getElements',
        ]),
        onCreatedCategory() {
            this.onCloseModal();
            this.getElements({
                listType: this.listDataType,
                languageCode: this.userLanguageCode,
            });
        },
        onSearch(value) {
            this.setFilter(value);
            this.getElements({
                listType: this.listDataType,
                languageCode: this.userLanguageCode,
            });
        },
    },
};
</script>
