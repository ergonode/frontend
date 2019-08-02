/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        ref="grid"
        :class="['grid', {'grid--placeholder': isPlaceholder}]"
        :style="templateColumns">
        <slot />
    </div>
</template>

<script>
import { sum } from '~/model/arrayWrapper';

export default {
    name: 'Grid',
    props: {
        columns: {
            type: Array,
            required: true,
        },
        isPlaceholder: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            rightColumnBoundObserver: null,
            leftColumnBoundObserver: null,
            sentinels: [],
            rightPinnedColumns: [],
        };
    },
    computed: {
        templateColumns() {
            return {
                gridTemplateColumns: this.columnWidths.join(' '),
            };
        },
        columnWidths() {
            return this.columns.map(column => (+column.minWidth ? `minmax(max-content, ${column.minWidth}px)` : column.minWidth));
        },
    },
    mounted() {
        const observer = new IntersectionObserver(((entries) => {
            const { length } = entries;
            for (let i = length - 1; i > -1; i -= 1) {
                const entry = entries[i];
                const { target } = entry;
                if (entry.isIntersecting) {
                    this.rightPinnedColumns.splice(this.rightPinnedColumns.length - 1, 1);
                    this.fireEvent(false, target);
                } else {
                    target.style.right = `${sum(this.rightPinnedColumns)}px`;
                    this.rightPinnedColumns.push(target.offsetWidth);
                    this.fireEvent(true, target);
                }

                console.log(this.rightPinnedColumns);
            }
        }), {
            threshold: [1.0],
        });

        Array.from(this.$el.querySelectorAll('.column__right-pinned')).forEach((el) => {
            observer.observe(el);
        });
    },
    destroyed() {
        // this.sentinels.forEach((el) => {
        //     this.leftColumnBoundObserver.unobserve(el);
        //     this.rightColumnBoundObserver.unobserve(el);
        // });
        // this.leftColumnBoundObserver.disconnect();
        // this.rightColumnBoundObserver.disconnect();
    },
    methods: {
        fireEvent(stuck, target) {
            const e = new CustomEvent('sticky-change', { detail: { stuck, target } });
            target.dispatchEvent(e);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid {
        position: relative;
        display: grid;
        border: 1px solid $grey;
        background-color: $background;
        border-bottom: none;
        overflow: auto;

        &--placeholder {
            flex-shrink: 0;
        }
    }
</style>
