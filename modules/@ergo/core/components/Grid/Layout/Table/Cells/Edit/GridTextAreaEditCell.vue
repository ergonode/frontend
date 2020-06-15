/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActivatorEditCell>
        <RichTextEditor
            v-if="rte"
            :style="{height: '134px'}"
            :value="localValue"
            @blur="onRTEValueChange" />
        <GridTextEditContentCell
            v-else
            :style="{width: `${width + 8}px`}">
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
import RichTextEditor from '@Core/components/Inputs/RichTextEditor/RichTextEditor';

export default {
    name: 'GridTextAreaEditCell',
    components: {
        GridActivatorEditCell,
        GridTextEditContentCell,
        TextArea,
        RichTextEditor,
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
        rte: {
            type: Boolean,
            default: false,
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
        onRTEValueChange(value) {
            if (this.localValue !== value) {
                this.$emit('input', value);
            }
        },
    },
};
</script>
