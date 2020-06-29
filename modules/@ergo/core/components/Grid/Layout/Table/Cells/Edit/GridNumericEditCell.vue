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
                :alignment="leftAlignment"
                :error-messages="errorMessages"
                :input="{ type: 'number' }"
                :size="smallSize" />
        </GridTextEditContentCell>
    </GridActivatorEditCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import TextField from '@Core/components/Inputs/TextField';
import {
    ALIGNMENT,
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'GridNumericEditCell',
    components: {
        GridActivatorEditCell,
        GridTextEditContentCell,
        TextField,
    },
    props: {
        value: {
            type: [
                String,
                Number,
            ],
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
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        leftAlignment() {
            return ALIGNMENT.LEFT;
        },
    },
    beforeDestroy() {
        if (+this.localValue !== +this.value) {
            this.$emit('input', this.localValue !== '' ? +this.localValue : '');
        }
    },
};
</script>
