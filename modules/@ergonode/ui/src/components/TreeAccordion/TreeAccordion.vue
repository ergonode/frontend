/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ExpandingList
        :items="items"
        :expanded="expanded">
        <template #header>
            <div
                v-if="!isPlaceholderVisible"
                class="tree-accordion-header">
                <slot name="prependHeader" />
                <div class="tree-accordion-header__search">
                    <SelectListSearch
                        v-if="searchable"
                        :placeholder="searchPlaceholder"
                        :value="searchValue"
                        :size="size"
                        @input="onSearch" />
                    <slot name="appendSearchHeader" />
                </div>
                <slot name="appendHeader" />
            </div>
        </template>
        <template #body>
            <slot name="body">
                <slot
                    v-if="isPlaceholderVisible"
                    name="noDataPlaceholder">
                    <SelectListNoDataPlaceholder />
                </slot>
                <slot
                    v-else-if="isSearchPlaceholderVisible"
                    name="noResultsPlaceholder">
                    <SelectListNoResultsPlaceholder @clear="onClearSearch" />
                </slot>
            </slot>
        </template>
        <template #footer>
            <slot name="footer" />
        </template>
        <template #item="{ item, onExpand }">
            <TreeAccordionItem
                :item="item"
                :size="size"
                :multiselect="multiselect"
                :selected-nodes-count="selectedNodesCount[item.id]"
                :selected="selectedItems[item.id]"
                @expand="onExpand"
                @input="onValueChange" />
        </template>
    </ExpandingList>
</template>

<script>

import {
    SIZE,
} from '@Core/defaults/theme';
import SelectListNoDataPlaceholder from '@UI/components/SelectList/SelectListNoDataPlaceholder';
import SelectListNoResultsPlaceholder from '@UI/components/SelectList/SelectListNoResultsPlaceholder';
import SelectListSearch from '@UI/components/SelectList/SelectListSearch';
import TreeAccordionItem from '@UI/components/TreeAccordion/TreeAccordionItem';
import {
    getSelectedItems,
    getSelectedNodesCount,
} from '@UI/models/treeAccordion';
import {
    ExpandingList,
} from 'vue-windowing';

export default {
    name: 'TreeAccordion',
    components: {
        SelectListNoResultsPlaceholder,
        SelectListNoDataPlaceholder,
        ExpandingList,
        TreeAccordionItem,
        SelectListSearch,
    },
    props: {
        /**
         * Map of selected item values
         */
        value: {
            type: [
                Array,
                Object,
            ],
            default: () => [],
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
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.SMALL,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
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
         * Determines if the component is multiple choice
         */
        multiselect: {
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
        selectedNodesCount() {
            return getSelectedNodesCount({
                value: this.value,
                treeStructure: this.items,
            });
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
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                if (Array.isArray(this.value)) {
                    this.selectedItems = getSelectedItems(this.value);
                } else {
                    this.selectedItems[this.value.id] = true;
                }
            },
        },
    },
    methods: {
        onValueChange(item) {
            if (this.multiselect) {
                if (this.selectedItems[item.id]) {
                    this.$emit('input', this.value.filter(({
                        id,
                    }) => id !== item.id));
                } else {
                    this.$emit('input', [
                        ...this.value,
                        item,
                    ]);
                }
            } else {
                this.$emit('input', item);
            }
        },
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
    .tree-accordion-header {
        position: sticky;
        top: 0;
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        flex-direction: column;
        background-color: $WHITE;

        &__search {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
