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
            <GridSelectEditCell
                v-if="isEditing"
                :value="value"
                :options="options"
                :language-code="languageCode"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridSelectPresentationCell
                v-else-if="!isEditing && value"
                :value="value"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridSelectPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSelectPresentationCell';

export default {
    name: 'GridSelectDataCell',
    components: {
        GridTableCell,
        GridSelectPresentationCell,
        GridSelectEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridSelectEditCell'),
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
        value() {
            if (!this.data.value) return '';

            return this.options[this.data.value];
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('data', value);
        },
    },
};
</script>
