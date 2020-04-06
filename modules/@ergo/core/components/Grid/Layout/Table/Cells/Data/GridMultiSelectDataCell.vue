/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :disabled="isDisabled"
        :copyable="isCopyable">
        <template #default="{ isEditing }">
            <GridMultiSelectEditCell
                v-if="isEditing"
                :value="value"
                :options="options"
                :language-code="languageCode"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridSelectPresentationCell
                v-else-if="!isEditing && value.length"
                :value="presentationValue"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridSelectPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSelectPresentationCell';

export default {
    name: 'GridMultiSelectDataCell',
    components: {
        GridTableCell,
        GridSelectPresentationCell,
        GridMultiSelectEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridMultiSelectEditCell'),
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        options: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            default: 'EN',
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        isCopyable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        presentationValue() {
            if (!this.data.value) return '';

            return this.data.value.map(option => this.options[option]).join(', ');
        },
        value() {
            if (!this.data.value) return [];

            return this.data.value;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('data', value);
        },
    },
};
</script>
