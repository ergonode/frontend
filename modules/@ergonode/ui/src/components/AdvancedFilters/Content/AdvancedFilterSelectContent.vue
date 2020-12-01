/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilterContent
        :value="value.isEmptyRecord"
        :fixed="true"
        @input="onEmptyRecordChange">
        <VirtualScroll
            v-if="options.length"
            :items="options"
            :root-height="200"
            :render-ahead="4"
            :estimated-height="20">
            <template #item="{ item, index}">
                <ListElement
                    :key="index"
                    :selected="typeof selectedOptions[index] !== 'undefined'"
                    :size="smallSize"
                    @click.native.prevent="onSelectValue(item, index)">
                    <ListElementDescription>
                        <ListElementTitle
                            :size="smallSize"
                            :hint="item.value ? `#${item.key} ${languageCode}` : ''"
                            :title="item.value || `#${item.key}`" />
                    </ListElementDescription>
                </ListElement>
            </template>
        </VirtualScroll>
        <DropdownPlaceholder v-else />
    </AdvancedFilterContent>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import AdvancedFilterContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterContent';
import ListElement from '@UI/components/List/ListElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import {
    VirtualScroll,
} from 'vue-windowing';

export default {
    name: 'AdvancedFilterSelectContent',
    components: {
        AdvancedFilterContent,
        VirtualScroll,
        DropdownPlaceholder,
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
