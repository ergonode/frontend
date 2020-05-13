/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropDown
            v-show="isVisible"
            :offset="offset"
            :fixed="fixedContent">
            <template #body>
                <slot name="dropdown">
                    <List>
                        <DropDownListSearch
                            v-if="searchable"
                            :value="searchResult"
                            @input="onSearch"
                            @searchFocused="onSearchFocused" />
                        <ListElement
                            v-for="(option, index) in options"
                            :key="index"
                            :small="small"
                            :regular="regular"
                            :disabled="option.disabled || false"
                            :selected="isOptionSelected(index)"
                            @click.native.prevent="onSelectValue(option, index)">
                            <template #default="{ isSelected }">
                                <slot
                                    name="option"
                                    :option="option"
                                    :small="small"
                                    :is-selected="isSelected"
                                    :index="index">
                                    <template v-if="isOptionsValid">
                                        <ListElementAction
                                            v-if="multiselect"
                                            :small="small">
                                            <CheckBox
                                                :value="isSelected"
                                                :disabled="option.disabled || false" />
                                        </ListElementAction>
                                        <ListElementDescription>
                                            <ListElementTitle
                                                :small="small"
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
                        :small="small"
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
import { SIZE, THEME } from '@Core/defaults/theme';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import DropDown from '@Core/components/Inputs/Select/DropDown/DropDown';
import DropDownFooter from '@Core/components/Inputs/Select/DropDown/Footers/DropDownFooter';
import List from '@Core/components/List/List';
import ListElement from '@Core/components/List/ListElement';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import CheckBox from '@Core/components/Inputs/CheckBox';

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
        Button: () => import('@Core/components/Buttons/Button'),
        DropDownListSearch: () => import('@Core/components/Inputs/Select/DropDown/DropDownListSearch'),
    },
    props: {
        small: {
            type: Boolean,
            default: false,
        },
        regular: {
            type: Boolean,
            default: false,
        },
        multiselect: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        fixedContent: {
            type: Boolean,
            default: false,
        },
        searchable: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
        offset: {
            type: Object,
            required: true,
        },
        selectedOptions: {
            type: Object,
            default: () => ({}),
        },
        searchResult: {
            type: String,
            default: '',
        },
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
            return this.options.length && typeof this.options[0] !== 'object';
        },
    },
    methods: {
        onDismiss() {
            this.$emit('dismiss');
        },
        onClear() {
            this.$emit('clear');
        },
        onSearch(value) {
            this.$emit('search', value);
        },
        onSearchFocused(isFocused) {
            this.$emit('searchFocus', isFocused);
        },
        onSelectValue(value, index) {
            if (value.disabled) return false;
            if (this.multiselect) {
                const selectedOptions = { ...this.selectedOptions };

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
