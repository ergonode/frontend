/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot name="value">
            <span v-text="value" />
        </slot>
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
    computed: {
        classes() {
            return [
                'input-select-value',
                `input-select-value--${this.size}`,
                `input-select-value--${this.alignment}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-select-value {
        display: flex;
        align-items: center;
        width: 100%;
        color: $GRAPHITE_DARK;

        & > span {
            flex: 1 1 auto;
            width: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &--left {
            justify-content: flex-start;
        }

        &--center {
            justify-content: center;
        }

        &--small {
            font: $FONT_MEDIUM_12_16;
        }

        &--regular {
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
