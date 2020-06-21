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
                v-for="(option, index) in filter.options"
                :key="index"
                :selected="index === selectedOptionIndex"
                @click.native="onSelectValue(option, index)">
                <ListElementDescription>
                    <ListElementTitle
                        :small="true"
                        :hint="option.value ? `#${option.key} ${filter.languageCode}` : ''"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </ListElement>
        </List>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import List from '@Core/components/List/List';
import ListElement from '@Core/components/List/ListElement';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

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
    },
    data() {
        return {
            selectedOptionIndex: -1,
        };
    },
    computed: {
        filterValue() {
            return this.filter.value[FILTER_OPERATOR.EQUAL] || '';
        },
    },
    watch: {
        filterValue: {
            immediate: true,
            handler() {
                this.initSelectedOptions();
            },
        },
    },
    methods: {
        initSelectedOptions() {
            this.selectedOptionIndex = this.filter.options
                .findIndex(option => option.key === this.filterValue);
        },
        onSelectValue(value) {
            this.$emit('input', {
                value: value.key,
                key: FILTER_OPERATOR.EQUAL,
            });
        },
        onEmptyRecordChange(value) {
            this.$emit('emptyRecord', value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-content {
        max-height: 200px;
    }
</style>
