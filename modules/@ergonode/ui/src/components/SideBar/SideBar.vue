/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ExpandingList
        class="side-bar"
        :items="items"
        :expanded="expanded"
        :render-ahead="8"
        :option-key="optionKey">
        <template #header>
            <SideBarStickyHeader>
                <slot name="header">
                    <ListSearchHeader
                        :title="title"
                        :search-value="searchValue"
                        :searchable="searchable"
                        @search="onSearch" />
                </slot>
            </SideBarStickyHeader>
        </template>
        <template #body>
            <slot name="body">
                <slot
                    v-if="isSearchPlaceholderVisible"
                    name="noResultsPlaceholder"
                    :on-clear-search="onClearSearch">
                    <SideBarNoResultsPlaceholder @clear="onClearSearch" />
                </slot>
                <slot
                    v-else-if="isPlaceholderVisible"
                    name="noDataPlaceholder">
                    <SideBarNoDataPlaceholder />
                </slot>
            </slot>
        </template>
        <template #footer>
            <slot name="footer">
                <SideBarFooter />
            </slot>
        </template>
        <template #item="{ item, index, onExpand }">
            <slot
                name="item"
                :item="item"
                :index="index"
                :on-expand="onExpand" />
        </template>
    </ExpandingList>
</template>

<script>
export default {
    name: 'SideBar',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Search value
         */
        searchValue: {
            type: String,
            default: '',
        },
        /**
         * List of items
         */
        items: {
            type: Array,
            default: () => [],
        },
        /**
         * Determines if the component has possibility of search for value
         */
        searchable: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the list elements are expanded
         */
        expanded: {
            type: [
                Object,
                Boolean,
            ],
            default: false,
        },
        /**
         * The key of the option
         */
        optionKey: {
            type: String,
            default: 'id',
        },
    },
    computed: {
        isAnyItem() {
            return this.items.length > 0;
        },
        isAnySearchPhrase() {
            return this.searchValue !== '';
        },
        isPlaceholderVisible() {
            return !this.isAnyItem && !this.isAnySearchPhrase;
        },
        isSearchPlaceholderVisible() {
            return !this.isAnyItem && this.isAnySearchPhrase;
        },
    },
    methods: {
        onSearch(value) {
            this.$emit('search', value);
        },
        onClearSearch() {
            this.onSearch('');
        },
    },
};
</script>

<style lang="scss" scoped>
    .side-bar {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
