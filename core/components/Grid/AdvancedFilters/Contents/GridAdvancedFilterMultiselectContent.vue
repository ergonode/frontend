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
                        :hint="option.value ? `#${option.key} ${languageCode}` : ''"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </ListElement>
        </List>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import { FILTER_OPERATOR } from '~/defaults/operators';
import GridAdvancedFilterBaseContent from '~/core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import List from '~/core/components/List/List';
import ListElement from '~/core/components/List/ListElement';
import ListElementAction from '~/core/components/List/ListElementAction';
import ListElementDescription from '~/core/components/List/ListElementDescription';
import ListElementTitle from '~/core/components/List/ListElementTitle';
import CheckBox from '~/core/components/Inputs/CheckBox';

export default {
    name: 'GridAdvancedFilterMultiselectContent',
    components: {
        GridAdvancedFilterBaseContent,
        List,
        ListElement,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
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
        languageCode: {
            type: String,
            default: '',
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
