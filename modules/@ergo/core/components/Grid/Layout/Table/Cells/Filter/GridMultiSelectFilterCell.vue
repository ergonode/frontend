/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :disabled="isDisabled">
        <template #default="{ isEditing }">
            <GridMultiSelectEditCell
                v-if="isEditing"
                :value="value"
                :options="options"
                :language-code="languageCode"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridSelectFilterPresentationCell
                v-else
                :value="presentationValue" />
        </template>
    </GridTableCell>
</template>

<script>
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridSelectFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSelectFilterPresentationCell';

export default {
    name: 'GridMultiSelectFilterCell',
    components: {
        GridSelectFilterPresentationCell,
        GridTableCell,
        GridMultiSelectEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridMultiSelectEditCell'),
    },
    props: {
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        data: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            default: 'EN',
        },
        filter: {
            type: Object,
            default: null,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        options() {
            if (this.data.options) {
                // TODO: BE has to unify types!
                if (Array.isArray(this.data.options)) return {};

                return this.data.options;
            }

            return {};
        },
        presentationValue() {
            if (!this.filter) return '';

            return this.filter.value.map(option => this.options[option].label || `#${this.options[option].code}`).join(', ');
        },
        value() {
            if (!this.filter) return [];

            return this.filter.value;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('filter', {
                index: this.columnIndex,
                value,
                operator: FILTER_OPERATOR.EQUAL,
            });
        },
    },
};
</script>
