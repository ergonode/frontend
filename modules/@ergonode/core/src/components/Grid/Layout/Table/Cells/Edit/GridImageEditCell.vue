/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <GridImageEditContentCell>
                <UploadImageFile
                    v-model="localValue"
                    height="181px" />
            </GridImageEditContentCell>
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridImageEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridImageEditContentCell';
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import GridEditNavigationCell from '@Core/components/Grid/Layout/Table/Cells/Navigation/GridEditNavigationCell';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';

export default {
    name: 'GridImageEditCell',
    components: {
        UploadImageFile,
        GridSelectEditContentCell,
        GridImageEditContentCell,
        GridEditNavigationCell,
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
        bounds: {
            type: [
                DOMRect,
                Object,
            ],
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        onValueChange: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            localValue: this.value,
        };
    },
    computed: {
        positionStyle() {
            const {
                x,
                y,
            } = this.bounds;

            return {
                top: `${y}px`,
                left: `${x}px`,
                width: '304px',
            };
        },
    },
    methods: {
        onEditCell() {
            if (this.localValue !== this.value) {
                this.onValueChange(this.localValue);
            }

            this.$emit('dismiss');
        },
    },
};
</script>
