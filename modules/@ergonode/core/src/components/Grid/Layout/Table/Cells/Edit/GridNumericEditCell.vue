/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridTextEditContentCell :style="positionStyle">
            <TextField
                v-model="localValue"
                autofocus
                :alignment="leftAlignment"
                :error-messages="errorMessages"
                :input="{ type: 'number' }"
                :size="smallSize"
                :type="underlineType" />
        </GridTextEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridTextEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridTextEditContentCell';
import GridEditNavigationCell from '@Core/components/Grid/Layout/Table/Cells/Navigation/GridEditNavigationCell';
import TextField from '@Core/components/Inputs/TextField';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridNumericEditCell',
    components: {
        GridEditNavigationCell,
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
                width,
                height,
            } = this.bounds;

            return {
                top: `${y}px`,
                left: `${x}px`,
                width: `${width + 8}px`,
                minHeight: `${height + 8}px`,
            };
        },
        underlineType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        leftAlignment() {
            return ALIGNMENT.LEFT;
        },
    },
    methods: {
        ...mapActions('grid', [
            'setEditCell',
        ]),
        onEditCell() {
            if (+this.localValue !== +this.value) {
                this.onValueChange(this.localValue !== '' ? +this.localValue : '');
            }
            document.documentElement.querySelector(`.coordinates-${this.column}-${this.row}`).focus();
            this.setEditCell();
        },
    },
};
</script>
