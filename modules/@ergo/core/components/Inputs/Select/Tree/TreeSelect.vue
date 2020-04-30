/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        v-bind="$attrs"
        v-on="$listeners">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #value>
            <span v-text="parsedValue" />
        </template>
        <template #dropdown>
            <List v-if="isOptionsValid">
                <!--TODO: Uncomment when we know how it should work.
                  <DropDownListSearch
                    v-if="$attrs.searchable"
                    :value="searchResult"
                    @input="onSearch"
                    @searchFocused="onSearchFocused" /> -->
                <TreeSelectItem
                    v-for="(option, index) in selectTrees[$attrs.label]"
                    :key="index"
                    v-bind="$attrs"
                    :option="option" />
            </List>
            <List v-else>
                <ListElement
                    :small="$attrs.small"
                    :regular="$attrs.regular">
                    <ListElementDescription> No data </ListElementDescription>
                </ListElement>
            </List>
        </template>
    </Select>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import inputHelpersModule from '@Core/reusableStore/inputHelpers';
import Select from '@Core/components/Inputs/Select/Select';

export default {
    name: 'TreeSelect',
    components: {
        Select,
        List: () => import('@Core/components/List/List'),
        ListElement: () => import('@Core/components/List/ListElement'),
        TreeSelectItem: () => import('@Core/components/Inputs/Select/Tree/TreeSelectItem'),
        ListElementDescription: () => import('@Core/components/List/ListElementDescription'),
        // DropDownListSearch: () => import('@Core/components/Inputs/Select/DropDown/DropDownListSearch'),
    },
    inheritAttrs: false,
    data() {
        return {
            searchResult: '',
        };
    },
    computed: {
        ...mapState('inputHelpers', {
            selectedOptions: state => state.selectedOptions,
            selectTrees: state => state.selectTrees,
        }),
        parsedValue() {
            if (!this.selectedOptions[this.$attrs.label]) return null;
            const values = this.selectedOptions[this.$attrs.label];

            if (Array.isArray(values)) {
                return values.map(val => val.value || `#${val.key}`).join(', ');
            }
            return values.value || values.value.key;
        },
        isOptionsValid() {
            return this.$attrs.options.length && typeof this.$attrs.options[0] === 'object';
        },
    },
    watch: {
        selectedOptions: {
            deep: true,
            immediate: true,
            handler(value) {
                if (value[this.$attrs.label]) {
                    this.$emit('input', value[this.$attrs.label]);
                }
            },
        },
    },
    mounted() {
        this.setSelectTree({
            label: this.$attrs.label,
            options: this.$attrs.options,
        });
        if (Array.isArray(this.$attrs.value)) {
            this.$attrs.value.forEach((val) => {
                this.setOptions({
                    label: this.$attrs.label,
                    option: val,
                });
            });
        } else {
            this.setOption({
                label: this.$attrs.label,
                option: this.$attrs.value,
            });
        }
    },
    beforeCreate() {
        this.$registerStore({
            module: inputHelpersModule,
            moduleName: 'inputHelpers',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('inputHelpers');
    },
    methods: {
        ...mapActions('inputHelpers', [
            'setOption',
            'setOptions',
            'setSelectTree',
        ]),
        // onSearch(value) {
        // },
        // onSearchFocused() {},
    },
};
</script>
