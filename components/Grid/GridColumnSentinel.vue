/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['column-sentinel', pinnedStateClasses]" />
</template>

<script>
export default {
    name: 'GridColumnSentinel',
    props: {
        columnId: {
            type: String,
            required: true,
        },
        pinnedState: {
            type: String,
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
                'column-sentinel--left': this.pinnedState === 'LEFT',
                'column-sentinel--right': this.pinnedState === 'RIGHT',
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
                        columnId: this.columnId,
                        state: this.pinnedState,
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
