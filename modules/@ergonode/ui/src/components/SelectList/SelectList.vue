/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VirtualScroll
        :items="items"
        :render-ahead="4"
        :estimated-height="20">
        <template #header>
            <div
                v-if="!isPlaceholderVisible"
                class="select-list-header">
                <slot name="prependHeader" />
                <div class="select-list-header__search">
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
        <template #item="{ item, index }">
            <SelectListElement
                :key="index"
                :index="index"
                :size="size"
                :value="item"
                :multiselect="multiselect"
                :selected="isItemSelected(index)"
                @input="onValueChange">
                <template #option="{ isSelected }">
                    <slot
                        name="item"
                        :item="item"
                        :is-selected="isSelected"
                        :index="index" />
                </template>
            </SelectListElement>
        </template>
    </VirtualScroll>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    VirtualScroll,
} from 'vue-windowing';

export default {
    name: 'SelectList',
    components: {
        VirtualScroll,
    },
    props: {
        /**
         * Map of selected item values
         */
        value: {
            type: [
                Array,
                String,
                Number,
                Object,
            ],
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
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
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
    },
    data() {
        return {
            selectedItems: {},
        };
    },
    computed: {
        stringifiedItems() {
            return this.items.map(option => JSON.stringify(option));
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
    watch: {
        value: {
            immediate: true,
            handler() {
                let selectedItems = {};

                if (Array.isArray(this.value) && this.value.length) {
                    this.value.forEach((option) => {
                        selectedItems[JSON.stringify(option)] = option;
                    });
                } else if (!Array.isArray(this.value) && (this.value || this.value === 0)) {
                    selectedItems = {
                        [JSON.stringify(this.value)]: this.value,
                    };
                }

                this.selectedItems = selectedItems;
            },
        },
    },
    methods: {
        isItemSelected(index) {
            return typeof this.selectedItems[this.stringifiedItems[index]] !== 'undefined';
        },
        onValueChange(index) {
            const value = this.items[index];

            if (this.multiselect) {
                const selectedItems = {
                    ...this.selectedItems,
                };

                if (this.isItemSelected(index)) {
                    delete selectedItems[this.stringifiedItems[index]];
                } else {
                    selectedItems[this.stringifiedItems[index]] = value;
                }

                this.$emit('input', Object.values(selectedItems));
            } else {
                this.$emit('input', value);
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
    .select-list-header {
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

        &__select-all {
            margin-right: 12px;
        }
    }
</style>
