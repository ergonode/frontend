/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActivatorEditCell>
        <GridImageEditContentCell :style="{width: `${width + 8}px`}">
            <UploadImageFileNew
                :value="value"
                height="132px"
                @input="updateValue" />
        </GridImageEditContentCell>
    </GridActivatorEditCell>
</template>

<script>
import GridImageEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridImageEditContentCell';
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import UploadImageFile from '@Core/components/Inputs/UploadFile/UploadImageFile';

import UploadImageFileNew from '../../../../../Inputs/UploadFile/UploadImageFileNew';

export default {
    name: 'GridImageEditCell',
    components: {
        UploadImageFileNew,
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
