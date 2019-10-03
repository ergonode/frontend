/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-wrapper">
        <ListSearchHeader
            header="Categories"
            @searchResult="onSearch" />
        <CategoriesList :language-code="userLanguageCode" />
        <div class="add-btn-wrapper">
            <Button
                fab
                :disabled="!$hasAccess('CATEGORY_CREATE')"
                @click.native="addNewCategory">
                <template #prepend>
                    <IconAdd fill-color="#fff" />
                </template>
            </Button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'CategoriesListTab',
    components: {
        ListSearchHeader: () => import('~/components/List/ListSearchHeader'),
        CategoriesList: () => import('~/components/List/CategoriesList'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
        Button: () => import('~/components/Buttons/Button'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
    },
    methods: {
        ...mapActions('list', [
            'setFilter',
            'getElements',
        ]),
        onSearch(value) {
            this.setFilter(value);
            this.getElements({
                listType: 'categories',
                languageCode: this.languageCode,
            });
        },
        addNewCategory() {
            this.$router.push('/categories/new');
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
