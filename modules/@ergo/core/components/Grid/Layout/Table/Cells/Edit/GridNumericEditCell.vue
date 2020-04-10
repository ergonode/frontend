/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActivatorEditCell>
        <GridTextEditContentCell :style="{width: `${width + 8}px`}">
            <TextField
                v-model="localValue"
                autofocus
                left-alignment
                :error-messages="errorMessages"
                :input="{ type: 'number' }"
                small />
        </GridTextEditContentCell>
    </GridActivatorEditCell>
</template>

<script>
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import TextField from '@Core/components/Inputs/TextField';

export default {
    name: 'GridNumericEditCell',
    components: {
        GridActivatorEditCell,
        GridTextEditContentCell,
        TextField,
    },
    props: {
        value: {
            type: [String, Number],
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
            this.$emit('input', this.localValue !== '' ? +this.localValue : '');
        }
    },
};
</script>
