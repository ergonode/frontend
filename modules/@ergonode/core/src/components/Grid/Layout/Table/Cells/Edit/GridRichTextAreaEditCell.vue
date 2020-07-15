/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell
        :key-code="27"
        @edit="onEditCell">
        <GridTextEditContentCell :style="positionStyle">
            <RichTextEditor
                :style="{height: '134px'}"
                :value="localValue"
                :autofocus="true"
                :type="underlineInputType"
                @blur="onRTEValueChange" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import GridEditNavigationCell from '@Core/components/Grid/Layout/Table/Cells/Navigation/GridEditNavigationCell';
import RichTextEditor from '@Core/components/Inputs/RichTextEditor/RichTextEditor';
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';

export default {
    name: 'GridTextAreaEditCell',
    components: {
        GridTextEditContentCell,
        RichTextEditor,
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
                width: '320px',
            };
        },
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
    },
    methods: {
        onRTEValueChange(value) {
            if (this.localValue !== value) {
                this.localValue = value;
            }
        },
        onEditCell() {
            if (this.localValue !== this.value) {
                this.onValueChange(this.localValue);
            }

            this.$emit('dismiss');
        },
    },
};
</script>
