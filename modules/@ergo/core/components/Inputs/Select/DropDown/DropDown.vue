/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="dropdown"
        :style="positionStyle"
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
    data() {
        return {
            positionStyle: null,
        };
    },
    watch: {
        offset: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    window.requestAnimationFrame(() => {
                        const { innerHeight } = window;
                        const position = { left: `${this.offset.x}px` };
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

                        this.positionStyle = position;
                    });
                });
            },
        },
    },
    mounted() {
        const app = document.documentElement.querySelector('.app');

        app.appendChild(this.$refs.dropdown);
    },
    beforeDestroy() {
        const app = document.documentElement.querySelector('.app');

        if (app.contains(this.$refs.dropdown)) {
            app.removeChild(this.$refs.dropdown);
        }
    },
};
</script>

<style lang="scss" scoped>
    .dropdown {
        position: absolute;
        z-index: $Z_INDEX_MAX;
        display: flex;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
    }
</style>
