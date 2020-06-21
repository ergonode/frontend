/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="input-select-value">
        <span v-text="value">
            <slot name="value" />
        </span>
    </div>
</template>

<script>
import {
    ALIGNMENT,
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'InputSelectValue',
    props: {
        value: {
            type: [
                Object,
                String,
                Number,
            ],
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-select-value {
        display: flex;
        width: 100%;

        & > span {
            flex: 1 1 auto;
            width: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
</style>
