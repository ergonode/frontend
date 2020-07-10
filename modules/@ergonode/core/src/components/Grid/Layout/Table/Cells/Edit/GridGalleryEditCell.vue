/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActivatorEditCell>
        <GridImageEditContentCell :style="{width: `${width + 8}px`}">
            <UploadImageFile
                :value="localValue"
                height="132px"
                :multiple="true"
                @input="updateValue" />
        </GridImageEditContentCell>
    </GridActivatorEditCell>
</template>

<script>
import GridImageEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridImageEditContentCell';
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import UploadImageFile from '@Core/components/Inputs/UploadFile/UploadImageFile';

export default {
    name: 'GridGalleryEditCell',
    components: {
        UploadImageFile,
        GridActivatorEditCell,
        GridImageEditContentCell,
    },
    props: {
        value: {
            type: Array,
            default: () => [],
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
