/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropDown
            v-show="isVisible"
            :offset="offset"
            :fixed-content="isSelectKind">
            <template #body>
                <Component
                    :is="selectBodyComponent"
                    :filter="filter"
                    :value="filter.value"
                    :language-code="filter.languageCode"
                    @emptyRecord="onEmptyRecordChange"
                    @input="onValueChange" />
            </template>
            <template #footer>
                <Component
                    :is="selectFooterComponent"
                    @apply="onApply"
                    @clear="onClear" />
            </template>
        </DropDown>
    </FadeTransition>
</template>

<script>
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import DropDown from '@Core/components/Inputs/Select/DropDown/DropDown';
import { COLUMN_FILTER_TYPE } from '@Core/defaults/grid';

export default {
    name: 'AdvancedFilterDropDown',
    components: {
        FadeTransition,
        DropDown,
    },
    props: {
        filter: {
            type: Object,
            required: true,
        },
        offset: {
            type: Object,
            required: true,
        },
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isSelectKind() {
            return this.filter.type === COLUMN_FILTER_TYPE.SELECT
                || this.filter.type === COLUMN_FILTER_TYPE.MULTI_SELECT;
        },
        selectFooterComponent() {
            switch (this.filter.type) {
            case COLUMN_FILTER_TYPE.SELECT:
                return () => import('@Core/components/Inputs/Select/DropDown/Footers/SelectDropdownFooter');
            case COLUMN_FILTER_TYPE.MULTI_SELECT:
            case COLUMN_FILTER_TYPE.DATE:
            case COLUMN_FILTER_TYPE.NUMERIC:
                return () => import('@Core/components/Inputs/Select/DropDown/Footers/MultiselectDropdownFooter');
            default: return () => import('@Core/components/Inputs/Select/DropDown/Footers/SelectDropdownApplyFooter');
            }
        },
        selectBodyComponent() {
            switch (this.filter.type) {
            case COLUMN_FILTER_TYPE.SELECT:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterSelectContent');
            case COLUMN_FILTER_TYPE.MULTI_SELECT:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterMultiselectContent');
            case COLUMN_FILTER_TYPE.TEXT:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
            case COLUMN_FILTER_TYPE.DATE:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterDateContent');
            case COLUMN_FILTER_TYPE.NUMERIC:
                return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterRangeContent');
            default: return () => import('@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterTextContent');
            }
        },
    },
    methods: {
        onValueChange(payload) {
            this.$emit('input', payload);
        },
        onEmptyRecordChange(isEmptyRecord) {
            this.$emit('input', {
                key: 'isEmptyRecord',
                value: isEmptyRecord,
            });
        },
        onClear() {
            this.$emit('clear');
        },
        onApply() {
            this.$emit('apply');
        },
    },
};
</script>
