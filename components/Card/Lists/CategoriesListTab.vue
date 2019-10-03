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
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'CategoriesListTab',
    components: {
        CategoriesList: () => import('~/components/List/CategoriesList'),
        ListSearchHeader: () => import('~/components/List/ListSearchHeader'),
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
                languageCode: this.userLanguageCode,
            });
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
    }
</style>
