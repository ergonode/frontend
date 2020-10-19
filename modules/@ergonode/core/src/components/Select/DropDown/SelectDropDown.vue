/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropDown
            v-show="isVisible"
            :offset="offset"
            :fixed="fixedContent"
            @click-outside="onClickOutside">
            <template #body>
                <slot name="dropdown">
                    <List>
                        <DropDownListSearch
                            v-if="searchable"
                            :value="searchResult"
                            :sticky="stickySearch"
                            @input="onSearch" />
                        <ListElement
                            v-for="(option, index) in options"
                            :key="index"
                            :size="size"
                            :disabled="option.disabled"
                            :selected="isOptionSelected(index)"
                            @click.native.prevent="onSelectValue(option, index)">
                            <template #default="{ isSelected }">
                                <slot
                                    name="option"
                                    :option="option"
                                    :is-selected="isSelected"
                                    :index="index">
                                    <template v-if="isOptionsValid">
                                        <ListElementAction
                                            v-if="multiselect"
                                            :size="size">
                                            <CheckBox
                                                :value="isSelected" />
                                        </ListElementAction>
                                        <ListElementDescription>
                                            <ListElementTitle
                                                :size="size"
                                                :title="option" />
                                        </ListElementDescription>
                                    </template>
                                </slot>
                            </template>
                        </ListElement>
                    </List>
                </slot>
            </template>
            <template
                v-if="clearable"
                #footer>
                <slot
                    name="footer"
                    :clear="onClear"
                    :apply="onDismiss">
                    <DropDownFooter
                        :size="size"
                        :space-between="multiselect">
                        <Button
                            v-if="multiselect"
                            :size="tinySize"
                            title="OK"
                            @click.native="onDismiss" />
                        <Button
                            :size="tinySize"
                            :title="multiselect ? 'CLEAR ALL' : 'CLEAR'"
                            :theme="secondaryTheme"
                            @click.native="onClear" />
                    </DropDownFooter>
                </slot>
            </template>
        </DropDown>
    </FadeTransition>
</template>

<script>
import CheckBox from '@Core/components/CheckBox/CheckBox';
import List from '@Core/components/List/List';
import ListElement from '@Core/components/List/ListElement';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import DropDown from '@Core/components/Select/DropDown/DropDown';
import DropDownFooter from '@Core/components/Select/DropDown/Footers/DropDownFooter';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    isObject,
} from '@Core/models/objectWrapper';

export default {
    name: 'SelectDropDown',
    components: {
        FadeTransition,
        DropDown,
        DropDownFooter,
        List,
        ListElement,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        CheckBox,
        Button: () => import('@Core/components/Button/Button'),
        DropDownListSearch: () => import('@Core/components/Select/DropDown/DropDownListSearch'),
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
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        stringifiedOptions() {
            return this.options.map(option => JSON.stringify(option));
        },
        isOptionsValid() {
            return this.options.length && !isObject(this.options[0]);
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
        onSelectValue(value, index) {
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
            return true;
        },
        isOptionSelected(index) {
            return typeof this.selectedOptions[this.stringifiedOptions[index]] !== 'undefined';
        },
    },
};
</script>
