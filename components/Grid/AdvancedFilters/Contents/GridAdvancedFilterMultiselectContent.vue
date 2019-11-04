/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent
        :is-empty-record="isEmptyRecord"
        @input="onEmptyRecordChange">
        <List>
            <ListElement
                v-for="(option, index) in options"
                :key="index"
                @click.native="onSelectValue(option, index)">
                <ListElementAction :small="true">
                    <CheckBox
                        :value="isSelected(index)"
                        @input="onSelectValue(option, index)" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :small="true"
                        :title="option.value || 'No translation'" />
                    <ListElementHint :title="option.key" />
                </ListElementDescription>
            </ListElement>
        </List>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import { FILTER_OPERATOR } from '~/defaults/operators';
import GridAdvancedFilterBaseContent from '~/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import List from '~/components/List/List';
import ListElement from '~/components/List/ListElement';
import ListElementAction from '~/components/List/ListElementAction';
import ListElementDescription from '~/components/List/ListElementDescription';
import ListElementTitle from '~/components/List/ListElementTitle';
import ListElementHint from '~/components/List/ListElementHint';
import CheckBox from '~/components/Inputs/CheckBox';

export default {
    name: 'GridAdvancedFilterMultiselectContent',
    components: {
        GridAdvancedFilterBaseContent,
        List,
        ListElement,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        ListElementHint,
        CheckBox,
    },
    props: {
        filter: {
            type: Object,
            required: true,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selectedOptions: {},
        };
    },
    watch: {
        filterValue: {
            immediate: true,
            handler() {
                this.initSelectedOptions();
            },
        },
    },
    computed: {
        filterValue() {
            if (this.filter
                && this.filter[FILTER_OPERATOR.EQUAL]) return this.filter[FILTER_OPERATOR.EQUAL].split(', ');

            return [];
        },
        isEmptyRecord() {
            if (this.filter) return Boolean(this.filter.isEmptyRecord);

            return false;
        },
    },
    methods: {
        isSelected(index) {
            return typeof this.selectedOptions[index] !== 'undefined';
        },
        initSelectedOptions() {
            if (this.filterValue.length === 0) {
                this.selectedOptions = {};
            } else {
                const { length } = this.filterValue;

                for (let i = 0; i < length; i += 1) {
                    const optionIndex = this.options
                        .findIndex((option) => option.key === this.filterValue[i]);

                    this.selectedOptions[optionIndex] = this.filterValue[i];
                }
            }
        },
        onSelectValue(value, index) {
            if (typeof this.selectedOptions[index] !== 'undefined') {
                delete this.selectedOptions[index];
                this.$emit('input', { value: Object.values(this.selectedOptions).join(', '), operator: FILTER_OPERATOR.EQUAL });
            } else {
                this.$emit('input', { value: [...Object.values(this.selectedOptions), value.key].join(', '), operator: FILTER_OPERATOR.EQUAL });
            }
        },
        onEmptyRecordChange(value) {
            this.$emit('emptyRecord', value);
        },
    },
};
</script>
