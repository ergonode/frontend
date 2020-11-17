/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ClickOutsideGlobalEvent @click-outside="onClickOutside">
        <div
            :class="classes"
            :style="positionStyle"
            ref="dropdown">
            <slot />
        </div>
    </ClickOutsideGlobalEvent>
</template>

<script>
import ClickOutsideGlobalEvent from '@UI/components/Events/ClickOutsideGlobalEvent';

export default {
    name: 'Dropdown',
    components: {
        ClickOutsideGlobalEvent,
    },
    props: {
        /**
         * Determines whether content of dropdown has fixed height and width or not
         */
        fixed: {
            type: Boolean,
            default: false,
        },
        visible: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines position where component will be anchored
         */
        offset: {
            type: Object,
            default: () => ({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }),
        },
    },
    data() {
        return {
            positionStyle: null,
        };
    },
    computed: {
        classes() {
            return [
                'dropdown',
                {
                    'dropdown--visible': this.visible,
                },
            ];
        },
    },
    watch: {
        offset: {
            immediate: true,
            handler() {
                window.requestAnimationFrame(() => {
                    const {
                        innerHeight,
                    } = window;
                    const position = {};
                    let maxHeight = 200;

                    if (this.fixed) {
                        position.maxHeight = `${maxHeight}px`;
                        position.width = `${this.offset.width}px`;
                    } else {
                        maxHeight = this.$el.clientHeight;
                    }

                    const yPos = innerHeight - this.offset.y;

                    if (this.$el.offsetWidth + this.offset.x > window.innerWidth) {
                        position.right = 0;
                    } else {
                        position.left = `${this.offset.x}px`;
                    }

                    if (yPos < maxHeight
                        && this.offset.y >= maxHeight) {
                        position.bottom = `${yPos}px`;
                    } else if (this.offset.y < maxHeight
                        && yPos <= maxHeight) {
                        position.top = 0;
                    } else {
                        position.top = `${this.offset.y + this.offset.height}px`;
                    }

                    this.positionStyle = position;
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
    methods: {
        onClickOutside(payload) {
            this.$emit('click-outside', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .dropdown {
        position: absolute;
        display: none;
        z-index: $Z_INDEX_MAX;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;

        &--visible {
            display: flex;
        }
    }
</style>
