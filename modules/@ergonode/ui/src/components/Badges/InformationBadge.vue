/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :style="styles">
        <slot name="prepend" />
        <BadgeLabel :label="title" />
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    GRAPHITE_DARK,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'InformationBadge',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Background color of badge
         */
        background: {
            type: String,
            default: WHITE,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        /**
         * Color of the badge label
         */
        color: {
            type: String,
            default: GRAPHITE_DARK,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * Determinates if the badge has box shadow
         */
        shadow: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'badge',
                `badge--${this.size}`,
                {
                    'badge--shadow': this.shadow,
                },
            ];
        },
        styles() {
            return {
                backgroundColor: this.background,
                color: this.color,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .badge {
        display: flex;
        align-items: center;
        width: fit-content;

        &--shadow {
            box-shadow: $ELEVATOR_2_DP;
        }

        &--small {
            height: 16px;
            padding: 0 4px;
        }

        &--regular {
            height: 24px;
            padding: 0 8px;
        }
    }
</style>
