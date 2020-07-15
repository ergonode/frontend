/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell
        :key-code="27"
        @edit="onEditCell">
        <GridTextEditContentCell :style="positionStyle">
            <TextArea
                height="134px"
                v-model="localValue"
                :autofocus="true"
                :type="underlineInputType"
                :error-messages="errorMessages"
                resize="none" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import GridEditNavigationCell from '@Core/components/Grid/Layout/Table/Cells/Navigation/GridEditNavigationCell';
import TextArea from '@Core/components/Inputs/TextArea';
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';

export default {
    name: 'GridTextAreaEditCell',
    components: {
        GridTextEditContentCell,
        TextArea,
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
            };
        },
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
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
