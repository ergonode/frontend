/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterContent
        :value="value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <List>
            <ListElement
                v-for="(option, index) in options"
                :key="index"
                :size="smallSize"
                :selected="index === selectedOptionIndex"
                @click.native="onSelectValue(option, index)">
                <ListElementDescription>
                    <ListElementTitle
                        :size="smallSize"
                        :hint="option.value ? `#${option.key} ${languageCode}` : ''"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </ListElement>
        </List>
    </GridAdvancedFilterContent>
</template>

<script>
import GridAdvancedFilterContent from '@Core/components/Grid/AdvancedFilters/Content/GridAdvancedFilterContent';
import List from '@Core/components/List/List';
import ListElement from '@Core/components/List/ListElement';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'GridAdvancedFilterSelectContent',
    components: {
        GridAdvancedFilterContent,
        List,
        ListElement,
        ListElementDescription,
        ListElementTitle,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
            }),
        },
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            required: true,
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selectedOptionIndex: -1,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        filterValue() {
            return this.value[FILTER_OPERATOR.EQUAL] || '';
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
            this.selectedOptionIndex = this.options
                .findIndex(option => option.key === this.filterValue);
        },
        onSelectValue(value) {
            this.$emit('input', {
                value: value.key,
                key: FILTER_OPERATOR.EQUAL,
            });
        },
        onEmptyRecordChange(value) {
            this.$emit('input', {
                key: 'isEmptyRecord',
                value,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-content {
        max-height: 200px;
    }
</style>
