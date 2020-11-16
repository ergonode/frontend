/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Observer
        :options="observerOptions"
        @intersect="onIntersect">
        <div :class="classes" />
    </Observer>
</template>

<script>
import {
    PINNED_COLUMN_STATE,
} from '@Core/defaults/grid';
import Observer from '@UI/components/Events/Observer';

export default {
    name: 'GridSentinelColumn',
    components: {
        Observer,
    },
    props: {
        /**
         * The state of column. Columns might be pinned to the right or left side
         */
        pinnedState: {
            type: String,
            required: true,
            validator: value => Object.values(PINNED_COLUMN_STATE).indexOf(value) !== -1,
        },
    },
    computed: {
        classes() {
            return [
                'column-sentinel',
                {
                    'column-sentinel--left': this.pinnedState === PINNED_COLUMN_STATE.LEFT,
                    'column-sentinel--right': this.pinnedState === PINNED_COLUMN_STATE.RIGHT,
                },
            ];
        },
        observerOptions() {
            return {
                threshold: [
                    0.0,
                ],
            };
        },
    },
    methods: {
        onIntersect(isIntersecting) {
            this.$emit('sticky', {
                isSticky: !isIntersecting,
                state: this.pinnedState,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .column-sentinel {
        position: absolute;
        top: 0;
        width: 1px;
        height: 1px;
        visibility: hidden;

        &--left {
            left: 0;
        }

        &--right {
            right: 0;
        }
    }
</style>
