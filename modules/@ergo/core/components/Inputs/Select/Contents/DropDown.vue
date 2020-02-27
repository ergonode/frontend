/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['drop-down', {'drop-down--fixed': fixed}]"
        :style="position">
        <slot name="body" />
        <slot name="footer" />
    </div>
</template>

<script>

export default {
    name: 'DropDown',
    props: {
        fixed: {
            type: Boolean,
            default: false,
        },
        offset: {
            type: Object,
            default: () => ({
                x: 0, y: 0, width: 0, height: 0,
            }),
        },
    },
    data() {
        return {
            position: {},
        };
    },
    mounted() {
        window.requestAnimationFrame(() => {
            const {
                height,
            } = this.$el.getBoundingClientRect();
            const { innerHeight } = window;
            let maxHeight = 200;
            const position = { };

            if (this.fixed) {
                position.maxHeight = `${maxHeight}px`;
                position.width = `${this.offset.width}px`;
            } else {
                maxHeight = height;
            }

            if (innerHeight - this.offset.y < maxHeight) {
                position.bottom = `${this.offset.height}px`;
            } else {
                position.top = `${this.offset.height}px`;
            }

            this.position = position;
        });
    },
};
</script>

<style lang="scss" scoped>
    .drop-down {
        position: absolute;
        z-index: $Z_INDEX_DROP_DOWN;
        display: flex;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
    }
</style>
