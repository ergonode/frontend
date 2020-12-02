/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Dropdown
        :parent-reference="parentReference"
        :visible="isVisible"
        :fixed="fixedContent"
        @click-outside="onClickOutside">
        <slot
            name="placeholder"
            :is-visible="isPlaceholderVisible">
            <DropdownPlaceholder v-if="isPlaceholderVisible" />
        </slot>
        <slot
            :is-visible="isDropdownContentVisible"
            name="dropdown">
            <SelectListSearch
                v-if="searchable"
                :value="searchValue"
                :size="size"
                @input="onSearch" />
            <SelectList
                v-if="isDropdownContentVisible"
                :value="selectedOptions"
                :items="options"
                :size="size"
                :multiselect="multiselect"
                @input="onValueChange">
                <template #item="{ index, item, isSelected }">
                    <slot
                        name="item"
                        :item="item"
                        :index="index"
                        :is-selected="isSelected" />
                </template>
            </SelectList>
            <DropdownPlaceholder
                v-if="isSearchPlaceholderVisible"
                :title="placeholder.title"
                :subtitle="placeholder.subtitle">
                <template #action>
                    <ClearSearchButton @click.native.stop="onClearSearch" />
                </template>
            </DropdownPlaceholder>
        </slot>
        <slot
            v-if="isFooterVisible"
            name="footer"
            :clear="onClear"
            :apply="onDismiss">
            <MultiselectDropdownFooter
                v-if="multiselect"
                :size="size"
                @clear="onClear"
                @apply="onDismiss" />
            <SelectDropdownApplyFooter
                v-else
                :size="size"
                @clear="onClear" />
        </slot>
    </Dropdown>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import ClearSearchButton from '@UI/components/Select/Dropdown/Buttons/ClearSearchButton';
import Dropdown from '@UI/components/Select/Dropdown/Dropdown';
import MultiselectDropdownFooter from '@UI/components/Select/Dropdown/Footers/MultiselectDropdownFooter';
import SelectDropdownApplyFooter from '@UI/components/Select/Dropdown/Footers/SelectDropdownApplyFooter';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import SelectList from '@UI/components/Select/List/SelectList';
import SelectListSearch from '@UI/components/Select/List/SelectListSearch';

export default {
    name: 'SelectDropdown',
    components: {
        ClearSearchButton,
        MultiselectDropdownFooter,
        SelectDropdownApplyFooter,
        Dropdown,
        SelectList,
        DropdownPlaceholder,
        SelectListSearch,
    },
    props: {
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
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the selected value is clearable
         */
        clearable: {
            type: Boolean,
            default: false,
        },
        /**
         * The flag which tells if the dropdown has fixed content to it's parent width
         */
        fixedContent: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component has possibility of search for value
         */
        searchable: {
            type: Boolean,
            default: false,
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Array,
            default: () => [],
        },
        /**
         * Map of selected option values
         */
        selectedOptions: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Search value
         */
        searchValue: {
            type: String,
            default: '',
        },
        /**
         * Determines visibility of component
         */
        isVisible: {
            type: Boolean,
            default: false,
        },
        /**
         * The vue component reference to which dropdown is hooked
         */
        parentReference: {
            required: true,
        },
    },
    computed: {
        placeholder() {
            return {
                title: 'No results',
                subtitle: 'Clear the search and try with another phrase.',
            };
        },
        isAnyOption() {
            return this.options.length > 0;
        },
        isAnySearchPhrase() {
            return this.searchValue !== '';
        },
        isPlaceholderVisible() {
            return !this.isAnyOption && !this.isAnySearchPhrase;
        },
        isSearchPlaceholderVisible() {
            return !this.isAnyOption && this.isAnySearchPhrase;
        },
        isDropdownContentVisible() {
            return this.isAnyOption || this.isAnySearchPhrase;
        },
        isFooterVisible() {
            return this.clearable && this.isAnyOption;
        },
    },
    methods: {
        onClickOutside(payload) {
            this.$emit('click-outside', payload);
        },
        onDismiss() {
            this.$emit('dismiss');
        },
        onClear() {
            this.$emit('clear');
        },
        onSearch(value) {
            this.$emit('search', value);
        },
        onClearSearch() {
            this.onSearch('');
        },
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
