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
                :size="smallSize"
                :type="underlineInputType"
                :error-messages="errorMessages" />
        </GridTextEditContentCell>
    </GridActivatorEditCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import TextField from '@Core/components/Inputs/TextField';
import {
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'GridTextEditCell',
    components: {
        GridActivatorEditCell,
        GridTextEditContentCell,
        TextField,
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
    computed: {
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (this.localValue !== this.value) {
            this.$emit('input', this.localValue);
        }
    },
};
</script>
