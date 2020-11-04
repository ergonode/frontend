/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <Dropdown
            v-show="isVisible"
            :offset="offset"
            :fixed="fixedContent"
            @click-outside="onClickOutside">
            <slot
                name="placeholder"
                :is-visible="isPlaceholderVisible">
                <DropdownPlaceholder v-if="isPlaceholderVisible" />
            </slot>
            <template v-if="isDropdownContentVisible">
                <slot name="dropdown">
                    <List>
                        <DropdownListSearch
                            v-if="searchable"
                            :value="searchResult"
                            :sticky="stickySearch"
                            @input="onSearch" />
                        <DropdownListElement
                            v-for="(option, index) in options"
                            :key="index"
                            :index="index"
                            :size="size"
                            :value="option"
                            :selected="isOptionSelected(index)"
                            @input="onSelectValue">
                            <template #option="{ isSelected }">
                                <slot
                                    name="option"
                                    :option="option"
                                    :is-selected="isSelected"
                                    :index="index" />
                            </template>
                        </DropdownListElement>
                        <DropdownPlaceholder
                            v-if="isSearchPlaceholderVisible"
                            :title="placeholder.title"
                            :subtitle="placeholder.subtitle">
                            <template #action>
                                <ClearSearchButton @click.native.stop="onClearSearch" />
                            </template>
                        </DropdownPlaceholder>
                    </List>
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
            </template>
        </Dropdown>
    </FadeTransition>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import List from '@UI/components/List/List';
import ClearSearchButton from '@UI/components/Select/Dropdown/Buttons/ClearSearchButton';
import Dropdown from '@UI/components/Select/Dropdown/Dropdown';
import MultiselectDropdownFooter from '@UI/components/Select/Dropdown/Footers/MultiselectDropdownFooter';
import SelectDropdownApplyFooter from '@UI/components/Select/Dropdown/Footers/SelectDropdownApplyFooter';
import DropdownListElement from '@UI/components/Select/Dropdown/List/DropdownListElement';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import FadeTransition from '@UI/components/Transitions/FadeTransition';

export default {
    name: 'SelectDropdown',
    components: {
        ClearSearchButton,
        MultiselectDropdownFooter,
        SelectDropdownApplyFooter,
        FadeTransition,
        Dropdown,
        List,
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
         * Determines stickiness of search
         */
        stickySearch: {
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
         * Determines position where component will be anchored
         */
        offset: {
            type: Object,
            required: true,
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
    },
    computed: {
        placeholder() {
            return {
                title: 'No results',
                subtitle: 'Clear the search and try with another phrase.',
            }
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
