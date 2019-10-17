/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['column-sentinel', pinnedStateClasses]" />
</template>

<script>
import { PINNED_COLUMN_STATE } from '~/defaults/grid/main';

export default {
    name: 'GridSentinelColumn',
    props: {
        index: {
            type: Number,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            observer: null,
        };
    },
    mounted() {
        this.initializeObserver();

        this.observer.observe(this.$el);
    },
    beforeDestroy() {
        this.observer.unobserve(this.$el);
    },
    computed: {
        pinnedStateClasses() {
            return {
                'column-sentinel--left': this.column.state === PINNED_COLUMN_STATE.LEFT,
                'column-sentinel--right': this.column.state === PINNED_COLUMN_STATE.RIGHT,
            };
        },
    },
    methods: {
        initializeObserver() {
            this.observer = new IntersectionObserver(((entries) => {
                const { length } = entries;
                for (let i = length - 1; i > -1; i -= 1) {
                    const entry = entries[i];
                    this.$emit('sticky', {
                        sticky: !entry.isIntersecting,
                        columnId: this.column.id,
                        index: this.index,
                        state: this.column.state,
                    });
                }
            }), {
                threshold: [0.0],
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
