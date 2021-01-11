/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ExpandingList
        class="side-bar"
        :items="items"
        :expanded="expanded"
        :render-ahead="8">
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
                <DropdownPlaceholder
                    v-if="isSearchPlaceholderVisible"
                    :title="placeholder.title"
                    :subtitle="placeholder.subtitle">
                    <template #action>
                        <ClearSearchButton @click.native.stop="onClearSearch" />
                    </template>
                </DropdownPlaceholder>
            </slot>
        </template>
        <template #footer>
            <slot name="footer">
                <SideBarFooter />
            </slot>
        </template>
        <template #item="{ item, onExpand }">
            <slot
                name="item"
                :item="item"
                :on-expand="onExpand" />
        </template>
    </ExpandingList>
</template>

<script>

import ListSearchHeader from '@UI/components/List/ListSearchHeader';
import ClearSearchButton from '@UI/components/Select/Dropdown/Buttons/ClearSearchButton';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import SideBarFooter from '@UI/components/SideBar/SideBarFooter';
import SideBarStickyHeader from '@UI/components/SideBar/SideBarStickyHeader';
import {
    ExpandingList,
} from 'vue-windowing';

export default {
    name: 'SideBar',
    components: {
        SideBarStickyHeader,
        SideBarFooter,
        ListSearchHeader,
        ExpandingList,
        DropdownPlaceholder,
        ClearSearchButton,
    },
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
         * The placeholder is a helper text for the component
         */
        searchPlaceholder: {
            type: String,
            default: 'Search...',
        },
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
    },
    data() {
        return {
            selectedItems: {},
        };
    },
    computed: {
        placeholder() {
            return {
                title: 'No results',
                subtitle: 'Clear the search and try with another phrase.',
            };
        },
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
        isSelectContentVisible() {
            return this.isAnyItem || this.isAnySearchPhrase;
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
        max-height: 100%;
    }
</style>
