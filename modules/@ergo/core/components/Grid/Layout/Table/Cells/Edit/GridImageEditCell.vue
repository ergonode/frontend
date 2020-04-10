/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActivatorEditCell>
        <GridImageEditContentCell :style="{width: `${width + 8}px`}">
            <UploadImageFile
                :value="value"
                :height="this.localValue ? 'unset' : '132px'"
                @upload="updateValue"
                @remove="updateValue" />
        </GridImageEditContentCell>
    </GridActivatorEditCell>
</template>

<script>
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import GridImageEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridImageEditContentCell';
import UploadImageFile from '@Core/components/Inputs/UploadFile/UploadImageFile';

export default {
    name: 'GridImageEditCell',
    components: {
        GridActivatorEditCell,
        GridImageEditContentCell,
        UploadImageFile,
    },
    props: {
        value: {
            type: String,
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        width: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            localValue: this.value,
        };
    },
    beforeDestroy() {
        if (this.localValue !== this.value) {
            this.$emit('input', this.localValue);
        }
    },
    methods: {
        updateValue(value) {
            this.localValue = value;
        },
    },
};
</script>
