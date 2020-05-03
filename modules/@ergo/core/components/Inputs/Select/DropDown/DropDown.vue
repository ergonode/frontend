/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="dropdown"
        ref="dropdown">
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
    mounted() {
        this.$nextTick(() => {
            window.requestAnimationFrame(() => {
                const { innerHeight } = window;
                const position = {};
                let maxHeight = 200;

                if (this.fixed) {
                    position.maxHeight = `${maxHeight}px`;
                    position.width = `${this.offset.width}px`;
                } else {
                    maxHeight = this.$el.clientHeight;
                }

                if (innerHeight - this.offset.y < maxHeight) {
                    const offsetBottom = innerHeight - this.offset.y;

                    position.bottom = `${offsetBottom}px`;
                } else {
                    position.top = `${this.offset.y + this.offset.height}px`;
                }

                this.$refs.dropdown.style.maxHeight = position.maxHeight;
                this.$refs.dropdown.style.width = position.width;
                this.$refs.dropdown.style.bottom = position.bottom || null;
                this.$refs.dropdown.style.top = position.top;
            });
        });
    },
};
</script>

<style lang="scss" scoped>
    .dropdown {
        position: fixed;
        z-index: $Z_INDEX_DROP_DOWN;
        display: flex;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
    }
</style>
