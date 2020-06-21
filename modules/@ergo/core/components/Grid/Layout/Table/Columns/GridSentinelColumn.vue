/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes" />
</template>

<script>
import {
    PINNED_COLUMN_STATE,
} from '@Core/defaults/grid';

export default {
    name: 'GridSentinelColumn',
    props: {
        pinnedState: {
            type: String,
            required: true,
            validator: value => Object.values(PINNED_COLUMN_STATE).indexOf(value) !== -1,
        },
    },
    data() {
        return {
            observer: null,
        };
    },
    computed: {
        classes() {
            return [
                'column-sentinel',
                {
                    'column-sentinel--left': this.pinnedState === PINNED_COLUMN_STATE.LEFT,
                    'column-sentinel--right': this.pinnedState === PINNED_COLUMN_STATE.RIGHT,
                }
            ];
        },
    },
    mounted() {
        this.initializeObserver();

        this.observer.observe(this.$el);
    },
    beforeDestroy() {
        this.observer.unobserve(this.$el);
    },
    methods: {
        initializeObserver() {
            this.observer = new IntersectionObserver(((entries) => {
                const {
                    length,
                } = entries;
                for (let i = length - 1; i > -1; i -= 1) {
                    const entry = entries[i];
                    this.$emit('sticky', {
                        isSticky: !entry.isIntersecting,
                        state: this.pinnedState,
                    });
                }
            }), {
                threshold: [
                    0.0,
                ],
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
