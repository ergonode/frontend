/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActivatorEditCell>
        <GridTextEditContentCell :style="{width: `${width + 8}px`}">
            <TextArea
                :style="{height: '134px'}"
                v-model="localValue"
                :autofocus="true"
                :left-alignment="true"
                :error-messages="errorMessages"
                resize="none" />
        </GridTextEditContentCell>
    </GridActivatorEditCell>
</template>

<script>
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import TextArea from '@Core/components/Inputs/TextArea';

export default {
    name: 'GridTextAreaEditCell',
    components: {
        GridActivatorEditCell,
        GridTextEditContentCell,
        TextArea,
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
};
</script>
