/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent
        :is-empty-record="filter.value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <List>
            <ListElement
                v-for="(option, index) in options"
                :key="index"
                :selected="index === selectedOptionIndex"
                @click.native="onSelectValue(option, index)">
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
import ListElementDescription from '~/core/components/List/ListElementDescription';
import ListElementTitle from '~/core/components/List/ListElementTitle';

export default {
    name: 'GridAdvancedFilterSelectContent',
    components: {
        GridAdvancedFilterBaseContent,
        List,
        ListElement,
        ListElementDescription,
        ListElementTitle,
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
            selectedOptionIndex: -1,
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
            return this.filter.value[FILTER_OPERATOR.EQUAL] || '';
        },
    },
    methods: {
        initSelectedOptions() {
            this.selectedOptionIndex = this.options
                .findIndex((option) => option.key === this.filterValue);
        },
        onSelectValue(value) {
            this.$emit('input', { value: value.key, operator: FILTER_OPERATOR.EQUAL });
        },
        onEmptyRecordChange(value) {
            this.$emit('emptyRecord', value);
        },
    },
};
</script>
