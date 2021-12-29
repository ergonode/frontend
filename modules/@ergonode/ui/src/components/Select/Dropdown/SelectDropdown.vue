/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Dropdown
        :parent-reference="parentReference"
        :visible="isVisible"
        :fixed="fixedContent"
        @click-outside="onClickOutside">
        <slot name="body">
            <slot name="dropdown">
                <SelectList
                    :items-max-height="itemsMaxHeight"
                    :value="value"
                    :search-value="searchValue"
                    :items="options"
                    :size="size"
                    :searchable="searchable"
                    :multiselect="multiselect"
                    :option-key="optionKey"
                    :option-value="optionValue"
                    @input="onValueChange"
                    @search="onSearch">
                    <template #item="{ index, item, isSelected }">
                        <slot
                            name="item"
                            :item="item"
                            :index="index"
                            :is-selected="isSelected" />
                    </template>
                    <template #noDataPlaceholder>
                        <slot name="noDataPlaceholder" />
                    </template>
                    <template #noResultsPlaceholder>
                        <slot name="noResultsPlaceholder" />
                    </template>
                </SelectList>
                <template v-if="isFooterVisible">
                    <MultiselectDropdownFooter
                        v-if="multiselect"
                        :size="size"
                        @clear="onClear"
                        @apply="onDismiss" />
                    <SelectDropdownFooter
                        v-else
                        :size="size"
                        @clear="onClear"
                        @apply="onDismiss" />
                </template>
            </slot>
        </slot>
    </Dropdown>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    DROPDOWN_MAX_HEIGHT,
} from '@UI/assets/scss/_js-variables/sizes.scss';

export default {
    name: 'SelectDropdown',
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
         * Component value
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
         * Determines visibility of component
         */
        isVisible: {
            type: Boolean,
            default: false,
        },
        /**
         * The vue component reference to which dropdown is hooked
         */
        // eslint-disable-next-line vue/require-prop-types
        parentReference: {
            required: true,
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
    },
    computed: {
        itemsMaxHeight() {
            return DROPDOWN_MAX_HEIGHT;
        },
        isAnyOption() {
            return this.options.length > 0;
        },
        isAnySearchPhrase() {
            return this.searchValue !== '';
        },
        isSearchPlaceholderVisible() {
            return !this.isAnyOption && this.isAnySearchPhrase;
        },
        isPlaceholderVisible() {
            return !this.isAnyOption && !this.isAnySearchPhrase;
        },
        isFooterVisible() {
            if (this.isSearchPlaceholderVisible) {
                return this.clearable;
            }

            if (this.isPlaceholderVisible) {
                return false;
            }

            return this.clearable;
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
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
