/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="select-list">
        <div
            v-if="!isPlaceholderVisible"
            class="select-list__header">
            <slot name="prependHeader" />
            <div class="select-list__search">
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
            <DynamicScroller
                v-if="!isPlaceholderVisible && !isSearchPlaceholderVisible"
                :style="{ maxHeight: itemsMaxHeight }"
                :items="items"
                :key-field="optionKey"
                :min-item-size="minItemSize">
                <template #default="{ item, index, active }">
                    <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :index="index">
                        <SelectListElement
                            :key="index"
                            :index="index"
                            :size="size"
                            :value="item"
                            :multiselect="multiselect"
                            :option-key="optionKey"
                            :option-value="optionValue"
                            :selected="selectedItems[item[optionKey] || item]"
                            @input="onValueChange">
                            <template #option="{ isSelected }">
                                <slot
                                    name="item"
                                    :item="item"
                                    :is-selected="isSelected"
                                    :index="index" />
                            </template>
                        </SelectListElement>
                    </DynamicScrollerItem>
                </template>
            </DynamicScroller>
        </slot>
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'SelectList',
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
        /**
         * The key of the option
         */
        optionKey: {
            type: String,
            default: '',
        },
        /**
         * The key of the value
         */
        optionValue: {
            type: String,
            default: '',
        },
        /**
         * The max height of elements list
         */
        itemsMaxHeight: {
            type: String,
            default: '100%',
        },
    },
    computed: {
        minItemSize() {
            switch (this.size) {
            case SIZE.SMALL:
                return 32;
            case SIZE.REGULAR:
                return 40;
            case SIZE.LARGE:
                return 48;
            default: return 48;
            }
        },
        selectedItems() {
            if (!this.value) {
                return {};
            }

            let value = [
                this.value,
            ];

            if (this.multiselect) {
                value = this.value;
            }

            if (this.optionKey) {
                return value.reduce((prev, curr) => ({
                    ...prev,
                    [curr[this.optionKey]]: true,
                }), {});
            }

            return value.reduce((prev, curr) => ({
                ...prev,
                [curr]: true,
            }), {});
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
        onValueChange(index) {
            const value = this.items[index];

            if (this.multiselect) {
                const isSelected = this.optionKey
                    ? this.selectedItems[value[this.optionKey]]
                    : this.selectedItems[value];

                if (isSelected) {
                    this.$emit('input', this.value.filter((item) => {
                        if (this.optionKey) {
                            return item[this.optionKey] !== value[this.optionKey];
                        }

                        return item !== value;
                    }));
                } else {
                    this.$emit('input', [
                        ...this.value,
                        value,
                    ]);
                }
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
    .select-list {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;

        &__header {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_1;
            display: flex;
            flex-direction: column;
            background-color: $WHITE;
        }

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
