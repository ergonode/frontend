/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Dropdown
        :parent-reference="parentReference"
        :visible="isVisible"
        :fixed="fixedContent"
        @height="onHeightChange"
        @click-outside="onClickOutside">
        <slot
            name="placeholder"
            :is-visible="isPlaceholderVisible">
            <DropdownPlaceholder v-if="isPlaceholderVisible" />
        </slot>
        <slot
            :is-visible="isDropdownContentVisible"
            name="dropdown">
            <template v-if="isDropdownContentVisible">
                <DropdownListSearch
                    v-if="searchable"
                    :value="searchResult"
                    :size="size"
                    @input="onSearch" />
                <VirtualScroll
                    v-if="options.length"
                    :items="options"
                    :root-height="dropdownHeight"
                    :render-ahead="4"
                    :estimated-height="20">
                    <template #item="{ item, index}">
                        <DropdownListElement
                            :key="index"
                            :index="index"
                            :size="size"
                            :value="item"
                            :selected="isOptionSelected(index)"
                            @input="onSelectValue">
                            <template #option="{ isSelected }">
                                <slot
                                    name="option"
                                    :option="item"
                                    :is-selected="isSelected"
                                    :index="index" />
                            </template>
                        </DropdownListElement>
                    </template>
                </VirtualScroll>
            </template>
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
import DropdownListElement from '@UI/components/Select/Dropdown/List/DropdownListElement';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import {
    VirtualScroll,
} from 'vue-windowing';

export default {
    name: 'SelectDropdown',
    components: {
        VirtualScroll,
        ClearSearchButton,
        MultiselectDropdownFooter,
        SelectDropdownApplyFooter,
        Dropdown,
        DropdownListElement,
        DropdownPlaceholder,
        DropdownListSearch: () => import('@UI/components/Select/Dropdown/List/DropdownListSearch'),
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
         * Search result
         */
        searchResult: {
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
    data() {
        return {
            dropdownHeight: 400,
        };
    },
    computed: {
        placeholder() {
            return {
                title: 'No results',
                subtitle: 'Clear the search and try with another phrase.',
            };
        },
        stringifiedOptions() {
            return this.options.map(option => JSON.stringify(option));
        },
        isAnyOption() {
            return this.options.length > 0;
        },
        isAnySearchPhrase() {
            return this.searchResult !== '';
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
        onHeightChange(height) {
            this.dropdownHeight = height;
        },
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
        onSelectValue(index) {
            const value = this.options[index];

            if (this.multiselect) {
                const selectedOptions = {
                    ...this.selectedOptions,
                };

                if (this.isOptionSelected(index)) {
                    delete selectedOptions[this.stringifiedOptions[index]];
                } else {
                    selectedOptions[this.stringifiedOptions[index]] = value;
                }

                this.$emit('input', Object.values(selectedOptions));
            } else {
                this.$emit('input', value);
            }
        },
        isOptionSelected(index) {
            return typeof this.selectedOptions[this.stringifiedOptions[index]] !== 'undefined';
        },
    },
};
</script>
