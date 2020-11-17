/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ClickOutsideGlobalEvent @click-outside="onClickOutside">
        <div
            :class="classes"
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
        /**
         * Determines visibility of component
         */
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
                requestAnimationFrame(() => {
                    const {
                        innerHeight,
                    } = window;
                    let maxHeight = 200;

                    if (this.fixed) {
                        this.$refs.dropdown.style.maxHeight = `${maxHeight}px`;
                        this.$refs.dropdown.style.width = `${this.offset.width}px`;
                    } else {
                        maxHeight = this.$refs.dropdown.clientHeight;
                    }

                    const yPos = innerHeight - this.offset.y;

                    if (this.$el.offsetWidth + this.offset.x > window.innerWidth) {
                        this.$refs.dropdown.style.right = 0;
                    } else {
                        this.$refs.dropdown.style.left = `${this.offset.x}px`;
                    }

                    if (yPos < maxHeight
                        && this.offset.y >= maxHeight) {
                        this.$refs.dropdown.style.bottom = `${yPos}px`;
                    } else if (this.offset.y < maxHeight
                        && yPos <= maxHeight) {
                        this.$refs.dropdown.style.top = 0;
                    } else {
                        this.$refs.dropdown.style.top = `${this.offset.y + this.offset.height}px`;
                    }
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
        z-index: $Z_INDEX_MAX;
        display: none;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;

        &--visible {
            display: flex;
        }
    }
</style>
