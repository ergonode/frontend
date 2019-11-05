/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-wrapper">
        <ListSearchHeader
            header="Categories"
            :is-expanded="isExpanded"
            @expand="onExpand"
            @searchResult="onSearch" />
        <CategoriesList :language-code="userLanguageCode" />
        <div class="add-btn-wrapper">
            <Button
                fab
                :disabled="!$hasAccess('CATEGORY_CREATE')"
                @click.native="addNewCategory">
                <template #prepend>
                    <IconAdd :fill-color="whiteColor" />
                </template>
            </Button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
    WHITE,
} from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'CategoriesListTab',
    components: {
        ListSearchHeader: () => import('~/components/List/ListSearchHeader'),
        CategoriesList: () => import('~/components/List/CategoriesList'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
        Button: () => import('~/components/Buttons/Button'),
    },
    props: {
        isExpanded: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        whiteColor() {
            return WHITE;
        },
    },
    methods: {
        ...mapActions('list', [
            'setFilter',
            'getElements',
        ]),
        onExpand(isExpanded) {
            this.$emit('expand', isExpanded);
        },
        onSearch(value) {
            this.setFilter(value);
            this.getElements({
                listType: 'categories',
                languageCode: this.userLanguageCode,
            });
        },
        addNewCategory() {
            this.$router.push('/categories/category/new');
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-wrapper {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 275px;

        .add-btn-wrapper {
            position: absolute;
            bottom: 16px;
            right: 16px;
            z-index: 3;
        }
    }
</style>
