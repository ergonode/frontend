/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ExpandingList
        :items="items"
        :expanded="expanded">
        <template #header>
            <div class="select-list-header">
                <slot name="prependHeader" />
                <div class="select-list-header__search">
                    <SelectListSearch
                        v-if="searchable"
                        :placeholder="searchPlaceholder"
                        :value="searchValue"
                        :size="size"
                        @input="onSearch" />
                    <CheckBox
                        v-if="selectable && !isSearchPlaceholderVisible"
                        class="select-list-header__select-all"
                        label="Select all"
                        reversed />
                </div>
                <slot name="appendHeader" />
            </div>
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
            <slot name="footer" />
        </template>
        <template #item="{ item, onExpand }">
            <TreeAccordionItem
                :item="item"
                :size="size"
                :multiselect="multiselect"
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
import CheckBox from '@UI/components/CheckBox/CheckBox';
import ClearSearchButton from '@UI/components/Select/Dropdown/Buttons/ClearSearchButton';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import SelectListSearch from '@UI/components/SelectList/SelectListSearch';
import TreeAccordionItem from '@UI/components/TreeAccordion/TreeAccordionItem';
import {
    ExpandingList,
} from 'vue-windowing';

export default {
    name: 'TreeAccordion',
    components: {
        ExpandingList,
        TreeAccordionItem,
        DropdownPlaceholder,
        ClearSearchButton,
        SelectListSearch,
        CheckBox,
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
         * Determines if the component is selectable
         */
        selectable: {
            type: Boolean,
            default: false,
        },
        expanded: {
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
    watch: {
        value: {
            immediate: true,
            handler() {
                if (Array.isArray(this.value)) {
                    this.selectedItems = this.value.reduce((prev, curr) => {
                        const tmp = prev;
                        tmp[curr.id] = true;
                        return tmp;
                    }, {});
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
